<script setup lang="ts">
import { Button } from "ant-design-vue";
import type { ButtonProps as AntButtonProps } from "ant-design-vue";
import { computed } from "vue";

// 🔹 Use Ant Design's SizeType instead of custom type
type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'warning';

// 🔹 Extend Ant Button props with your own
interface CustomButtonProps extends Omit<AntButtonProps, 'type' | 'danger'> {
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  block?: boolean;
  ghost?: boolean;
}

// 🔹 Define props with defaults
const props = withDefaults(defineProps<CustomButtonProps>(), {
  variant: 'primary',
  loading: false,
  disabled: false,
  block: false,
  ghost: false
});

// 🔹 Emit all events that Ant Button supports
const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
  (e: "mouseenter", event: MouseEvent): void;
  (e: "mouseleave", event: MouseEvent): void;
}>();

// 🔹 Map our size classes to Ant Design's size system
const sizeClasses = computed(() => {
  const sizeMap = {
    small: '!py-1 !px-3 !text-sm',
    medium: '!py-2 !px-4 !text-base',
    large: '!py-3 !px-6 !text-lg'
  };
  
  // Use the size from props if provided, otherwise default to medium
  const size = props.size || 'medium';
  return sizeMap[size as keyof typeof sizeMap] || sizeMap.medium;
});

// 🔹 Computed classes based on props
const buttonClasses = computed(() => {
  const baseClasses = [
    '!border-none !rounded-[6px] !font-[500]',
    'hover:!scale-105 !transition !duration-100 !ease-in-out !shadow-xl',
    'focus:!outline-none focus:!ring-2 focus:!ring-offset-2',
    'disabled:!opacity-50 disabled:!cursor-not-allowed'
  ];

  // Variant classes
  const variantClasses = {
    primary: '!bg-[#1597BB] !text-white hover:!bg-[#12829f] focus:!ring-[#1597BB]',
    secondary: '!bg-[#c5ebf1] !text-[#00a8b4] hover:!bg-[#b3e2e8] focus:!ring-[#00a8b4]',
    danger: '!bg-[#E94560] !text-white hover:!bg-[#d63a54] focus:!ring-[#E94560]',
    success: '!bg-[#10b981] !text-white hover:!bg-[#0d9c6d] focus:!ring-[#10b981]',
    warning: '!bg-[#f59e0b] !text-white hover:!bg-[#d97706] focus:!ring-[#f59e0b]'
  };

  // Ghost variant (outlined style)
  const ghostClasses = props.ghost ? [
    '!bg-transparent !border-2',
    {
      primary: '!border-[#1597BB] !text-[#1597BB] hover:!bg-[#1597BB] hover:!text-white',
      secondary: '!border-[#00a8b4] !text-[#00a8b4] hover:!bg-[#00a8b4] hover:!text-white',
      danger: '!border-[#E94560] !text-[#E94560] hover:!bg-[#E94560] hover:!text-white',
      success: '!border-[#10b981] !text-[#10b981] hover:!bg-[#10b981] hover:!text-white',
      warning: '!border-[#f59e0b] !text-[#f59e0b] hover:!bg-[#f59e0b] hover:!text-white'
    }[props.variant]
  ] : [];

  return [
    ...baseClasses,
    sizeClasses.value,
    variantClasses[props.variant],
    ...ghostClasses,
    props.block ? '!w-full' : '',
    props.loading ? '!opacity-70 !cursor-not-allowed' : ''
  ].join(' ');
});

// 🔹 Handle click event
const handleClick = (event: MouseEvent) => {
  if (!props.loading && !props.disabled) {
    emit('click', event);
  }
};
</script>

<template>
  <Button
    :class="buttonClasses"
    :type="ghost ? 'default' : 'primary'"
    :loading="props.loading"
    :disabled="props.disabled"
    :block="props.block"
    :ghost="props.ghost"
    :size="props.size" 
    v-bind="$attrs"
    @click="handleClick"
    @mouseenter="emit('mouseenter', $event)"
    @mouseleave="emit('mouseleave', $event)"
  >
    <slot />
  </Button>
</template>

<style scoped>
.ant-btn::after {
  display: none !important;
}

/* Smooth transition for all states */
.ant-btn {
  transition: all 0.2s ease-in-out;
}

/* Focus states for accessibility */
.ant-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(21, 151, 187, 0.1);
}
</style>