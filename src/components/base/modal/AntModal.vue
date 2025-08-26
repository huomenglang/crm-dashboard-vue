<script setup lang="ts">
import { Modal } from "ant-design-vue";
import type { ModalProps } from "ant-design-vue";
import { defineProps, defineEmits } from "vue";

// ✅ Extend Ant Design Vue Modal props
interface BaseModalProps extends ModalProps {
  width?: string | number;
  tailwindClass?: string; // extra Tailwind classes
  isFooter?: boolean;
}

// ✅ Props
const props = withDefaults(defineProps<BaseModalProps>(), {
  tailwindClass: "rounded-2xl shadow-lg", // default
  centered: true,
  isFooter: true,
});

// ✅ Events (expose close/ok/cancel)
const emit = defineEmits<{
  (e: "ok"): void;
  (e: "cancel"): void;
  (e: "update:open", value: boolean): void;
}>();

// ✅ Handlers
const handleSave = () => emit("ok");
const handleCancel = () => {
  emit("cancel");
  emit("update:open", false);
};
</script>

<template>
  <Modal

    v-bind="props"
    class="!p-0"
    :class="tailwindClass"
    :open="props.open"
    @ok="handleSave"
    @cancel="handleCancel"
    @update:open="val => emit('update:open', val)"
  >
    <!-- Default slot for content -->
    <slot />

    <template v-if="props.isFooter">
      <slot name="footer" />
    </template>
    <!-- Footer slot -->
  
  </Modal>
</template>

<style scoped>
/* Optional: override default Ant styles if needed */
</style>
