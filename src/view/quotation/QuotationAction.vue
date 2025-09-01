<template>
  <div class="quotation-form">
    <!-- Header -->
    <div class="flex items-center mb-6 px-4">
      <div
        class="cursor-pointer text-gray-500"
        @click="router.push('/quotations')"
      >
        <MoveLeftIcon />
      </div>
      <div class="flex-1">
        <div class="flex gap-x-1 items-center justify-center">
          <BadgeInfoIcon class="text-gray-500 w-5 h-5" />
          <p class="text-gray-600 text-lg font-medium pt-3">
            {{ isEditing ? "Edit Quotation" : "Create Quotation" }}
          </p>
        </div>
      </div>
    </div>

    <!-- Two-column layout -->
    <div class="two-column-layout gap-x-2 px-4 -mt-7">
      <!-- Left Side: Customer & Summary -->
      <div class="left-side">
        <Form
          @submit="onSubmit"
          :validation-schema="schema"
          v-slot="{ errors }"
        >
          <!-- Customer Section -->
          <a-card title="Customer Information" size="small" class="mb-4">
            <div class="form-field">
              <label class="text-gray-600"
                >Customer <span class="required">*</span></label
              >
              <Field
                name="customerId"
                v-slot="{ value, errorMessage, handleChange }"
              >
                <a-select
                  :value="value"
                  placeholder="Select customer"
                  show-search
                  option-filter-prop="label"
                  :filter-option="filterOption"
                  :status="errorMessage ? 'error' : ''"
                  style="width: 100%"
                  @update:value="(v:any) => { handleChange(v); formState.customerId = v; handleCustomerChange(v); }"
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

            <!-- Note Section -->
            <div class="form-field">
              <label class="text-gray-600">Note</label>
              <Field name="note" v-slot="{ value, errorMessage, handleChange }">
                <a-textarea
                  :value="value ?? ''"
                  @update:value="(v:string) => { handleChange(v); formState.note = v; }"
                  placeholder="Leave Note"
                  :rows="3"
                  :status="errorMessage ? 'error' : ''"
                />
              </Field>
              <ErrorMessage name="note" class="error-message" />
            </div>
            <!-- Add Product Button -->
            <div class="">
              <a-button
                type="primary"
                @click="showProductModal"
                class="!flex justify-center items-center"
              >
                <!-- <template #icon> -->
                <PlusOutlined />
                <!-- </template> -->
                Add Product
              </a-button>
            </div>
          </a-card>

          <!-- Summary Section -->
          <a-card title="Summary" size="small" class="mb-6">
            <div class="summary-row text-gray-600 text-[14px]">
              <span>Subtotal:</span>
              <span>${{ subtotal.toFixed(2) }}</span>
            </div>

            <div class="summary-row text-gray-600">
              <span>Discount:</span>
              <div class="summary-input-container">
                <Field name="discount" v-slot="{ value, handleChange }">
                  <a-input-number
                    :value="value ?? 0"
                    :min="0"
                    :max="100"
                    :precision="2"
                    @update:value="(v:number) => { handleChange(v ?? 0); formState.discount = Number(v||0); calculateTotal(); }"
                    style="width: 100px"
                    addon-after="%"
                  />
                </Field>
              </div>
            </div>

            <div class="summary-row text-gray-600">
              <span>Tax:</span>
              <div class="summary-input-container">
                <Field
                  name="tax"
                  v-slot="{ value, errorMessage, handleChange }"
                >
                  <a-input-number
                    :value="value ?? 0"
                    :min="0"
                    :max="100"
                    :precision="2"
                    :status="errorMessage ? 'error' : ''"
                    @update:value="(v:number) => { handleChange(v ?? 0); formState.tax = Number(v||0); calculateTotal(); }"
                    style="width: 100px"
                    addon-after="%"
                  />
                </Field>
                <ErrorMessage name="tax" class="error-message" />
              </div>
            </div>

            <div class="summary-row text-[15px] font-semibold text-gray-700">
              <span>Total Amount:</span>
              <span>${{ formState.totalAmount.toFixed(2) }}</span>
            </div>
          </a-card>

          <div class="-mt-4 flex justify-end gap-x-3">
            <a-button
              class="mr-2"
              :is-danger="true"
              @click="router.push('/quotations')"
            >
              Cancel
            </a-button>
            <a-button type="primary" html-type="submit" :loading="submitting">
              {{ isEditing ? "Update" : "Create" }} Quotation
            </a-button>
          </div>
        </Form>
      </div>

      <!-- Right Side: Products Table -->
      <div class="right-side">
        <a-card title="Products" size="small" class="products-card">
          <a-table
            :dataSource="formState.products"
            :columns="productColumns"
            :pagination="false"
            size="small"
          >
            <template #bodyCell="{ column, record, index }">
              <template v-if="column.key === 'actions'">
                <a-space class="">
                  <!-- <a-button
                    type="primary"
                    size="small"
                    @click="editProduct(index)"
                  >
                    <EditIcon class="w-3 h-3" />
                  </a-button> -->
                   <a-button
                      v-if="record.id && getProductUnits(record.id).length > 0"
                      type="link"
                      size="small"
                      @click="addUnitToProduct(index)"
                    >
                      <PlusCircleIcon />
                    </a-button>

                  <a-button
                    size="small"
                    danger
                    type="primary"
                    @click="removeProduct(index)"
                  >
                    <Trash class="w-3 h-3" />
                  </a-button>
                </a-space>
              </template>

              <template v-else-if="column.key === 'details'">
                <div class="product-details bg-gray-50 px-3 py-1 rounded-sm text-600 font-semibold">
                  <div class="main-unit flex items-center">
                    <div class="text-gray-600 font-semibold">
                      {{ record.unitName }}: {{ record.quantity }} × ${{
                        record.price.toFixed(2)
                      }}
                    </div>
                   
                  </div>
                  <div
                    v-for="(unit, unitIndex) in record.units"
                    :key="unitIndex"
                    class="additional-unit"
                  >
                    <div>
                      {{ unit.unitName }}: {{ unit.quantity }} × ${{
                        unit.price.toFixed(2)
                      }}
                    </div>
                    <!-- <a-button
                      type="link"
                      danger
                      size="small"
                      @click="removeUnit(index, unitIndex)"
                    >
                      <Trash />
                    </a-button> -->
                  </div>
                </div>
              </template>

              <template v-else-if="column.key === 'discount'">
                %{{ record?.discount?.toFixed(2) }}
              </template>
              <template v-else-if="column.key === 'total'">
                ${{ calculateProductTotal(record).toFixed(2) }}
              </template>
            </template>

            <template #emptyText>
              <div class="empty-state">
                <p>No products added yet</p>
                <p class="text-gray-500">Click "Add Product" to get started</p>
              </div>
            </template>
          </a-table>
        </a-card>
      </div>
    </div>

    <!-- Product Selection Modal -->
    <a-modal
      v-model:open="productModalVisible"
      :title="editingProductIndex !== null ? 'Edit Product' : 'Add Product'"
      width="600px"
      :footer="null"
    >
      <div class="product-modal text-gray-500">
        <div class="modal-section">
          <h4>Select Product</h4>
          <a-select
            v-model:value="selectedProductId"
            placeholder="Select product"
            show-search
            option-filter-prop="label"
            :filter-option="filterOption"
            style="width: 100%"
            @change="handleProductSelect"
            :disabled="editingProductIndex !== null"
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
        </div>

        <div class="modal-section" v-if="selectedProduct">
          <h4>Product Details</h4>
          <a-row :gutter="24">
            <a-col :span="12">
              <div class="form-field">
                <label class="text-gray-600"
                  >Unit <span class="required">*</span></label
                >
                <a-select
                  v-model:value="newProduct.unitId"
                  placeholder="Select unit"
                  @change="handleUnitSelect"
                  style="width: 100%"
                >
                  <a-select-option
                    v-for="unit in getProductUnits(selectedProductId)"
                    :key="unit.unitId"
                    :value="unit.unitId"
                    :label="unit.unitName"
                  >
                    {{ unit.unitName }}
                  </a-select-option>
                </a-select>
              </div>
            </a-col>

            <a-col :span="12">
              <div class="form-field">
                <label>Quantity <span class="required">*</span></label>
                <a-input-number
                  v-model:value="newProduct.quantity"
                  :min="0.01"
                  :precision="2"
                  style="width: 100%"
                  @update:value="calculateNewProductTotal"
                />
              </div>
            </a-col>
          </a-row>

          <a-row :gutter="24" class="mt-3">
            <a-col :span="12">
              <div class="form-field">
                <label>Discount %</label>
                <a-input-number
                  v-model:value="newProduct.discount"
                  :min="0"
                  :max="100"
                  :precision="2"
                  style="width: 100%"
                  @update:value="calculateNewProductTotal"
                />
              </div>
            </a-col>
            <a-col :span="12">
              <div class="form-field">
                <label>Price</label>
                <a-input-number
                  :value="newProduct.price"
                  :precision="2"
                  disabled
                  style="width: 100%; background: #f5f5f5"
                />
              </div>
            </a-col>
          </a-row>
        </div>
        <div class="border-1 border-dashed border-gray-300 mb-5"></div>
        <div
          class="gap-x-5 flex items-center font-semibold text-gray-700 text-[16px]"
          v-if="selectedProduct"
        >
          <label>Total: </label>
          <div class="">${{ newProductTotal.toFixed(2) }}</div>
        </div>

        <div class="modal-actions">
          <a-button @click="closeProductModal">Cancel</a-button>
          <a-button
            type="primary"
            secondary
            @click="
              editingProductIndex !== null ? updateProduct() : addNewProduct()
            "
            :disabled="!newProduct.unitId || !newProduct.quantity"
          >
            {{ editingProductIndex !== null ? "Update" : "Add" }} Product
          </a-button>
        </div>
      </div>
    </a-modal>

    <!-- Add Unit Modal -->
    <a-modal
      v-model:open="unitModalVisible"
      title="Add Unit"
      width="600px"
      :footer="null"
    >
      <div class="unit-modal">
        <div class="modal-section">
          <a-row :gutter="16">
            <a-col :span="8">
              <div class="form-field text-gray-600">
                <label>Unit <span class="required">*</span></label>
                <a-select
                  v-model:value="newUnit.unitId"
                  placeholder="Select unit"
                  style="width: 100%"
                >
                  <a-select-option
                    v-for="unit in getProductUnits(selectedProductForUnit)"
                    :key="unit.unitId"
                    :value="unit.unitId"
                    :label="unit.unitName"
                  >
                    {{ unit.unitName }}
                  </a-select-option>
                </a-select>
              </div>
            </a-col>

            <a-col :span="8">
              <div class="form-field text-gray-600">
                <label>Quantity <span class="required">*</span></label>
                <a-input-number
                  v-model:value="newUnit.quantity"
                  :min="0.01"
                  :precision="2"
                  style="width: 100%"
                />
              </div>
            </a-col>

            <a-col :span="8">
              <div class="form-field text-gray-600">
                <label>Price</label>
                <a-input-number
                  :value="newUnitPrice"
                  :precision="2"
                  disabled
                  style="width: 100%; background: #f5f5f5"
                />
              </div>
            </a-col>
          </a-row>
        </div>

        <div class="modal-actions">
          <a-button @click="unitModalVisible = false">Cancel</a-button>
          <a-button
            type="primary"
            @click="addNewUnit"
            :disabled="!newUnit.unitId || !newUnit.quantity"
          >
            Add Unit
          </a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import {  PlusOutlined } from "@ant-design/icons-vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import {
  MoveLeftIcon,
  BadgeInfoIcon,
  Trash,
  PlusCircleIcon,
} from "lucide-vue-next";
import {
  QuoteStatus,
  type Customer,
  type Quotation,
  type QuotationProduct,
} from "@/components/pages/quotation/type";
import { getAll, createOne, updateOne } from "@/data/ls_data";
import { KEY } from "@/data/Key";
import type { ProductResponse } from "@/components/pages/product/product";

const router = useRouter();
const props = defineProps<{ id?: string }>();
const isEditing = computed(() => !!props.id);
const submitting = ref(false);
const productModalVisible = ref(false);
const unitModalVisible = ref(false);
const selectedProductId = ref("");
const selectedProduct = ref<ProductResponse | null>(null);
const editingProductIndex = ref<number | null>(null);
const selectedProductForUnit = ref("");
const selectedProductIndexForUnit = ref(-1);

// Table columns for products
const productColumns = [
  {
    title: "Product",
    dataIndex: "productName",
    key: "productName",
    width: "30%",
  },
  {
    title: "Details",
    key: "details",
    width: "35%",
  },
  {
    title: "Discount",
    key: "discount",
    width: "15%",
  },
  {
    title: "Total",
    key: "total",
    width: "10%",
  },
  {
    title: "Actions",
    key: "actions",
    width: "10%",
  },
];

interface FormState {
  customerId: string;
  products: Array<{
    id: string; // productId
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
  status?: string;
  quoteNo?: string;
}

const formState = reactive<FormState>({
  customerId: "",
  products: [],
  discount: 0,
  tax: 0,
  totalAmount: 0,
  note: "",
  status: "PENDING",
});

// New product object for modal
const newProduct = reactive({
  id: "",
  productName: "",
  unitId: "",
  unitName: "",
  quantity: 1,
  price: 0,
  discount: 0,
  total: 0,
});

// New unit object for modal
const newUnit = reactive({
  unitId: "",
  unitName: "",
  quantity: 1,
  price: 0,
  subtotal: 0,
});

const newProductTotal = computed(() => {
  const quantity = Number(newProduct.quantity) || 0;
  const price = Number(newProduct.price) || 0;
  const discount = Number(newProduct.discount) || 0;

  return quantity * price * (1 - discount / 100);
});

const newUnitPrice = computed(() => {
  if (!selectedProductForUnit.value) return 0;

  const product = products.value.find(
    (p) => p.id === selectedProductForUnit.value
  );
  if (!product || !newUnit.unitId) return 0;

  const unit = product.units.find((u) => u.unitId === newUnit.unitId);
  return unit ? unit.sellingPrice : 0;
});

// Validation schema
const schema = yup.object({
  customerId: yup.string().required("Customer is required"),
  discount: yup.number().min(0).max(100),
  note: yup.string().max(500, "Note cannot exceed 500 characters"),
  products: yup
    .array()
    .of(
      yup.object({
        id: yup.string().required("Product is required"),
        unitId: yup.string().required("Unit is required"),
        quantity: yup
          .number()
          .required("Quantity is required")
          .min(0.01, "Quantity must be at least 0.01"),
        discount: yup.number().min(0).max(100).optional(),
      })
    )
    .min(1, "At least one product is required"),
});

const customers = ref<Customer[]>([]);
const products = ref<ProductResponse[]>([]);
const selectedCustomer = reactive<Partial<Customer>>({});

// Computed values
const subtotal = computed(() => {
  const mainProductsTotal = formState.products.reduce(
    (sum, product) => sum + (product.total || 0),
    0
  );
  const additionalUnitsTotal = formState.products.reduce((sum, product) => {
    if (product.units && product.units.length > 0) {
      return (
        sum +
        product.units.reduce(
          (unitSum, unit) => unitSum + (unit.subtotal || 0),
          0
        )
      );
    }
    return sum;
  }, 0);
  return mainProductsTotal + additionalUnitsTotal;
});

const availableProducts = computed(() => {
  const selectedIds = formState.products.map((p) => p.id).filter(Boolean);
  return products.value.filter(
    (p) =>
      !selectedIds.includes(p.id) ||
      (editingProductIndex.value !== null &&
        p.id === formState.products[editingProductIndex.value!].id)
  );
});

onMounted(async () => {
  try {
    customers.value =  getAll(KEY.CUSTOMER);
    products.value =  getAll(KEY.PRODUCT);

    if (isEditing.value && props.id) {
      await loadQuotation(props.id);
    } else {
      // Generate quote number for new quotations
      const quotations = ( getAll(KEY.QUOTATION)) || [];
      formState.quoteNo = `QT-${String(quotations.length + 1).padStart(
        4,
        "0"
      )}`;
    }
  } catch (error) {
    message.error("Failed to load data");
  }
});

async function loadQuotation(id: string) {
  try {
    const quotations = ( getAll(KEY.QUOTATION)) || [];
    const quotation = quotations.find((q: Quotation) => q.id === id);

    if (!quotation) {
      message.error("Quotation not found");
      router.push("/quotations");
      return;
    }

    formState.customerId = quotation.customer.id;
    Object.assign(selectedCustomer, quotation.customer);

    formState.products = quotation.products.map((p: QuotationProduct) => {
      const firstUnit = p.units[0];
      return {
        id: p.product.id,
        productName: p.product.name,
        unitId: firstUnit.unitId,
        unitName: firstUnit.unitName,
        quantity: firstUnit.quantity,
        price: firstUnit.price,
        discount: p.discount,
        total: firstUnit.subtotal,
        units: p.units.slice(1), // All units except the first one
      };
    });

    formState.discount = quotation.discount;
    formState.tax = quotation.tax;
    formState.totalAmount = quotation.totalAmount;
    formState.note = quotation.note;
    formState.status = quotation.status;
    formState.quoteNo = quotation.quoteNo;
  } catch (error) {
    message.error("Failed to load quotation");
    router.push("/quotations");
  }
}

function filterOption(input: string, option: any) {
  return (option?.label || "")
    .toLowerCase()
    .includes((input || "").toLowerCase());
}

function showProductModal() {
  // Reset new product form
  selectedProductId.value = "";
  selectedProduct.value = null;
  editingProductIndex.value = null;
  Object.assign(newProduct, {
    id: "",
    productName: "",
    unitId: "",
    unitName: "",
    quantity: 1,
    price: 0,
    discount: 0,
    total: 0,
  });

  productModalVisible.value = true;
}

function editProduct(index: number) {
  const product = formState.products[index];
  selectedProductId.value = product.id;
  selectedProduct.value =
    products.value.find((p) => p.id === product.id) || null;
  editingProductIndex.value = index;

  Object.assign(newProduct, {
    id: product.id,
    productName: product.productName,
    unitId: product.unitId,
    unitName: product.unitName,
    quantity: product.quantity,
    price: product.price,
    discount: product.discount || 0,
    total: product.total,
  });

  productModalVisible.value = true;
}

function closeProductModal() {
  productModalVisible.value = false;
  editingProductIndex.value = null;
}

function handleProductSelect(value: string) {
  const product = products.value.find((p) => p.id === value);

  if (product) {
    selectedProduct.value = product;
    newProduct.id = value;
    newProduct.productName = product.name;

    // Auto-select the first unit and set its price
    if (product.units.length > 0) {
      const firstUnit = product.units[0];
      newProduct.unitId = firstUnit.unitId;
      newProduct.unitName = firstUnit.unitName;
      newProduct.price = firstUnit.sellingPrice;
    } else {
      newProduct.unitId = "";
      newProduct.unitName = "";
      newProduct.price = 0;
    }

    calculateNewProductTotal();
  }
}

function handleUnitSelect(value: string) {
  if (selectedProduct.value) {
    const unit = selectedProduct.value.units.find((u) => u.unitId === value);
    if (unit) {
      newProduct.unitId = unit.unitId;
      newProduct.unitName = unit.unitName;
      newProduct.price = unit.sellingPrice;
      calculateNewProductTotal();
    }
  }
}

function calculateNewProductTotal() {
  const quantity = Number(newProduct.quantity) || 0;
  const price = Number(newProduct.price) || 0;
  const discount = Number(newProduct.discount) || 0;

  newProduct.total = quantity * price * (1 - discount / 100);
}

function addNewProduct() {
  if (!newProduct.unitId || !newProduct.quantity) {
    message.error("Please select a unit and enter quantity");
    return;
  }

  formState.products.push({
    id: newProduct.id,
    productName: newProduct.productName,
    unitId: newProduct.unitId,
    unitName: newProduct.unitName,
    quantity: newProduct.quantity,
    price: newProduct.price,
    discount: newProduct.discount,
    total: newProduct.total,
    units: [],
  });

  productModalVisible.value = false;
  calculateTotal();
}

function updateProduct() {
  if (
    editingProductIndex.value === null ||
    !newProduct.unitId ||
    !newProduct.quantity
  ) {
    message.error("Please select a unit and enter quantity");
    return;
  }

  const index = editingProductIndex.value;
  formState.products[index] = {
    ...formState.products[index],
    unitId: newProduct.unitId,
    unitName: newProduct.unitName,
    quantity: newProduct.quantity,
    price: newProduct.price,
    discount: newProduct.discount,
    total: newProduct.total,
  };

  productModalVisible.value = false;
  editingProductIndex.value = null;
  calculateTotal();
}

function removeProduct(index: number) {
  formState.products.splice(index, 1);
  calculateTotal();
}

function addUnitToProduct(index: number) {
  const product = formState.products[index];
  selectedProductForUnit.value = product.id;
  selectedProductIndexForUnit.value = index;

  // Reset new unit form
  Object.assign(newUnit, {
    unitId: "",
    unitName: "",
    quantity: 1,
    price: 0,
    subtotal: 0,
  });

  unitModalVisible.value = true;
}

function addNewUnit() {
  if (!newUnit.unitId || !newUnit.quantity) {
    message.error("Please select a unit and enter quantity");
    return;
  }

  const product = products.value.find(
    (p) => p.id === selectedProductForUnit.value
  );
  if (!product) {
    message.error("Product not found");
    return;
  }

  const unit = product.units.find((u) => u.unitId === newUnit.unitId);
  if (!unit) {
    message.error("Unit not found");
    return;
  }

  newUnit.unitName = unit.unitName;
  newUnit.price = unit.sellingPrice;
  newUnit.subtotal = newUnit.quantity * newUnit.price;

  if (!formState.products[selectedProductIndexForUnit.value].units) {
    formState.products[selectedProductIndexForUnit.value].units = [];
  }

  formState.products[selectedProductIndexForUnit.value].units!.push({
    ...newUnit,
  });
  unitModalVisible.value = false;
  calculateTotal();
}

function removeUnit(productIndex: number, unitIndex: number) {
  const units = formState.products[productIndex].units;
  if (units && units.length > 0) {
    units.splice(unitIndex, 1);
    calculateTotal();
  }
}

function getProductUnits(productId: string) {
  if (!productId) return [] as any[];
  const product = products.value.find((p) => p.id === productId);
  return product ? product.units : [];
}

function calculateProductTotal(product: any) {
  let total = product.total || 0;

  if (product.units && product.units.length > 0) {
    total += product.units.reduce(
      (sum: number, unit: any) => sum + (unit.subtotal || 0),
      0
    );
  }

  return total;
}

function handleCustomerChange(value: string) {
  const customer = customers.value.find((c) => c.id === value);
  if (customer) {
    Object.assign(selectedCustomer, customer);
  }
}

function calculateTotal() {
  const discount = Number(formState.discount) || 0;
  const tax = Number(formState.tax) || 0;

  // Calculate total from all products and units
  let productsTotal = 0;
  formState.products.forEach((product) => {
    productsTotal += calculateProductTotal(product);
  });

  formState.totalAmount =
    productsTotal * (1 - discount / 100) * (1 + tax / 100);
}

async function onSubmit() {
  submitting.value = true;

  try {
    // Convert form data to Quotation format
    //@ts-ignore
    const quotationProducts: QuotationProduct[] = formState.products.map(
      (p) => {
        const product = products.value.find((prod) => prod.id === p.id);

        const allUnits: Array<{
          unitId: string;
          unitName: string;
          quantity: number;
          price: number;
          subtotal: number;
        }> = [];

        // Add main unit
        if (p.unitId) {
          allUnits.push({
            unitId: p.unitId,
            unitName: p.unitName || "",
            quantity: p.quantity,
            price: p.price,
            subtotal: p.total,
          });
        }

        // Add additional units
        if (p.units && p.units.length > 0) {
          p.units.forEach((unit) => {
            allUnits.push({
              unitId: unit.unitId,
              unitName: unit.unitName,
              quantity: unit.quantity,
              price: unit.price,
              subtotal: unit.subtotal,
            });
          });
        }

        return {
          product: {
            id: p.id,
            sku: product?.sku || "",
            name: p.productName || "",
          },
          units: allUnits,
          discount: p.discount,
          subtotal: allUnits.reduce((sum, unit) => sum + unit.subtotal, 0),
        };
      }
    );

    const customer = customers.value.find((c) => c.id === formState.customerId);

    if (!customer) {
      message.error("Please select a valid customer");
      submitting.value = false;
      return;
    }

    const quotationData: Quotation = {
      id: isEditing.value && props.id ? props.id : `q-${Date.now()}`,
      customer,
      products: quotationProducts,
      totalAmount: formState.totalAmount,
      discount: formState.discount || 0,
      tax: formState.tax || 0,
      note: formState.note,
      status: (formState.status as QuoteStatus) || QuoteStatus.PENDING,
      quoteNo: formState.quoteNo || `QT-${Date.now()}`,
      createdAt: isEditing.value ? undefined : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    console.log("quotationDAta", quotationData);

    // Save to localStorage
    const quotations = (getAll(KEY.QUOTATION)) || [];

    if (isEditing.value) {
      const index = quotations.findIndex((q: Quotation) => q.id === props.id);
      if (index !== -1) {
        quotations[index] = quotationData;
        await updateOne(KEY.QUOTATION, quotations);
        message.success("Quotation updated successfully");
      }
    } else {
     // quotations.push(quotationData);
      await createOne(quotationData, KEY.QUOTATION);
      message.success("Quotation created successfully");
    }

    router.push("/quotations");
  } catch (error) {
    message.error(
      isEditing.value
        ? "Failed to update quotation"
        : "Failed to create quotation"
    );
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped>
.quotation-form {
  max-width: 1400px;
  margin: 0 auto;
}

.two-column-layout {
  display: grid;
  grid-template-columns: 1fr 2.5fr;
}

.left-side,
.right-side {
  display: flex;
  flex-direction: column;
}

.products-card {
  flex: 1;
  height: fit-content;
}

.form-field {
  margin-bottom: 12px;
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

.line-total {
  font-weight: 500;
  padding: 4px 0;
}

.product-details {
  font-size: 13px;
  
}

.product-details .main-unit {
  margin-bottom: 4px;
}

.product-details .additional-unit {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 1px 0; */
  /* border-top: 1px dashed #f0f0f0; */
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #8c8c8c;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
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

/* Modal Styles */
.product-modal,
.unit-modal {
  padding: 10px;
}

.modal-section {
  margin-bottom: 0px;
  padding-bottom: 10px;
  /* border-bottom: 1px solid #f0f0f0; */
}

.modal-section h4 {
  margin-bottom: 12px;
  font-weight: 500;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 20px;
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

@media (max-width: 992px) {
  .two-column-layout {
    grid-template-columns: 1fr;
  }
}
</style>
