<script setup lang="ts">
import { Modal, Form, Input } from "ant-design-vue"
import { Form as VForm, Field } from "vee-validate"
import * as yup from "yup"
import type { CategoryProps } from "./category"
import RoundButton from "@/components/base/button/RoundButton.vue"
import Upload from "@/components/base/upload/Upload.vue"

const props = defineProps<{
  open: boolean
  isEditing: boolean
  initialValues?: Partial<CategoryProps>
}>()

const emit = defineEmits<{
  (e: "close"): void
  (e: "submit", values:any): void
}>()

// ✅ Validation schema
const schema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  image: yup.string().nullable()
})

</script>

<template>
  <Modal
    :open="props.open"
    :title="isEditing ? 'Edit Category' : 'Create Category'"
    :footer="null"
    destroyOnClose
    @cancel="emit('close')"
  >
    <VForm
      :initial-values="initialValues || {}"
      :validation-schema="schema"
      @submit="values => emit('submit', values)"
    >
      <Form.Item label="Name" name="name" >
        <Field name="name" v-slot="{ field, errorMessage }">
          <Input v-bind="field" placeholder="Enter name" />
          <div v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</div>
        </Field>
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Field name="description" v-slot="{ field, errorMessage }">
          <Input v-bind="field" placeholder="Enter description" />
          <div v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</div>
        </Field>
      </Form.Item>

      <Form.Item label="Image" name="image">
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
              {{
                isEditing?"Update":"Create"
              }}
            </round-button>
          </div>
    </VForm>
  </Modal>
</template>
