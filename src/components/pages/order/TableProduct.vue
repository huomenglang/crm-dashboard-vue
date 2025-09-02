<template>
  <a-table
    :data-source="productsOrdered"
    :columns="columns"
    :pagination="false"
    row-key="product.productId"
    size="small"
    class="products-table"
  >
    <template #bodyCell="{ column, record, index }">
      <template v-if="column.key === 'product'">
        <div class="product-info">
          <div class="product-name">{{ record.product.name }}</div>
          <div class="product-sku">SKU: {{ record.product.sku }}</div>
        </div>
      </template>

      <template v-else-if="column.key === 'units'">
        <div class="units-container">
          <div
            v-for="unit in record.units"
            :key="unit?.unitId"
            class="unit-item"
          >
            <div class="flex items-center">
              <span class="unit-name flex-1">{{ unit?.unitName }}</span>

              <div class="flex-3">
                <div class="flex items-center">
                  <div class="flex-4">
                    <span class="unit-quantity">( {{ unit?.quantity }} ×</span>

                    <span class="unit-quantity"
                      >${{ unit?.price.toFixed(2) }} )
                    </span>
                  </div>

                  <div class="flex-1" v-if="editable">
                    <div class="flex items-center">
                      <a-button
                        type="link"
                        size="small"
                        @click="editUnit(record, unit)"
                        class="action-btn"
                      >
                        <edit-outlined />
                      </a-button>
                      <a-button
                        v-if="record.units.length > 1"
                        type="link"
                        size="small"
                        danger
                        @click="removeUnit(record, unit)"
                        class="action-btn"
                      >
                        <delete-outlined />
                      </a-button>
                      <a-button
                        v-if="
                          record.units[record.units?.length - 1]?.unitId ===
                          unit?.unitId
                        "
                        type="dashed"
                        size="small"
                        @click="addUnit(record)"
                        class="action-btn"
                      >
                        <plus-outlined />
                      </a-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-else-if="column.key === 'discount'">
        <div class="discount-container">
          <a-input-number
            v-if="editable"
            v-model:value="record.discount"
            :min="0"
            :max="100"
            :step="1"
            addon-after="%"
            size="small"
            @change="updateProductDiscount(record)"
            class="discount-input"
          />
          <span v-else class="discount-value"
            >{{ record.discount ? record.discount : 0 }}%</span
          >
        </div>
      </template>

      <template v-else-if="column.key === 'subtotal'">
        <!-- <div class="subtotal">${{ record.subtotal.toFixed(2) }}</div> -->
        <div class="subtotal">$ {{ calSubTotal(record).toFixed(2) }}</div>
      </template>

      <template v-else-if="column.key === 'actions' && editable">
        <a-button
          type="primary"
          danger
          @click="removeProduct(index)"
          class="remove-product-btn !h-[25px] !flex !items-center justify-center !px-1"
        >
          <delete-outlined />
        </a-button>
      </template>
    </template>
  </a-table>

  <a-modal
    v-model:open="open"
    title="Add New Unit"
    :footer="null"
    @cancel="onClose"
  >
    <VForm
      @submit="onSubmitUnit"
      :initial-values="initialData || {}"
      :validation-schema="schema"
      ref="unitsForm"
      v-slot="{ errors }"
    >
      <Form.Item label="" class="flex-1 mt-2" name="category">
        <label class="block text-[13px] font-medium text-gray-600"
          >Unit Name
        </label>
        <Field name="unitId" v-slot="{ field }">
          <a-select
            v-bind="field"
            v-model:value="field.value"
            placeholder="Select Unit"
            style="width: 100%"
          >
            <a-select-option
              v-for="unit in getProductUnits(productUnit)"
              :key="unit.unitId"
              :value="unit.unitId"
              :label="unit.unitName"
            >
              {{ unit.unitName }}
            </a-select-option>
          </a-select>
        </Field>
      </Form.Item>

      <Form.Item>
        <label class="block text-[13px] font-medium text-gray-600"
          >Quantity
        </label>
        <Field :name="`quantity`" v-slot="{ field }">
          <a-input-number
            v-bind="field"
            v-model:value="field.value"
            :min="1"
            :precision="2"
            :status="errors&& errors[`quantity`] ? 'error' : ''"
            style="width: 100%"
          />
        </Field>
      </Form.Item>

      <a-button class="w-full" type="primary" html-type="submit"
        >Add Unit</a-button
      >
    </VForm>
  </a-modal>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";
import type { OrderProduct, OrderUnit } from "../order/order";
import type { Unit } from "../quotation/type";
import { Field, Form as VForm, type FormContext } from "vee-validate";
import * as yup from "yup";
import { Form } from "ant-design-vue";
import { productData } from "@/data/mock_data";

const schema = yup.object({
  unitId: yup.string().required("Unit is required"),
  quantity: yup.number().required("Quantity is required"),
});

const unitsForm = ref<FormContext | null>();

const props = defineProps<{
  products: OrderProduct[];
  editable?: boolean;
}>();

const open = ref<boolean>(false);

const emit = defineEmits<{
  (e: "product-update", products: OrderProduct[]): void;
}>();

const productEdit = ref<OrderProduct | null>(null);
const productUnit = ref<any>(null);
let initialData = reactive<any>({});

let productsOrdered: any = computed(() => props.products);
const isEditQty = ref<boolean>(false);
const columns = [
  {
    title: "Product",
    key: "product",
    width: "30%",
  },
  {
    title: "Units",
    key: "units",
    width: "45%",
  },
  {
    title: "Discount",
    key: "discount",
    width: "12%",
  },
  {
    title: "Subtotal",
    key: "subtotal",
    width: "10%",
  },
  ...(props.editable
    ? [
        {
          title: "",
          key: "actions",
          width: "5%",
        },
      ]
    : []),
];

const onSubmitUnit = async (value: any) => {
  if (isEditQty.value) {
    const foundUnit: any = productEdit?.value?.units?.find(
      (u: Unit) => u.unitId === value?.unitId
    );

    console.log("productUnit: ",productUnit.value)
    productsOrdered = props.products.map((p: any) => {
      if (p.product.productId === productUnit.value?.product.productId) {
        const allUnits = productUnit.value.units?.map((unit: any) => {
          if (unit.unitId === value.unitId) {
            const newUnit = {
              unitId: value.unitId,
              unitName: foundUnit?.unitName,
              price: foundUnit?.sellingPrice,
              baseUnitId: foundUnit?.baseUnitId,
              baseUnitQuantity: foundUnit?.conversionToBase,
              subtotal: 0,
              quantity: value?.quantity,
            };
            return newUnit;
          }else return {...unit}
        });
        return { ...p, units: allUnits };
      } else return p;
    });
   
  } else {
    console.log("creating....")
    const foundUnit: any = productEdit.value?.units?.find(
      (u: Unit) => u.unitId === value?.unitId
    );
    const newUnit = {
      unitId: value.unitId,
      unitName: foundUnit?.unitName,
      price: foundUnit?.sellingPrice,
      baseUnitId: foundUnit?.baseUnitId,
      baseUnitQuantity: foundUnit?.conversionToBase,
      subtotal: 0,
      quantity: value?.quantity,
    };
    productsOrdered = props.products.map((p: any) => {
      if (p.product.productId === productUnit.value?.product.productId) {
        const allUnits = p.units;
        allUnits.push(newUnit);
        return { ...p, units: allUnits };
      } else return p;
    });
    if (unitsForm.value) {
      unitsForm.value.resetForm();
    }
  }
  open.value = false;
   if (unitsForm.value) {
      unitsForm.value.resetForm();
    }
};

const onClose = () => {
  open.value = false;
  isEditQty.value = false;
  productUnit.value = null;
  unitsForm.value?.resetForm();
};
const editUnit = (product: OrderProduct, unit: OrderUnit) => {
  console.log("is edit..", unit);

  isEditQty.value = true;
  open.value = true;

  const foundProduct: any = productData.find(
    (p: any) => p?.id === product.product.id
  );
  productEdit.value = foundProduct;

  //get only non selected units
  const existUnit = product.units;

  productUnit.value = { ...product, units: existUnit };

  initialData = {
    unitId: unit.unitId,
    quantity: unit.quantity,
  };
  // if (newQuantity !== null) {
  //   const quantity = parseInt(newQuantity);
  //   if (!isNaN(quantity) && quantity > 0) {
  //     unit.quantity = quantity;
  //     unit.subtotal = unit.price * quantity;
  //     updateProductSubtotal(product);
  //   }
  // }
};

function getProductUnits(product: any) {
  if (!product) return [];
  return product ? product.units : [];
}

const addUnit = (product: OrderProduct) => {
  // In a real app, you would show a modal to add a new unit
  const foundProduct: any = productData.find(
    (p: any) => p?.id === product.product.id
  );
  isEditQty.value=false
  productEdit.value = foundProduct;

  //get only non selected units
  const existUnit = product.units;
  console.log("un sel: ", existUnit);
  const unSelected = foundProduct?.units?.filter(
    (unit: any) => !existUnit.some((f: any) => f?.unitId === unit.unitId)
  );
  productUnit.value = { ...product, units: unSelected };
  // const unSelected=foundProduct?.units?.filter((unit:any)=>!existUnit.some((f:any)=>f?.unitId===unit.unitId));

  open.value = true;
};

const removeUnit = (product: OrderProduct, unit: OrderUnit) => {
  if (product.units.length <= 1) {
    // alert(
    //   "Cannot remove the only unit of a product. Remove the entire product instead."
    // );
    return;
  }

  product.units = product.units.filter((u: any) => u.unitId !== unit.unitId);
  updateProductSubtotal(product);
};

const removeProduct = (index: number) => {
  const newProducts = [...props.products];
  newProducts.splice(index, 1);
  emit("product-update", newProducts);
};

const calSubTotal = (record: OrderProduct) => {
  let totalItemPrice = record.units.reduce(
    (sum: any, unit: any) => sum + unit?.quantity * unit?.price,
    0
  );
  return totalItemPrice - (record?.discount ? record.discount : 0 / 100);
};

const updateProductDiscount = (product: OrderProduct) => {
  // Recalculate subtotal with discount
  const unitsSubtotal = product.units.reduce(
    (sum: any, unit: any) => sum + unit.subtotal,
    0
  );
  product.subtotal = unitsSubtotal * (1 - (product.discount || 0) / 100);
  emit("product-update", [...props.products]);
};

const updateProductSubtotal = (product: OrderProduct) => {
  // Recalculate product subtotal
  const unitsSubtotal = product.units.reduce(
    (sum: any, unit: any) => sum + unit.subtotal,
    0
  );
  product.subtotal = unitsSubtotal * (1 - (product.discount || 0) / 100);
  emit("product-update", [...props.products]);
};
</script>

<style scoped>
.products-table :deep(.ant-table-thead > tr > th) {
  background-color: #fafafa;
  font-weight: 600;
  font-size: 12px;
  color: #595959;
  padding: 8px 12px;
}

.products-table :deep(.ant-table-tbody > tr > td) {
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.product-info {
  display: flex;
  flex-direction: column;
}

.product-name {
  font-weight: 500;
  font-size: 13px;
  color: #262626;
  margin-bottom: 2px;
}

.product-sku {
  font-size: 11px;
  color: #8c8c8c;
}

.units-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.unit-item {
  padding: 8px;
  background-color: #fafafa;
  border-radius: 4px;
  border: 1px solid #f0f0f0;
}

.unit-header {
  display: flex;
  align-items: center;

  gap: 6px;
  margin-bottom: 4px;
}

.unit-name {
  font-weight: 500;
  font-size: 12px;
  color: #262626;
}

.unit-base {
  font-size: 11px;
  color: #8c8c8c;
}

.unit-details {
  display: flex;
  align-items: center;
  gap: 6px;
  /* flex-wrap: wrap; */
  justify-content: flex-end;
}

.unit-quantity {
  font-size: 12px;
  color: #595959;
  font-weight: 400;
}

.unit-price {
  font-size: 12px;
  color: #1890ff;
}

.unit-subtotal {
  font-weight: 500;
  font-size: 11px;
  color: #389e0d;
}

.unit-actions {
  margin-left: auto;
  display: flex;
  gap: 4px;
}

.action-btn {
  height: 22px;
  width: 22px;
  min-width: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-unit-btn {
  margin-top: 8px;
  font-size: 12px;
}

.discount-container {
  display: flex;
  justify-content: center;
}

.discount-input {
  width: 90px;
}

.discount-value {
  font-size: 12px;
  color: #1890ff;
  font-weight: 500;
}

.subtotal {
  font-weight: 600;
  font-size: 12px;
  width: 100px;
  color: #389e0d;
  text-align: left;
}

.remove-product-btn {
  /* color: #ff4d4f; */
  font-size: 14px;
}
</style>
