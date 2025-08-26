<template>
  <a-modal
    :open="open"
    :title="isEdit ? 'Edit Customer' : 'Create Customer'"
    :footer="null"
    destroyOnClose
  >
    <Form v-slot="{ errors, handleSubmit }">
      <div class="space-y-4">
        <!-- Name -->
        <a-form-item label="Name" :validate-status="errors.name ? 'error' : ''" :help="errors.name">
          <Field name="name" v-slot="{ field }">
            <a-input v-bind="field" placeholder="Enter name" />
          </Field>
        </a-form-item>

        <!-- Gender -->
        <a-form-item label="Gender" :validate-status="errors.gender ? 'error' : ''" :help="errors.gender">
          <Field name="gender" v-slot="{ field }">
            <a-select v-bind="field" placeholder="Select gender">
              <a-select-option value="Male">Male</a-select-option>
              <a-select-option value="Female">Female</a-select-option>
              <a-select-option value="Other">Other</a-select-option>
            </a-select>
          </Field>
        </a-form-item>

        <!-- Age -->
        <a-form-item label="Age" :validate-status="errors.age ? 'error' : ''" :help="errors.age">
          <Field name="age" v-slot="{ field }">
            <a-input-number v-bind="field" :min="1" class="w-full" />
          </Field>
        </a-form-item>

        <!-- Image Upload -->

        <a-form-item label="Photo">
          <Field name="imageBase64" v-slot="{ field}">
            <input type="file" accept="image/*" @change="onImageChange" />
            <div v-if="values.imageBase64" class="mt-2">
              <img :src="values.imageBase64" class="w-20 h-20 object-cover rounded" />
            </div>
          </Field>
        </a-form-item>
      </div>

      <!-- Buttons -->
      <div class="flex justify-end gap-2 mt-4">
        <a-button @click="onCancel">Cancel</a-button>
        <a-button type="primary" @click="handleSubmit(onSubmit)">Submit</a-button>
      </div>
    </Form>
  </a-modal>
</template>

<script setup lang="ts">
import { Form, Field, useForm } from "vee-validate";
import * as yup from "yup";
import { watch, computed, nextTick } from "vue";
import type { Customer } from "./init";

const props = defineProps<{ open: boolean; customer?: Customer | null }>();
const emit = defineEmits<{ (e: "submit", value: Customer): void; (e: "close"): void }>();

// Validation schema
const schema = yup.object({
  name: yup.string().required("Name is required"),
  gender: yup.string().required("Gender is required"),
  age: yup.number().required("Age is required").min(1),
  imageBase64: yup.string().required("Image is required"),
});

// Vee-validate form
const { values, setFieldValue, resetForm } = useForm<Customer>({
  validationSchema: schema,
 initialValues: {
    id: "",          // include id in initialValues
    name: "",
    gender: "Other",
    age: 0,
    imageBase64: "",
  },
});

const isEdit = computed(() => !!props.customer);

// Prefill form for edit
watch(
  () => props.customer,
  async (cust) => {
    if (cust) {
       await nextTick(); 
      resetForm({
        values: {
          id: cust.id || "",
          name: cust.name || "",
          gender: cust.gender || "Other",
          age: cust.age || 0,
          imageBase64: cust.imageBase64 || "",
        },
      });
    } else {
      resetForm({
        values: { id: "", name: "", gender: "Other", age: 0, imageBase64: "" },
      });
    }
  },
  { immediate: true }
);

// Submit handler
const onSubmit = (formData: any) => {
  // ensure image is included
  if (!formData.imageBase64) formData.imageBase64 = values.imageBase64;
  emit("submit", { ...formData });
  emit("close");
};

// Cancel handler
const onCancel = () => emit("close");

// Image change handler
const onImageChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    setFieldValue("imageBase64", reader.result as string); // reactive update
  };
  reader.readAsDataURL(file);
};
</script>
