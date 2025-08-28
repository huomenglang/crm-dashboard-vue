<script setup lang="ts">
import { Modal, Form, Input, Button } from "ant-design-vue";
import { Form as VForm, Field, useFieldArray, useForm } from "vee-validate";
import * as yup from "yup";
import RoundButton from "@/components/base/button/RoundButton.vue";
import Upload from "@/components/base/upload/Upload.vue";
import type { ProductRequest, ProductResponse, ProductUnit } from "./product";
import type { CategoryProps } from "../category/category";
import { getAll } from "@/data/ls_data";
import { ref, toRaw, watch } from "vue";
import { KEY } from "@/data/Key";
import { type UmsProps } from "../ums/ums";
import type { SelectProps } from "ant-design-vue/es/vc-select";

const props = defineProps<{
  open: boolean;
  isEditing: boolean;
  initialValues?: any;
}>();

const { setFieldValue, resetField,resetForm } = useForm({
  initialValues: props.initialValues || {
    name: "",
    categoryId: undefined,
    description: "",
    units: [
      {
        unitId: Date.now().toString(),
        unitName: "",
        conversionToBase: 1,
        sellingPrice: 0,
      },
    ],
  },
});

const { remove, fields, push } = useFieldArray("units");

const emit = defineEmits<{
  (e: "close"): void;
  (e: "submit", values: any): void;
}>();

//Mock category data
const categoryList = ref<CategoryProps[]>(getAll(KEY.CATEGORY));


let options = ref<SelectProps['options']>(getAll(KEY.UNIT)).value?.map(unit => ({
  value: unit.id,
  label: unit.name,
  id: unit.id,
}));

let dataUnits=options


const filterOption = (input: string, option: any) => {
  const label = option?.label?.toString().toLowerCase() || "";
  const value = option?.value?.toString().toLowerCase() || "";
  return (
    label.includes(input.toLowerCase()) || value.includes(input.toLowerCase())
  );
};


// ✅ Validation schema
const schema = yup.object({
  name: yup.string().required(),
  categoryId: yup.number().required("Category is required"),
  
});


watch(
  () => props.open,
  (isOpen) => {
    if (props.isEditing && props.initialValues) {
      // reset form with initialValues (including units array)
      console.log('Resetting form with initial values:', toRaw(props.initialValues));

      resetForm({
        values: {
          ...props.initialValues,
          // fallback to at least 1 unit
          units:
            props.initialValues?.units?.length > 0
              ? props.initialValues.units 
              : [
                  {
                    unitId: Date.now().toString(),
                    unitName: "",
                    conversionToBase: 1,
                    sellingPrice: 0,
                  },
                ],
        },
      });
       console.log('all options',options)
      const selectedProdId=toRaw(props.initialValues.units).map((f:any)=>f?.unitName?.key);
      const newOptions=dataUnits?.filter((unit)=>!selectedProdId?.some((f:any)=>f===unit.id))
      console.log('selectedProdId values:',selectedProdId);
      console.log('newOptions values:',newOptions);
      options=newOptions;

    }

    if (isOpen && !props.isEditing) {
      // Reset to default for new create
      resetForm({
        values: {
          name: "",
          categoryId: undefined,
          description: "",
          units: [
            {
              unitId: Date.now().toString(),
              unitName: "",
              conversionToBase: 1,
              sellingPrice: 0,
            },
          ],
        },
      });
    }
  }
);

//remove used unit after selected
const handleRemoveUnit = (idx: any,data:any) => {
  console.log('fields values:',toRaw(fields?.value?.map(f=>toRaw(f.value))));
  console.log('dataUnits values:',toRaw(data[idx]?.value?.unitId));

  const newUnit=dataUnits?.find(unit=>unit.id===toRaw(data[idx]?.value?.unitId))
  console.log('options values:',newUnit?.label);
  if(newUnit) {
    let isExist=options?.find(op=>op.id===newUnit?.id);
    if(!isExist) {
      options?.push(newUnit);
    }
  }
  remove(idx);

};


</script>

<template>
  <Modal
    :open="props.open"
    :title="props.isEditing ? 'Edit Customer' : 'Create Customer'"
    :footer="null"
    destroyOnClose
    width="700px"
    @cancel="emit('close')"
  >
    <VForm
      :initial-values="initialValues || {}"
      :validation-schema="schema"
      v-slot="{ errors }"
      @submit="(values) => emit('submit', values)"
    >
      <div class="">
        <Form.Item label="" class="flex-1" name="name">
          <label class="block text-[13px] font-medium text-gray-600"
            >Name *</label
          >
          <Field name="name" v-slot="{ field, errorMessage }">
            <Input v-bind="field" placeholder="Enter Name" />
            <div v-if="errorMessage" class="text-red-500 text-sm">
              {{ errorMessage }}
            </div>
          </Field>
        </Form.Item>
      </div>
      <div class="">
        <Form.Item label="" class="flex-1" name="sku">
          <label class="block text-[13px] font-medium text-gray-600"
            >SKU *</label
          >
          <Field name="sku" v-slot="{ field, errorMessage }">
            <Input v-bind="field" placeholder="Enter SKU" />
            <div v-if="errorMessage" class="text-red-500 text-sm">
              {{ errorMessage }}
            </div>
          </Field>
        </Form.Item>
      </div>

      <div class="-mt-3">
        <Form.Item label="" class="flex-1" name="category">
          <label class="block text-[13px] font-medium text-gray-600"
            >Category Name
          </label>
          <Field name="categoryId" v-slot="{ field }">
            <a-select
              v-bind="field"
              placeholder="Select category"
              style="width: 100%"
            >
              <a-select-option
                v-for="cat in categoryList"
                :key="cat.id"
                :value="cat.id"
              >
                {{ cat.name }}
              </a-select-option>
            </a-select>
          </Field>
        </Form.Item>
      </div>

      <!-- Units -->
      <div class="mb-3">
        <label class="block">Units</label>

        <div
          v-for="(unit, idx) in fields"
          :key="unit.key"
          class="flex gap-2 mb-2 items-center"
        >
          <!-- Unit Name -->
          <Field :name="`units[${idx}].unitName`" v-slot="{ field }">
            <a-select
              v-bind="field"
              :options="options"
              show-search
              placeholder="Select unit"
              :filter-option="filterOption"
              
              @select="(selected:any) => {
                console.log('selected unit:', selected);
                //@ts-ignore
                setFieldValue(`units[${idx}].unitId`, selected.value);
                
              }"
              @blur="() => {
                console.log('blur event',fields);
                //@ts-ignore
                const newOptions=dataUnits?.filter((unit)=>!fields.some(f=>f?.value?.unitId===unit.id))
                options=newOptions;
                
              }"
              
              style="width: 300px"
              allow-clear
              label-in-value
             
            />
          </Field>

          <!-- Conversion -->
          <Field
            :name="`units[${idx}].conversionToBase`"
            as="a-input-number"
            placeholder="Conversion"
            style="width: 300px"
          />

          <!-- Price -->
          <Field
            :name="`units[${idx}].sellingPrice`"
            as="a-input-number"
            placeholder="Price"
            style="width: 200px"
          />

          <!-- Remove button -->
          <Button danger @click="handleRemoveUnit(idx,fields)">-</Button>
        </div>

        <!-- Validation error -->
        <div class="text-red-500 text-xs">{{ errors.units }}</div>

        <!-- Add Unit Button -->
        <Button
          type="dashed"
          class="mt-2"
          @click="
            push({
              unitId: Date.now().toString(),
              unitName: '',
              conversionToBase: 1,
              sellingPrice: 0,
            })
          "
        >
          + Add Unit
        </Button>
      </div>

      <div class="mt-3">
        <Form.Item label="" name="description">
          <label class="text-[13px] font-medium text-gray-600"
            >Description
          </label>
          <Field name="description" v-slot="{ field, errorMessage }">
            <Input v-bind="field" placeholder="Enter Description" />
            <div v-if="errorMessage" class="text-red-500 text-sm">
              {{ errorMessage }}
            </div>
          </Field>
        </Form.Item>
      </div>

      <Form.Item label="" name="image">
        <Field name="image" v-slot="{ field, setValue, errorMessage }">
          <Upload
            :file="field.value"
            :url-link="field.value"
            @change="(data: any) => setValue(data?.base64)"
          />
          <span class="text-red-500 text-sm">{{ errorMessage }}</span>
        </Field>
      </Form.Item>

      <div class="flex justify-end space-x-3 pt-4 gap-2">
        <round-button
          :is-danger="true"
          size="large"
          @click="$emit('close')"
          class="min-w-[100px]"
        >
          Cancel
        </round-button>
        <round-button
          type="primary"
          size="large"
          html-type="submit"
          class="min-w-[100px]"
        >
          {{ isEditing ? "Update" : "Create" }}
        </round-button>
      </div>
    </VForm>
  </Modal>
</template>
