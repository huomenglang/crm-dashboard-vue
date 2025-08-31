<template>
  <div class="quotation-form">
    <!-- <a-page-header
      :title="isEditing ? 'Edit Quotation' : 'Create Quotation'"
      @back="() => router.push('/quotations')"
    /> -->
    <div class="flex items-center ">
      <div class="cursor-pointer text-gray-500" @click="()=>router.push('/quotation_action')">
        <MoveLeftIcon/>
      </div>
   <div class="flex-1">
      <div class="flex gap-x-1 items-center justify-center">
        <BadgeInfoIcon class="text-gray-500 w-5 h-5 -mt-1"/>
       <p class="text-gray-600 text-lg font-medium pt-3">{{ isEditing?'Edit Quotation':'Create Quotation' }}</p>
     </div>
   </div>
    </div>
    
    <a-form
      :model="formState"
      layout="vertical"
      @finish="onFinish"
    >
      <!-- Customer Section -->
      <div title="Customer Information" style="margin-bottom: 24px">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              label="Customer"
              name="customerId"
              :rules="[{ required: true, message: 'Please select a customer' }]"
            >
              <a-select
                v-model:value="formState.customerId"
                placeholder="Select customer"
                show-search
                option-filter-prop="label"
                :filter-option="filterOption"
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
            </a-form-item>
          </a-col>
        </a-row>
      </div>

      <!-- Products Section -->
      <a-card title="Products" style="margin-bottom: 24px">
        <a-table 
          :columns="productColumns" 
          :data-source="formState.products"
          :pagination="false"
          size="middle"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'product'">
              <a-form-item
                :name="['products', index, 'productId']"
                :rules="[{ required: true, message: 'Product is required' }]"
              >
                <a-select
                  v-model:value="record.productId"
                  placeholder="Select product"
                  show-search
                  option-filter-prop="label"
                  :filter-option="filterOption"
                  @change="(value:any) => handleProductChange(value, index)"
                  style="width: 200px"
                >
                  <a-select-option 
                    v-for="product in products" 
                    :key="product.id" 
                    :value="product.id"
                    :label="product.name"
                  >
                    {{ product.name }} ({{ product.sku }})
                  </a-select-option>
                </a-select>
              </a-form-item>
            </template>
            
            <template v-else-if="column.key === 'unit'">
              <a-form-item
                :name="['products', index, 'unitId']"
                :rules="[{ required: true, message: 'Unit is required' }]"
              >
                <a-select
                  v-model:value="record.unitId"
                  placeholder="Select unit"
                  @change="(value:any) => handleUnitChange(value, index)"
                  style="width: 120px"
                >
                  <a-select-option 
                    v-for="unit in getProductUnits(record.productId)" 
                    :key="unit.unitId" 
                    :value="unit.unitId"
                  >
                    {{ unit.unitName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </template>
            
            <template v-else-if="column.key === 'quantity'">
              <a-form-item
                :name="['products', index, 'quantity']"
                :rules="[{ required: true, message: 'Quantity is required' }, 
                         { validator: validateQuantity }]"
              >
                <a-input-number
                  v-model:value="record.quantity"
                  :min="1"
                  :precision="2"
                  @change="calculateLineTotal(index)"
                  style="width: 100px"
                />
              </a-form-item>
            </template>
            
            <template v-else-if="column.key === 'price'">
              <a-form-item>
                <a-input-number
                  v-model:value="record.price"
                  :precision="2"
                  disabled
                  style="width: 100px; background: #f5f5f5"
                />
              </a-form-item>
            </template>
            
            <template v-else-if="column.key === 'discount'">
              <a-form-item>
                <a-input-number
                  v-model:value="record.discount"
                  :min="0"
                  :max="100"
                  :precision="2"
                  @change="calculateLineTotal(index)"
                  style="width: 100px"
                />
              </a-form-item>
            </template>
            
            <template v-else-if="column.key === 'total'">
              <span>${{ record.total.toFixed(2) }}</span>
            </template>
            
            <template v-else-if="column.key === 'actions'">
              <a-button 
                type="link" 
                danger 
                @click="removeProduct(index)"
                :disabled="formState.products.length === 1"
              >
                <delete-outlined />
              </a-button>
            </template>
          </template>
        </a-table>
        
        <div style="margin-top: 16px; text-align: center">
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
      <a-card title="Summary" style="margin-bottom: 24px">
        

        <a-row :gutter="16">
          <a-col :span="8" :offset="16">
            <div class="summary-row">
              <span>Subtotal:</span>
              <span>${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="summary-row">
              <span>Discount:</span>
              <a-input-number
                v-model:value="formState.discount"
                :min="0"
                :max="100"
                :precision="2"
                @change="calculateTotal"
                style="width: 100px"
                addon-after="%"
              />
            </div>
            <div class="summary-row">
              <span>Tax:</span>
              <a-input-number
                v-model:value="formState.tax"
                :min="0"
                :max="100"
                :precision="2"
                @change="calculateTotal"
                style="width: 100px"
                addon-after="%"
              />
            </div>
            <a-divider style="margin: 12px 0" />
            <div class="summary-row total">
              <span>Total Amount:</span>
              <span>${{ formState.totalAmount.toFixed(2) }}</span>
            </div>
          </a-col>
        </a-row>
      </a-card>

      <div style="margin-top: 24px; text-align: right">
        <a-button style="margin-right: 8px" @click="router.push('/')">
          Cancel
        </a-button>
        <a-button type="primary" html-type="submit" :loading="submitting">
          {{ isEditing ? 'Update' : 'Create' }} Quotation
        </a-button>
      </div>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { BackwardOutlined, DeleteOutlined, InfoCircleFilled } from '@ant-design/icons-vue';
import type { Customer, QuotationProduct } from './type';
import { getAll } from '@/data/ls_data';
import { KEY } from '@/data/Key';
import type { ProductResponse } from '../product/product';
import { BadgeInfoIcon, ChevronLeftCircleIcon, MoveLeftIcon } from 'lucide-vue-next';


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
  }>;
  discount?: number;
  tax?: number;
  totalAmount: number;
}

const formState = reactive<FormState>({
  customerId: '',
  products: [{
    id: '',
    unitId: '',
    quantity: 1,
    price: 0,
    total: 0
  }],
  totalAmount: 0
});

const customers = ref<Customer[]>([]);
const products = ref<ProductResponse[]>([]);
const selectedCustomer = reactive<Partial<Customer>>({});

const productColumns = [
  {
    title: 'Product',
    key: 'product',
    width: '25%'
  },
  {
    title: 'Unit',
    key: 'unit',
    width: '15%'
  },
  {
    title: 'Quantity',
    key: 'quantity',
    width: '15%'
  },
  {
    title: 'Price',
    key: 'price',
    width: '15%'
  },
  {
    title: 'Discount %',
    key: 'discount',
    width: '15%'
  },
  {
    title: 'Total',
    key: 'total',
    width: '10%'
  },
  {
    title: 'Action',
    key: 'actions',
    width: '5%'
  },
];

// Computed values
const subtotal = computed(() => {
  return formState.products.reduce((sum, product) => sum + product.total, 0);
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
    //@ts-ignore
    const quotation = await quotationService.getQuotation(id);
    
    // Populate form with existing quotation data
    formState.customerId = quotation.customer.customerId;
    Object.assign(selectedCustomer, quotation.customer);
    
    formState.products = quotation.products.map((p: QuotationProduct) => {
      const firstUnit = p.units[0]; // Assuming one unit per product in this simplified version
      return {
        productId: p.product.id,
        productName: p.product.name,
        unitId: firstUnit.unitId,
        unitName: firstUnit.unitName,
        quantity: firstUnit.quantity,
        price: firstUnit.price,
        discount: p.discount,
        total: p.subtotal
      };
    });
    
    formState.discount = quotation.discount;
    formState.tax = quotation.tax;
    formState.totalAmount = quotation.totalAmount;
  } catch (error) {
    message.error('Failed to load quotation');
    router.push('/');
  }
}

function filterOption(input: string, option: any) {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
}

function addProduct() {
  formState.products.push({
    id: '',
    unitId: '',
    quantity: 1,
    price: 0,
    total: 0
  });
}

function removeProduct(index: number) {
  if (formState.products.length > 1) {
    formState.products.splice(index, 1);
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

function validateQuantity(_rule: any, value: number) {
  if (value <= 0) {
    return Promise.reject('Quantity must be greater than 0');
  }
  return Promise.resolve();
}

function calculateLineTotal(index: number) {
  const product = formState.products[index];
  const quantity = product.quantity || 0;
  const price = product.price || 0;
  const discount = product.discount || 0;
  
  product.total = quantity * price * (1 - discount / 100);
  calculateTotal();
}

function calculateTotal() {
  const discount = formState.discount || 0;
  const tax = formState.tax || 0;
  
  formState.totalAmount = subtotal.value * (1 - discount / 100) * (1 + tax / 100);
}

async function onFinish() {
  submitting.value = true;
  
  try {
    // Convert form data to Quotation format
    //@ts-ignore
    const quotationProducts: QuotationProduct[] = formState.products.map(p => {
      const product = products.value.find(prod => prod.id === p.id);
      return {
        product: {
          id: p.id,
          sku: product?.sku || '',
          name: p.productName || ''
        },
        units: [{
          unitId: p.unitId,
          unitName: p.unitName || '',
          quantity: p.quantity,
          price: p.price,
          subtotal: p.total
        }],
        discount: p.discount,
        subtotal: p.total
      };
    });

    console.log("quo product: {}",quotationProducts)
    

    const customer = customers.value.find(c => c.id === formState.customerId);
    
    if (isEditing && props.id) {
      // await quotationService.updateQuotation(props.id, {
      //   customer: customer!,
      //   products: quotationProducts,
      //   totalAmount: formState.totalAmount,
      //   discount: formState.discount,
      //   tax: formState.tax,
      //   status: 'PENDING' // Or keep existing status
      // });


      message.success('Quotation updated successfully');
    } else {
      // await quotationService.createQuotation({
      //   customer: customer!,
      //   products: quotationProducts,
      //   totalAmount: formState.totalAmount,
      //   discount: formState.discount,
      //   tax: formState.tax,
      //   status: 'PENDING',
      //   quoteNo: `QT-${Date.now()}`,
      //   id: `q-${Date.now()}`
      // });

      const quo_data={
            customer: customer!,
        products: quotationProducts,
        totalAmount: formState.totalAmount,
        discount: formState.discount,
        tax: formState.tax,
        status: 'PENDING',
        quoteNo: `QT-${Date.now()}`,
        id: `q-${Date.now()}`
      }
      console.log("data submit: ",quo_data)
      message.success('Quotation created successfully');
    }
    
    router.push('/');
  } catch (error) {
    message.error(isEditing ? 'Failed to update quotation' : 'Failed to create quotation');
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped>
.quotation-form {
  /* padding: 24px; */
  max-width: 1200px;
  margin: 0 auto;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.summary-row.total {
  font-weight: bold;
  font-size: 16px;
}

:deep(.ant-table-thead > tr > th) {
  background-color: #fafafa;
  font-weight: 600;
}

:deep(.ant-form-item) {
  margin-bottom: 0;
}
</style>