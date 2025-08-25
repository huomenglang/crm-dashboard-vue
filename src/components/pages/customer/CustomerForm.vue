<template>
  <Form
    :validation-schema="schema"
    v-slot="{ errors, isSubmitting, meta }"
  >
  <a-form key="customer-form" @submit.prevent="onSubmit">

    <div class="">
      <!-- First Name -->
      <div class="flex justify-between gap-x-4">
        <a-form-item
          :validate-status="errors.firstname ? 'error' : ''"
          :help="errors.firstname"
          class="flex-1"
        >
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >First Name *</label
          >
          <Field name="firstname" v-slot="{ field, handleChange }">
            <a-input
              v-bind="field"
              :value="field.value"
              @update:value="handleChange"
              placeholder="Enter first name"
              size="large"
              :class="{ 'border-red-500': errors.firstname }"
            />
          </Field>
        </a-form-item>

        <!-- Last Name -->
        <a-form-item
          :validate-status="errors.lastname ? 'error' : ''"
          :help="errors.lastname"
          class="mb-1 flex-1"
        >
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Last Name *</label
          >
          <Field name="lastname" v-slot="{ field, handleChange }">
            <a-input
              v-bind="field"
              :value="field.value"
              @update:value="handleChange"
              placeholder="Enter last name"
              size="large"
              :class="{ 'border-red-500': errors.lastname }"
            />
          </Field>
        </a-form-item>
      </div>

      <div class="flex justify-between gap-x-4">
              <!-- Gender -->
      <a-form-item
        :validate-status="errors.gender ? 'error' : ''"
        :help="errors.gender"
        class="flex-1"
      >
        <label class="block text-sm font-medium text-gray-700"
          >Gender</label
        >
        <Field name="gender" v-slot="{ field, handleChange }">
          <a-select
            v-bind="field"
            :value="field.value"
            @update:value="handleChange"
            placeholder="Select gender"
            size="large"
            :class="{ 'border-red-500': errors.gender }"
          >
            <a-select-option value="">Select gender</a-select-option>
            <a-select-option value="Male">Male</a-select-option>
            <a-select-option value="Female">Female</a-select-option>
            <a-select-option value="Other">Other</a-select-option>
          </a-select>
        </Field>
      </a-form-item>

      <!-- Age -->
      <a-form-item
        :validate-status="errors.age ? 'error' : ''"
        :help="errors.age"
        class="flex-1 "
      >
        <label class="block text-sm font-medium text-gray-700">Age</label>
        <Field name="age" v-slot="{ field, handleChange }">
          <a-input-number
            v-bind="field"
            :value="field.value"
            @update:value="handleChange"
            placeholder="Enter age"
            size="large"
            class="!w-full"
            :min="1"
            :max="120"
            :class="{ 'border-red-500': errors.age }"
          />
        </Field>
      </a-form-item>

      </div>
      <!-- Email -->
      <a-form-item
        :validate-status="errors.email ? 'error' : ''"
        :help="errors.email"
        class=""
      >
        <label class="block text-sm font-medium text-gray-700"
          >Email *</label
        >
        <Field name="email" v-slot="{ field, handleChange }">
          <a-input
            v-bind="field"
            :value="field.value"
            @update:value="handleChange"
            placeholder="Enter email address"
            type="email"
            size="large"
            :class="{ 'border-red-500': errors.email }"
          />
        </Field>
      </a-form-item>

      <!-- Phone Number -->
      <a-form-item
        :validate-status="errors.phoneNumber ? 'error' : ''"
        :help="errors.phoneNumber"
        class=""
      >
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Phone Number</label
        >
        <Field name="phoneNumber" v-slot="{ field, handleChange }">
          <a-input
            v-bind="field"
            :value="field.value"
            @update:value="handleChange"
            placeholder="Enter phone number"
            size="large"
            :class="{ 'border-red-500': errors.phoneNumber }"
          />
        </Field>
      </a-form-item>



      <!-- Address -->
      <a-form-item
        :validate-status="errors.address ? 'error' : ''"
        :help="errors.address"
        class=""
      >
        <label class="block text-sm font-medium text-gray-700"
          >Address</label
        >
        <Field name="address" v-slot="{ field, handleChange }">
          <a-textarea
            v-bind="field"
            :value="field.value"
            @update:value="handleChange"
            placeholder="Enter address"
            :rows="3"
            size="large"
            :class="{ 'border-red-500': errors.address }"
          />
        </Field>
      </a-form-item>

      <!-- Form Status -->
      <!-- <div
        v-if="meta.touched && !meta.valid"
        class="p-3 bg-red-50 border border-red-200 rounded-md"
      >
        <p class="text-red-600 text-sm">
          Please Input Required fields before submitting.
        </p>
      </div> -->

      <!-- Submit Buttons -->
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
            :loading="isSubmitting"
            :disabled="!meta.valid || isSubmitting"
            class="min-w-[100px]"
          >
            {{
              isSubmitting ? "Processing..." : isEditMode ? "Update" : "Create"
            }}
          </round-button>
        </div>
      </a-form-item>
    </div>
      </a-form>
  </Form>
</template>

<script lang="ts" setup>
import { reactive, watch, computed } from "vue";
import { Form, Field, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import RoundButton from "@/components/base/button/RoundButton.vue";

interface Customer {
  firstname?: string;
  lastname?: string;
  gender?: string;
  age?: number;
  email?: string;
  phoneNumber?: string;
  address?: string;
}

interface Props {
  customer?: Customer;
  isEditMode?: boolean;
}

// Yup validation schema
const customerSchema = yup.object({
  firstname: yup.string().required("First name is required"),

  lastname: yup.string().required("Last name is required"),

  email: yup.string().required("Email is required"),

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
});

// Convert Yup schema to vee-validate schema
const schema = toTypedSchema(customerSchema);

// Initial form values
const initialValues = reactive({
  firstname: "",
  lastname: "",
  email: "",
  phoneNumber: "",
  gender: "",
  age: undefined as number | undefined,
  address: "",
});

const props = withDefaults(defineProps<Props>(), {
  customer: undefined,
  isEditMode: false,
});
// Use vee-validate's useForm to manage form state
const { handleSubmit, resetForm, setValues } = useForm({
  validationSchema: schema,
  initialValues: initialValues,
});

const emit = defineEmits<{
  (e: "submit", customer: Customer, isEdit: boolean): void;
  (e: "cancel"): void;
}>();

const isEditMode = computed(() => props.isEditMode);

// Watch for prop changes to populate form
watch(
  () => props.customer,
  (newCustomer) => {
    if (newCustomer) {
      // If customer has value, set form values from customer
      setValues({
        firstname: newCustomer.firstname || "",
        lastname: newCustomer.lastname || "",
        email: newCustomer.email || "",
        phoneNumber: newCustomer.phoneNumber || "",
        gender: newCustomer.gender || "",
        age: newCustomer.age || undefined,
        address: newCustomer.address || "",
      });
    } else {
      // If customer is undefined, reset to default values
      resetForm({
        values: initialValues
      });
    }
  },
  { immediate: true, deep: true }
);

// Handle form submission
const onSubmit = handleSubmit((values) => {
  // Convert empty strings to undefined for cleaner data
  //@ts-ignore
  const cleanedValues = Object.fromEntries(
    Object.entries(values).map(([key, value]) => [
      key, 
      value === "" || value === null ? undefined : value
    ])
  ) as Customer;
  console.log("Submitting form with values:", cleanedValues);

  emit("submit", cleanedValues, isEditMode.value);
});
</script>

<style scoped>
:deep(.ant-input),
:deep(.ant-input-number),
:deep(.ant-select),
:deep(.ant-textarea) {
  border-radius: 6px;
}

:deep(.ant-input:focus),
:deep(.ant-input-number:focus),
:deep(.ant-select:focus),
:deep(.ant-textarea:focus) {
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

:deep(.border-red-500 .ant-input),
:deep(.border-red-500 .ant-input-number),
:deep(.border-red-500 .ant-select .ant-select-selector),
:deep(.border-red-500 .ant-textarea) {
  border-color: #ff4d4f !important;
}
</style>
