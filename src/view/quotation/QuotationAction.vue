<template>
  <div class="quotation-form">
    <div class="flex items-center mb-6">
      <div class="cursor-pointer text-gray-500" @click="() => router.push('/quotation_action')">
        <MoveLeftIcon />
      </div>
      <div class="flex-1">
        <div class="flex gap-x-1 items-center justify-center">
          <BadgeInfoIcon class="text-gray-500 w-5 h-5 -mt-1" />
          <p class="text-gray-600 text-lg font-medium pt-3">{{ isEditing ? 'Edit Quotation' : 'Create Quotation' }}</p>
        </div>
      </div>
    </div>

    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
      <!-- Customer Section -->
      <div class="customer-section mb-6">
        <a-row :gutter="16">
          <a-col :span="12">
            <div class="form-field">
              <label>Customer <span class="required">*</span></label>
              <Field name="customerId" v-slot="{ field }">
                <a-select
                  v-bind="field"
                  v-model:value="formState.customerId"
                  placeholder="Select customer"
                  show-search
                  option-filter-prop="label"
                  :filter-option="filterOption"
                  :status="errors.customerId ? 'error' : ''"
                  @change="handleCustomerChange"
                >
                  <a-select-option 
                    v-for="customer in customers" 
                    :key="customer.id" 
                    :value="customer.id"
                    :label="customer.name"
                  >
                    {{ customer.name }}
                  </a-select-option>
                </a-select>
              </Field>
              <ErrorMessage name="customerId" class="error-message" />
            </div>
          </a-col>
        </a-row>
      </div>

      <!-- Products Section -->
      <a-card title="Products" class="mb-6">
        <div v-for="(product, index) in formState.products" :key="index" class="product-item mb-4 p-3 border rounded">
          <a-row :gutter="16">
            <a-col :span="6">
              <div class="form-field">
                <label>Product <span class="required">*</span></label>
                <Field :name="`products[${index}].productId`" v-slot="{ field }">
                  <a-select
                    v-bind="field"
                    v-model:value="product.id"
                    placeholder="Select product"
                    show-search
                    option-filter-prop="label"
                    :filter-option="filterOption"
                    :status="errors[`products[${index}].productId`] ? 'error' : ''"
                    @change="(value:any) => handleProductChange(value, index)"
                  >
                    <a-select-option 
                      v-for="p in availableProducts" 
                      :key="p.id" 
                      :value="p.id"
                      :label="`${p.name}`"
                    >
                      {{ p.name }}
                    </a-select-option>
                  </a-select>
                </Field>
                <ErrorMessage :name="`products[${index}].productId`" class="error-message" />
              </div>
            </a-col>
            
            <a-col :span="4">
              <div class="form-field">
                <label>Unit <span class="required">*</span></label>
                <Field :name="`products[${index}].unitId`" v-slot="{ field }">
                  <a-select
                    v-bind="field"
                    v-model:value="product.unitId"
                    placeholder="Select unit"
                    :status="errors[`products[${index}].unitId`] ? 'error' : ''"
                    @change="(value:any) => handleUnitChange(value, index)"
                  >
                    <a-select-option 
                      v-for="unit in getProductUnits(product.id)" 
                      :key="unit.unitId" 
                      :value="unit.unitId"
                      :label="unit.unitName"
                    >
                      {{ unit.unitName }}
                    </a-select-option>
                  </a-select>
                </Field>
                <ErrorMessage :name="`products[${index}].unitId`" class="error-message" />
                
                <!-- Add Unit Button -->
                <a-button 
                  v-if="product.id && getProductUnits(product.id).length > 0"
                  type="link" 
                  size="small" 
                  @click="addUnitToProduct(index)"
                  class="add-unit-btn"
                >
                  + Add Another Unit
                </a-button>
              </div>
            </a-col>
            
            <a-col :span="3">
              <div class="form-field">
                <label>Quantity <span class="required">*</span></label>
                <Field :name="`products[${index}].quantity`" v-slot="{ field }">
                  <a-input-number
                    v-bind="field"
                    v-model:value="product.quantity"
                    :min="1"
                    :precision="2"
                    :status="errors[`products[${index}].quantity`] ? 'error' : ''"
                    @change="calculateLineTotal(index)"
                    style="width: 100%"
                  />
                </Field>
                <ErrorMessage :name="`products[${index}].quantity`" class="error-message" />
              </div>
            </a-col>
            
            <a-col :span="3">
              <div class="form-field">
                <label>Price</label>
                <a-input-number
                  :value="product.price"
                  :precision="2"
                  disabled
                  style="width: 100%; background: #f5f5f5"
                />
              </div>
            </a-col>
            
            <a-col :span="3">
              <div class="form-field">
                <label>Discount %</label>
                <Field :name="`products[${index}].discount`" v-slot="{ field }">
                  <a-input-number
                    v-bind="field"
                    v-model:value="product.discount"
                    :min="0"
                    :max="100"
                    :precision="2"
                    @change="calculateLineTotal(index)"
                    style="width: 100%"
                  />
                </Field>
                <ErrorMessage :name="`products[${index}].discount`" class="error-message" />
              </div>
            </a-col>
            
            <a-col :span="3">
              <div class="form-field">
                <label>Total</label>
                <div class="line-total">${{ product.total.toFixed(2) }}</div>
              </div>
            </a-col>
            
            <a-col :span="2">
              <a-button 
                type="link" 
                danger 
                @click="removeProduct(index)"
                :disabled="formState.products.length === 1"
                class="remove-btn"
              >
                <DeleteOutlined />
              </a-button>
            </a-col>
          </a-row>
          
          <!-- Additional Units for this product -->
          <div v-if="product.units && product.units.length > 0" class="additional-units mt-3">
            <div v-for="(unit, unitIndex) in product.units" :key="unitIndex" class="unit-row mb-2 p-2 bg-gray-50 rounded">
              <a-row :gutter="16" align="middle">
                <a-col :span="6">
                  <div class="form-field">
                    <label>Unit</label>
                    <a-select
                      v-model:value="unit.unitId"
                      placeholder="Select unit"
                      @change="(value:any) => handleAdditionalUnitChange(value, index, unitIndex)"
                    >
                      <a-select-option 
                        v-for="u in getProductUnits(product.id)" 
                        :key="u.unitId" 
                        :value="u.unitId"
                        :label="u.unitName"
                      >
                        {{ u.unitName }}
                      </a-select-option>
                    </a-select>
                  </div>
                </a-col>
                
                <a-col :span="4">
                  <div class="form-field">
                    <label>Quantity</label>
                    <a-input-number
                      v-model:value="unit.quantity"
                      :min="1"
                      :precision="2"
                      @change="calculateAdditionalUnitTotal(index, unitIndex)"
                      style="width: 100%"
                    />
                  </div>
                </a-col>
                
                <a-col :span="4">
                  <div class="form-field">
                    <label>Price</label>
                    <a-input-number
                      :value="unit.price"
                      :precision="2"
                      disabled
                      style="width: 100%; background: #f5f5f5"
                    />
                  </div>
                </a-col>
                
                <a-col :span="4">
                  <div class="form-field">
                    <label>Subtotal</label>
                    <div>${{ unit.subtotal.toFixed(2) }}</div>
                  </div>
                </a-col>
                
                <a-col :span="2">
                  <a-button 
                    type="link" 
                    danger 
                    @click="removeUnit(index, unitIndex)"
                    class="remove-unit-btn"
                  >
                    <DeleteOutlined />
                  </a-button>
                </a-col>
              </a-row>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-4">
          <a-button 
            type="dashed" 
            @click="addProduct" 
            icon="plus"
          >
            Add Product
          </a-button>
        </div>
      </a-card>

      <!-- Summary Section -->
      <a-card title="Summary" class="mb-6">
        <a-row :gutter="16">
          <a-col :span="8" :offset="16">
            <div class="summary-row">
              <span>Subtotal:</span>
              <span>${{ subtotal.toFixed(2) }}</span>
            </div>
            
            <div class="summary-row">
              <span>Discount:</span>
              <div class="summary-input-container">
                <Field name="discount" v-slot="{ field }">
                  <a-input-number
                    v-bind="field"
                    v-model:value="formState.discount"
                    :min="0"
                    :max="100"
                    :precision="2"
                    @change="calculateTotal"
                    style="width: 100px"
                    addon-after="%"
                  />
                </Field>
              </div>
            </div>
            
            <div class="summary-row">
              <span>Tax:</span>
              <div class="summary-input-container">
                <Field name="tax" v-slot="{ field }">
                  <a-input-number
                    v-bind="field"
                    v-model:value="formState.tax"
                    :min="0"
                    :max="100"
                    :precision="2"
                    :status="errors.tax ? 'error' : ''"
                    @change="calculateTotal"
                    style="width: 100px"
                    addon-after="%"
                  />
                </Field>
                <ErrorMessage name="tax" class="error-message" />
              </div>
            </div>
            
            <a-divider class="my-3" />
            
            <div class="summary-row total">
              <span>Total Amount:</span>
              <span>${{ formState.totalAmount.toFixed(2) }}</span>
            </div>
          </a-col>
        </a-row>
      </a-card>

      <!-- Note Section -->
      <a-card title="Additional Information" class="mb-6">
        <div class="form-field">
          <label>Note</label>
          <Field name="note" v-slot="{ field }">
            <a-textarea
              v-bind="field"
              v-model:value="formState.note"
              placeholder="Add any additional information about this quotation"
              :rows="3"
              :status="errors.note ? 'error' : ''"
            />
          </Field>
          <ErrorMessage name="note" class="error-message" />
        </div>
      </a-card>

      <div class="form-actions">
        <a-button class="mr-2" @click="router.push('/quotation_action')">
          Cancel
        </a-button>
        <a-button type="primary" html-type="submit" :loading="submitting">
          {{ isEditing ? 'Update' : 'Create' }} Quotation
        </a-button>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { DeleteOutlined } from '@ant-design/icons-vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { MoveLeftIcon, BadgeInfoIcon } from 'lucide-vue-next';
import type { Customer, QuotationProduct } from '@/components/pages/quotation/type';
import { getAll } from '@/data/ls_data';
import { KEY } from '@/data/Key';
import type { ProductResponse } from '@/components/pages/product/product';


const router = useRouter();
const props = defineProps({
  id: String // For edit mode
});

const isEditing = !!props.id;
const submitting = ref(false);

interface FormState {
  customerId: string;
  products: Array<{
    id: string;
    productName?: string;
    unitId: string;
    unitName?: string;
    quantity: number;
    price: number;
    discount?: number;
    total: number;
    units?: Array<{
      unitId: string;
      unitName: string;
      quantity: number;
      price: number;
      subtotal: number;
    }>;
  }>;
  discount?: number;
  tax?: number;
  totalAmount: number;
  note?: string;
}

const formState = reactive<FormState>({
  customerId: '',
  products: [{
    id: '',
    unitId: '',
    quantity: 1,
    price: 0,
    total: 0,
    units: []
  }],
  totalAmount: 0,
  note: ''
});

// Validation schema
const schema = yup.object({
  customerId: yup.string().required('Customer is required'),
  discount: yup.number().min(0).max(100),
  tax: yup.number().min(0).max(100).required('Tax is required'),
  note: yup.string().max(500, 'Note cannot exceed 500 characters'),
  // products: yup.array().of(
  //   yup.object().shape({
  //     productId: yup.string().required('Product is required'),
  //     unitId: yup.string().required('Unit is required'),
  //     quantity: yup.number().required('Quantity is required').min(1, 'Quantity must be at least 1'),
  //     discount: yup.number().min(0).max(100),
  //   })
  // ).min(1, 'At least one product is required')
});

const customers = ref<Customer[]>([]);
const products = ref<ProductResponse[]>([]);
const selectedCustomer = reactive<Partial<Customer>>({});

// Computed values
const subtotal = computed(() => {
  const mainProductsTotal = formState.products.reduce((sum, product) => sum + product.total, 0);
  const additionalUnitsTotal = formState.products.reduce((sum, product) => {
    if (product.units && product.units.length > 0) {
      return sum + product.units.reduce((unitSum, unit) => unitSum + unit.subtotal, 0);
    }
    return sum;
  }, 0);
  return mainProductsTotal + additionalUnitsTotal;
});

const availableProducts = computed(() => {
  // Filter out already selected products
  const selectedProductIds = formState.products.map(p => p.id).filter(id => id);
  console.log("selected product: {}",selectedProductIds)
  return products.value.filter(product => !selectedProductIds.includes(product.id));
});

onMounted(async () => {
  try {
    customers.value = await getAll(KEY.CUSTOMER);
    products.value = await getAll(KEY.PRODUCT);
    
    if (isEditing && props.id) {
      await loadQuotation(props.id);
    }
  } catch (error) {
    message.error('Failed to load data');
  }
});

async function loadQuotation(id: string) {
  try {
    // In a real app, you would fetch the quotation by ID
    // const quotation = await quotationService.getQuotation(id);
    
    // For demo purposes, we'll create a mock quotation
    const mockQuotation = {
      customer: customers.value[0],
      products: [{
        product: products.value[0],
        units: [{
          unitId: products.value[0].units[0].unitId,
          unitName: products.value[0].units[0].unitName,
          quantity: 2,
          price: products.value[0].units[0].sellingPrice,
          subtotal: 2 * products.value[0].units[0].sellingPrice
        }],
        discount: 0,
        subtotal: 2 * products.value[0].units[0].sellingPrice
      }],
      discount: 5,
      tax: 10,
      totalAmount: (2 * products.value[0].units[0].sellingPrice * 0.95) * 1.10,
      note: 'Sample quotation note'
    };
    
    // Populate form with existing quotation data
    formState.customerId = mockQuotation.customer.id;
    Object.assign(selectedCustomer, mockQuotation.customer);
    
    formState.products = mockQuotation.products.map((p: any) => {
      const firstUnit = p.units[0];
      return {
        id: p.product.id,
        productName: p.product.name,
        unitId: firstUnit.unitId,
        unitName: firstUnit.unitName,
        quantity: firstUnit.quantity,
        price: firstUnit.price,
        discount: p.discount,
        total: p.subtotal,
        units: p.units
      };
    });
    
    formState.discount = mockQuotation.discount;
    formState.tax = mockQuotation.tax;
    formState.totalAmount = mockQuotation.totalAmount;
    formState.note = mockQuotation.note;
  } catch (error) {
    message.error('Failed to load quotation');
    router.push('/quotation_action');
  }
}

function filterOption(input: string, option: any) {
  return option.label.toLowerCase().includes(input.toLowerCase());
}

function addProduct() {
  formState.products.push({
    id: '',
    unitId: '',
    quantity: 1,
    price: 0,
    total: 0,
    units: []
  });
}

function removeProduct(index: number) {
  if (formState.products.length > 1) {
    formState.products.splice(index, 1);
    calculateTotal();
  }
}

function addUnitToProduct(index: number) {
  if (!formState.products[index].units) {
    formState.products[index].units = [];
  }
  
  const productId = formState.products[index].id;
  const product = products.value.find(p => p.id === productId);
  
  if (product && product.units.length > 0) {
    const firstUnit = product.units[0];
    formState.products[index].units.push({
      unitId: firstUnit.unitId,
      unitName: firstUnit.unitName,
      quantity: 1,
      price: firstUnit.sellingPrice,
      subtotal: firstUnit.sellingPrice
    });
  } else {
    formState.products[index].units.push({
      unitId: '',
      unitName: '',
      quantity: 1,
      price: 0,
      subtotal: 0
    });
  }
}

function removeUnit(productIndex: number, unitIndex: number) {
  if (formState.products[productIndex].units && formState.products[productIndex].units.length > 0) {
    formState.products[productIndex].units.splice(unitIndex, 1);
    calculateTotal();
  }
}

function getProductUnits(productId: string) {
  if (!productId) return [];
  const product = products.value.find(p => p.id === productId);
  return product ? product.units : [];
}

function handleCustomerChange(value: string) {
  const customer = customers.value.find(c => c.id === value);
  if (customer) {
    Object.assign(selectedCustomer, customer);
  }
}

function handleProductChange(value: string, index: number) {
  const product = products.value.find(p => p.id === value);
  
  if (product) {
    formState.products[index].id = value;
    formState.products[index].productName = product.name;
    
    // Auto-select the first unit and set its price
    if (product.units.length > 0) {
      const firstUnit = product.units[0];
      formState.products[index].unitId = firstUnit.unitId;
      formState.products[index].unitName = firstUnit.unitName;
      formState.products[index].price = firstUnit.sellingPrice;
      calculateLineTotal(index);
    }
  }
}

function handleUnitChange(value: string, index: number) {
  const productId = formState.products[index].id;
  const product = products.value.find(p => p.id === productId);
  
  if (product) {
    const unit = product.units.find(u => u.unitId === value);
    if (unit) {
      formState.products[index].unitId = unit.unitId;
      formState.products[index].unitName = unit.unitName;
      formState.products[index].price = unit.sellingPrice;
      calculateLineTotal(index);
    }
  }
}

function handleAdditionalUnitChange(value: string, productIndex: number, unitIndex: number) {
  const productId = formState.products[productIndex].id;
  const product = products.value.find(p => p.id === productId);
  
  if (product && formState.products[productIndex].units) {
    const unit = product.units.find(u => u.unitId === value);
    if (unit) {
      formState.products[productIndex].units[unitIndex].unitId = unit.unitId;
      formState.products[productIndex].units[unitIndex].unitName = unit.unitName;
      formState.products[productIndex].units[unitIndex].price = unit.sellingPrice;
      calculateAdditionalUnitTotal(productIndex, unitIndex);
    }
  }
}

function calculateLineTotal(index: number) {
  const product = formState.products[index];
  const quantity = product.quantity || 0;
  const price = product.price || 0;
  const discount = product.discount || 0;
  
  product.total = quantity * price * (1 - discount / 100);
  calculateTotal();
}

function calculateAdditionalUnitTotal(productIndex: number, unitIndex: number) {
  if (formState.products[productIndex].units && formState.products[productIndex].units.length > unitIndex) {
    const unit = formState.products[productIndex].units[unitIndex];
    const quantity = unit.quantity || 0;
    const price = unit.price || 0;
    
    unit.subtotal = quantity * price;
    calculateTotal();
  }
}

function calculateTotal() {
  const discount = formState.discount || 0;
  const tax = formState.tax || 0;
  
  formState.totalAmount = subtotal.value * (1 - discount / 100) * (1 + tax / 100);
}

async function onSubmit(values: any) {
  submitting.value = true;
  
  try {
    // Convert form data to Quotation format
    //@ts-ignore
    const quotationProducts: QuotationProduct[] = formState.products.map(p => {
      const product = products.value.find(prod => prod.id === p.id);
      
      // Combine main unit and additional units
      const allUnits = [];
      
      // Add main unit
      if (p.unitId) {
        allUnits.push({
          unitId: p.unitId,
          unitName: p.unitName || '',
          quantity: p.quantity,
          price: p.price,
          subtotal: p.total
        });
      }
      
      // Add additional units
      if (p.units && p.units.length > 0) {
        p.units.forEach(unit => {
          allUnits.push({
            unitId: unit.unitId,
            unitName: unit.unitName,
            quantity: unit.quantity,
            price: unit.price,
            subtotal: unit.subtotal
          });
        });
      }
      
      return {
        product: {
          id: p.id,
          sku: product?.sku || '',
          name: p.productName || ''
        },
        units: allUnits,
        discount: p.discount,
        subtotal: allUnits.reduce((sum, unit) => sum + unit.subtotal, 0)
      };
    });

    const customer = customers.value.find(c => c.id === formState.customerId);
    
    if (!customer) {
      message.error('Please select a valid customer');
      return;
    }
    
    const quotationData = {
      customer: customer,
      products: quotationProducts,
      totalAmount: formState.totalAmount,
      discount: formState.discount,
      tax: formState.tax,
      note: formState.note,
      status: 'PENDING',
      quoteNo: `QT-${Date.now()}`,
      id: `q-${Date.now()}`
    };
    
    console.log("Quotation data to submit: ", quotationData);
    
    if (isEditing && props.id) {
      // await quotationService.updateQuotation(props.id, quotationData);
      message.success('Quotation updated successfully');
    } else {
      // await quotationService.createQuotation(quotationData);
      message.success('Quotation created successfully');
    }
    
    router.push('/quotation_action');
  } catch (error) {
    message.error(isEditing ? 'Failed to update quotation' : 'Failed to create quotation');
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped>
.quotation-form {
  max-width: 1200px;
  margin: 0 auto;
}

.form-field {
  margin-bottom: 16px;
  position: relative;
}

.form-field label {
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
}

.required {
  color: #ff4d4f;
}

.error-message {
  color: #ff4d4f;
  font-size: 12px;
  margin-top: 4px;
  display: block;
}

.add-unit-btn {
  font-size: 12px;
  padding: 0;
  margin-top: 4px;
  height: auto;
}

.line-total {
  font-weight: 500;
  padding: 4px 0;
}

.remove-btn {
  margin-top: 24px;
}

.additional-units {
  border-top: 1px dashed #f0f0f0;
  padding-top: 12px;
}

.unit-row {
  background-color: #f9f9f9;
}

.remove-unit-btn {
  margin-top: 24px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.summary-input-container {
  display: flex;
  align-items: center;
}

.summary-row.total {
  font-weight: bold;
  font-size: 16px;
}

.form-actions {
  text-align: right;
  margin-top: 24px;
}

.mb-6 {
  margin-bottom: 24px;
}

.mr-2 {
  margin-right: 8px;
}

.my-3 {
  margin-top: 12px;
  margin-bottom: 12px;
}

.text-center {
  text-align: center;
}

.mt-4 {
  margin-top: 16px;
}

.mt-3 {
  margin-top: 12px;
}

.mb-4 {
  margin-bottom: 16px;
}

.mb-2 {
  margin-bottom: 8px;
}

.p-3 {
  padding: 12px;
}

.p-2 {
  padding: 8px;
}

.border {
  border: 1px solid #f0f0f0;
}

.rounded {
  border-radius: 4px;
}

.bg-gray-50 {
  background-color: #fafafa;
}
</style>