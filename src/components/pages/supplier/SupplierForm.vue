<script setup lang="ts">
import { Modal, Form, Input } from "ant-design-vue";
import { Form as VForm, Field } from "vee-validate";
import * as yup from "yup";
import RoundButton from "@/components/base/button/RoundButton.vue";
import Upload from "@/components/base/upload/Upload.vue";
import type { Supplier } from "./supplier";

const props = defineProps<{
  open: boolean;
  isEditing: boolean;
  initialValues?: Partial<Supplier>;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "submit", values: any): void;
}>();

// ✅ Validation schema
const schema = yup.object({
  name: yup.string().required(" Name is required"),
  phoneNumber: yup.string().required("Phone Number is require"),
  image: yup.string().notRequired(),
});
</script>

<template>
  <Modal
    :open="props.open"
    :title="props.isEditing ? 'Edit Supplier' : 'Create Supplier'"
    :footer="null"
    destroyOnClose
    width="700px"

    @cancel="emit('close')"
  >
    <VForm
      :initial-values="initialValues || {}"
      :validation-schema="schema"
      @submit="(values) => emit('submit', values)"
    >
      <div class="flex gap-x-1">
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
         <Form.Item label="" name="gender" class="flex-1">
          <label class="block text-[13px] font-medium text-gray-600"
            >Gender</label
          >
          <Field name="gender" v-slot="{ field, errorMessage }">
            <a-select v-bind="field" placeholder="Select gender">
              <a-select-option value="">Select gender</a-select-option>
              <a-select-option value="Male">Male</a-select-option>
              <a-select-option value="Female">Female</a-select-option>
              <a-select-option value="Other">Other</a-select-option>
            </a-select>
            <div v-if="errorMessage" class="text-red-500 text-sm">
              {{ errorMessage }}
            </div>
          </Field>
        </Form.Item>
      </div>

      <div class="-mt-4">
        <Form.Item label="" name="phoneNumber">
          <label class="text-[13px] font-medium text-gray-600"
            >Phone Number
          </label>
          <Field name="phoneNumber" v-slot="{ field, errorMessage }">
            <Input v-bind="field" placeholder="Enter Phone Number" />
            <div v-if="errorMessage" class="text-red-500 text-sm">
              {{ errorMessage }}
            </div>
          </Field>
        </Form.Item>
      </div>

        <div class="-mt-4">
        <Form.Item label="" name="address">
          <label class="text-[13px] font-medium text-gray-600">Address </label>
          <Field name="address" v-slot="{ field, errorMessage }">
            <Input v-bind="field" placeholder="Enter Address" />
            <div v-if="errorMessage" class="text-red-500 text-sm">
              {{ errorMessage }}
            </div>
          </Field>
        </Form.Item>
      </div>

      <div class="-mt-4">
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
