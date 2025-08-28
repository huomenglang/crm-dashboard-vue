<template>
  <a-modal
    :open="open"
    :title="isEdit ? 'Edit Quotation' : 'New Quotation'"
    @cancel="onCancel"
    :footer="null"
    width="900px"
  >
    <VForm
      :validation-schema="schema"
      @submit="onSubmit"
      v-slot="{ errors, handleSubmit, isSubmitting }"
    >
      <Form @submit.prevent="handleSubmit(onSubmit)">
        <!-- Customer -->
        <div class="flex gap-x-3">
          <Form.Item label="" class="flex-1" name="customerId">
            <label class="block text-[13px] font-medium text-gray-600"
              >Customer
            </label>
            <Field name="customerId" v-slot="{ field }">
              <a-select
                v-bind="field"
                placeholder="Select Customer"
                style="width: 100%"
              >
                <a-select-option
                  v-for="cus in customers"
                  :key="cus.id"
                  :value="cus.id"
                >
                  {{ cus.name }}
                </a-select-option>
              </a-select>
            </Field>
          </Form.Item>
          <Form.Item
            label=""
            class="flex-1"
            name="quotationDate"
            :help="errors.quotationDate"
            :validate-status="errors.quotationDate ? 'error' : ''"
          >
            <label class="block text-[13px] font-medium text-gray-600"
              >Date
            </label>
            <Field name="quotationDate" v-slot="{ field }">
              <a-date-picker
                v-bind="field"
                placeholder="Select Date"
                style="width: 100%"
              >
                <Field name="quotationDate" v-slot="{ field }">
                  <a-date-picker v-bind="field" class="w-full" />
                </Field>
              </a-date-picker>
            </Field>
          </Form.Item>
        </div>

        <!-- Products -->
        <Form.Item label="">
          <label class="block text-[13px] font-medium text-gray-600"
            >Products
          </label>
          <FieldArray name="products" v-slot="{ fields, push, remove }">
            <div>
              <div
                v-for="(product, index) in fields"
                :key="product.key"
                class="border p-3 mb-3 rounded-md"
              >
                <!-- Product Name -->
                <Form.Item
                  label=""
                  class="flex-1"
                  :name="`products[${index}].productId`"
                >
                  <label class="block text-[13px] font-medium text-gray-600"
                    >Product
                  </label>
                  <Field
                    :name="`products[${index}].productId`"
                    v-slot="{ field }"
                  >
                    <a-select
                      v-bind="field"
                      placeholder="Select Product"
                      style="width: 100%"
                    >
                      <a-select-option
                        v-for="pro in products"
                        :key="pro.id"
                        :value="pro.id"
                      >
                        {{ pro.name }}
                      </a-select-option>
                    </a-select>
                  </Field>
                </Form.Item>

                <!-- Units inside Product -->
                <FieldArray
                  :name="`products[${index}].units`"
                  v-slot="{
                    fields: unitFields,
                    push: pushUnit,
                    remove: removeUnit,
                  }"
                >
                  <div
                    v-for="(unit, uIndex) in unitFields"
                    :key="unit.key"
                    class="ml-4 border border-gray-300 flex justify-evenly p-2 gap-x-2 rounded-md mb-2"
                  >
                   
                    <Form.Item
                      label=""
                      class="flex-2"
                        :name="`products[${index}].units[${uIndex}].unitId`"
                    >
                      
                      <Field
                         :name="`products[${index}].units[${uIndex}].unitId`"
                        v-slot="{ field }"
                      >
                        <a-select
                          v-bind="field"
                          placeholder="Select Unit"
                          style="width: 100%"
                        >
                          <a-select-option
                            v-for="u in ums"
                            :key="u.id"
                            :value="u.id"
                          >
                            {{ u.name }}
                          </a-select-option>
                        </a-select>
                      </Field>
                    </Form.Item>
                  <!-- product qty -->
                     <Form.Item
                      label=""
                      class="flex-2"
                         :name="`products[${index}].units[${uIndex}].quantity`"
                    >
                      
                      <Field
                        :name="`products[${index}].units[${uIndex}].quantity`"
                        v-slot="{ field }"
                      >
                        <a-input
                          v-bind="field"
                          placeholder="Enter Quantity"
                          type="number"
                      />
                    </Field>
                  </Form.Item>

                    <Form.Item
                      label=""
                      class="flex-2"
                        :name="`products[${index}].units[${uIndex}].unitPrice`"
                    >
                      
                      <Field
                       :name="`products[${index}].units[${uIndex}].unitPrice`"
                        v-slot="{ field }"
                      >
                        <a-input
                          v-bind="field"
                          v-model:value="field.value"
                          placeholder="Enter Unit Price"
                          type="number"
                      />
                    </Field>
                  </Form.Item>

                    <Button secondary class="ml-1" danger @click="removeUnit(uIndex)"
                      >-</Button
                    >
                  </div>

                  <a-button
                    type="dashed"
                    block
                    @click="
                      pushUnit({
                        unitId: '',
                        quantity: 1,
                        unitPrice: 0,
                        subtotal: 0,
                        baseUnitId: '',
                        baseUnitQuantity: 1,
                      })
                    "
                  >
                    + Add Unit
                  </a-button>
                </FieldArray>

                <a-button type="link" danger @click="remove(index)"
                  >Remove Product</a-button
                >
              </div>

              <a-button
                type="dashed"
                block
                @click="
                  push({
                    productId: '',
                    productName: '',
                    units: [],
                    subtotal: 0,
                  })
                "
              >
                + Add Product
              </a-button>
            </div>
          </FieldArray>
        </Form.Item>

        <!-- Note -->
        <Form.Item label="" class="flex-1" name="note">
          <label class="block text-[13px] font-medium text-gray-600"
            >Note
          </label>
          <Field name="note" v-slot="{ field }">
            <a-textarea
              v-bind="field"
              placeholder="Enter Note"
              style="width: 100%"
            />
          </Field>
        </Form.Item>

        <!-- Status
        <a-form-item label="Status">
          <Field name="status" as="select" class="ant-input w-full">
            <option value="DRAFT">Draft</option>
            <option value="SENT">Sent</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </Field>
        </a-form-item> -->

        <!-- Actions -->
        <div class="flex justify-end gap-2">
          <a-button @click="onCancel">Cancel</a-button>
          <a-button type="primary" html-type="submit" :loading="isSubmitting">
            {{ isEdit ? "Update" : "Create" }}
          </a-button>
        </div>
      </Form>
    </VForm>
  </a-modal>
</template>

<script setup lang="ts">
import { Form as VForm, Field, FieldArray } from "vee-validate";
import { Button, Form } from "ant-design-vue";
import * as yup from "yup";
import type { Quotation } from "./quotation";
import { ref } from "vue";
import { getAll } from "@/data/ls_data";
import { KEY } from "@/data/Key";

// Props
const props = defineProps<{
  open: boolean;
  isEdit?: boolean;
  initialValues?: Partial<Quotation>;
  customers?: { id: string; name: string }[];
  productsList?: { id: string; name: string }[];
  unitsList?: { id: string; name: string }[];
}>();

const emit = defineEmits(["cancel", "submit"]);

const customers = ref(props.customers || getAll(KEY.CUSTOMER));
const products = ref(props.productsList || getAll(KEY.PRODUCT));
const ums = ref(props.unitsList || getAll(KEY.UNIT));
// Schema
const schema = yup.object({
  customerId: yup.string().required("Customer is required"),
  quotationDate: yup.string().required("Quotation date is required"),
  paymentMethod: yup.string().required("Payment method is required"),
  status: yup.string().required("Status is required"),
});

// Methods
const onCancel = () => {
  emit("cancel");
};

const onSubmit = (values: Partial<Quotation>) => {
  emit("submit", values);
};
</script>
