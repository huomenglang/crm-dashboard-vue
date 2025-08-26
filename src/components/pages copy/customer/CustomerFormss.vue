<template>
  <VForm
    :validation-schema="customerSchema"
    :initial-values="customer || {}"
    @submit="(values) => onSubmit(values)"
  >
    <!-- First Name -->
    <div class="flex justify-between gap-x-4">
      <div class="flex ">
         <Form.Item label="" name="firstname" class="mb-1 flex-1">
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >First Name</label
        >
        <Field name="firstname" v-slot="{ field, errorMessage }">
          <Input v-bind="field" placeholder="Enter first name" />
          <div v-if="errorMessage" class="text-red-500 text-sm">
            {{ errorMessage }}
          </div>
        </Field>
      </Form.Item>

      </div>
     
      <!-- Last Name -->
      <Form.Item label="" name="lastname" class="mb-1 flex-1">
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Last Name *</label
        >
        <Field name="lastname" v-slot="{ field, errorMessage }">
          <Input v-bind="field" placeholder="Enter last name" />
          <div v-if="errorMessage" class="text-red-500 text-sm">
            {{ errorMessage }}
          </div>
        </Field>
      </Form.Item>
    </div>

    <div class="flex justify-between gap-x-4">
      <!-- Gender -->
      <Form.Item class="flex-1">
        <label class="block text-sm font-medium text-gray-700">Gender</label>
        <Field name="gender" v-slot="{ field, errorMessage }">
          <a-select v-bind="field" placeholder="Select gender" size="large">
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

      <!-- Age -->
      <Form.Item class="flex-1">
        <label class="block text-sm font-medium text-gray-700">Age</label>
        <Field name="age" v-slot="{ field, errorMessage }">
          <a-input-number
            v-model:value="field.value"
            @change="field.value = $event"
            placeholder="Enter age"
            size="large"
            class="!w-full"
            :min="1"
            :max="120"
          />
          <div v-if="errorMessage" class="text-red-500 text-sm">
            {{ errorMessage }}
          </div>
        </Field>
      </Form.Item>
    </div>

    <!-- Email -->
    <Form.Item class="">
      <label class="block text-sm font-medium text-gray-700">Email *</label>
      <Field name="email" v-slot="{ field, errorMessage }">
        <a-input
          v-bind="field"
          placeholder="Enter email address"
          type="email"
          size="large"
        />
        <div v-if="errorMessage" class="text-red-500 text-sm">
          {{ errorMessage }}
        </div>
      </Field>
    </Form.Item>

    <!-- Phone Number -->
    <Form.Item class="">
      <label class="block text-sm font-medium text-gray-700 mb-2"
        >Phone Number</label
      >
      <Field name="phoneNumber" v-slot="{ field, errorMessage }">
        <a-input v-bind="field" placeholder="Enter phone number" size="large" />
        <div v-if="errorMessage" class="text-red-500 text-sm">
          {{ errorMessage }}
        </div>
      </Field>
    </Form.Item>

    <!-- Address -->
    <Form.Item class="">
      <label class="block text-sm font-medium text-gray-700">Address</label>
      <Field name="address" v-slot="{ field, errorMessage }">
        <a-textarea
          v-bind="field"
          placeholder="Enter address"
          :rows="3"
          size="large"
        />
        <div v-if="errorMessage" class="text-red-500 text-sm">
          {{ errorMessage }}
        </div>
      </Field>
    </Form.Item>

    <!-- Profile Image -->
    <Form.Item class="">
      <label class="block text-sm font-medium text-gray-700">Profile</label>
      <Field name="image" v-slot="{ field, errorMessage }">
        <Upload
          :file="field.value"
          :url-link="field.value"
          @change="(data: any) => handleImageChange(data)"
        />
        <span class="text-red-500 text-sm">{{ errorMessage }}</span>
      </Field>
    </Form.Item>
    <!-- <a-form-item label="Photo">
          <Field name="image" v-slot="{ field}">
            <input type="file" accept="image/*" @change="onImageChange" />
            <div v-if="values.image" class="mt-2">
              <img :src="values.image" class="w-20 h-20 object-cover rounded" />
            </div>
          </Field>
        </a-form-item> -->

    <a-form-item class="mb-0">
      <div class="flex justify-end space-x-3 pt-4 gap-2">
        <round-button
          :is-danger="true"
          size="large"
          @click="$emit('cancel')"
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
          {{ isEditMode ? "Update" : "Create" }}
        </round-button>
      </div>
    </a-form-item>
  </VForm>
</template>

<script lang="ts" setup>
import {Form, Input } from "ant-design-vue";
import { Form as VForm, Field } from "vee-validate";
import * as yup from "yup";
import RoundButton from "@/components/base/button/RoundButton.vue";
import Upload from "@/components/base/upload/Upload.vue";
import type { Customer } from "./customer";
import { computed } from "vue";

interface Props {
  customer?: Partial<Customer> | null;
  isEditMode?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  customer: null,
  isEditMode: false,
});

const emit = defineEmits<{
  (e: "submit", customer: any, isEditMode: boolean): void;
  (e: "cancel"): void;
}>();

console.log("Props customer: ", props.customer);

// Yup validation schema
const customerSchema = yup.object({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: yup.string().optional(),
  gender: yup
    .string()
    .optional()
    .oneOf(["Male", "Female", "Other", ""], "Please select a valid gender"),
  age: yup
    .number()
    .optional()
    .min(1, "Age must be at least 1")
    .max(120, "Age must be less than 120")
    .typeError("Age must be a number"),
  address: yup
    .string()
    .optional()
    .max(500, "Address must be less than 500 characters"),
  image: yup.string().optional(),
});

const isEditMode = computed(() => props.isEditMode);

// Handle image change
const handleImageChange = (data: any) => {
  console.log("Image changed:", data);
};

// Handle form submission
const onSubmit = (formData: any) => {

  //@ts-ignore
  const cleanedValues = Object.fromEntries(
    Object.entries(formData).map(([key, value]) => {
      console.log("Key:", key, "Value:", value);
      return [key, value === "" || value === null ? undefined : value];
    })
  ) as Customer;

  console.log("Submitting form with values:", cleanedValues);
  emit("submit", cleanedValues, isEditMode.value);
};
</script>
