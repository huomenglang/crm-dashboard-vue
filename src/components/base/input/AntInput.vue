<template>
  <a-input
    ref="inputRef"
    v-bind="adaptedProps"
    :class="customClasses"
    :style="customStyles"
    @change="handleChange"
    @pressEnter="handlePressEnter"
    @input="handleInput"
    @blur="handleBlur"
    @focus="handleFocus"
  >
    <!-- Pass through slots -->
    <template v-for="(_, slot) in $slots" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </a-input>
</template>

<script lang="ts" setup>
import { ref, computed, type CSSProperties } from 'vue';
import type { InputProps } from 'ant-design-vue';
import type { InputRef } from 'ant-design-vue/es/vc-input/inputProps';
import type { FocusEventHandler,KeyboardEventHandler } from 'ant-design-vue/es/_util/EventInterface';

// Define props with TypeScript interface
interface CustomInputProps extends /* @vue-ignore */ Omit<InputProps, 'class' | 'style' | 'size'> {
  // Additional custom props
  customClass?: string;
  customStyle?: CSSProperties;
  // You can add more custom props here
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'small' | 'medium' | 'large'; // Your custom size values
}

// Define props with default values
const props = withDefaults(defineProps<CustomInputProps>(), {
  variant: 'default',
  size: 'medium',
  customClass: '',
  customStyle: () => ({})
});

// Define emits for events
const emit = defineEmits<{
  (e: 'update:value', value: string): void;
  (e: 'update:modelValue', value: string): void;
  (e: 'change', value: string, event: Event): void;
  (e: 'pressEnter', event: KeyboardEventHandler): void;
  (e: 'input', value: string, event: Event): void;
  (e: 'blur', event: FocusEventHandler): void;
  (e: 'focus', event: FocusEventHandler): void;
}>();

// Expose ref for parent component access
const inputRef = ref<InputRef>();

// Map custom size values to Ant Design's SizeType
const antdSize = computed(() => {
  const sizeMap = {
    small: 'small',
    medium: 'middle',
    large: 'large'
  } as const;

  return sizeMap[props.size];
});

// Adapt props for Ant Design component
const adaptedProps = computed(() => ({
  ...props,
  size: antdSize.value
}));

// Event handlers
const handleChange = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  emit('update:value', value);
  emit('update:modelValue', value);
  emit('change', value, event);
};

const handlePressEnter = (event: KeyboardEventHandler) => {
  emit('pressEnter', event);
};

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  emit('update:value', value);
  emit('update:modelValue', value);
  emit('input', value, event);
};

const handleBlur = (event: FocusEventHandler) => {
  emit('blur', event);
};

const handleFocus = (event: FocusEventHandler) => {
  emit('focus', event);
};

// Computed classes based on props
const customClasses = computed(() => {
  const baseClasses = [
    '!border-[1.5px] !border-gray-300 !text-gray-500 !rounded-[6px]',
    'focus:!ring-0',
    'hover:!border-gray-400',
    'focus:!border-gray-400 focus:!shadow-xl',
    'disabled:!bg-gray-100',
    'disabled:!text-gray-400',
    'disabled:!cursor-not-allowed'
  ];

  // Size classes for Tailwind (independent of Ant Design size)
  const sizeClasses = {
    small: 'py-1 px-2 text-sm',
    medium: 'py-2 px-3 text-base',
    large: 'py-3 px-4 text-lg'
  };

  // Variant classes
  const variantClasses = {
    default: 'border-gray-300 bg-white',
    filled: 'border-transparent bg-gray-100 hover:bg-gray-200',
    outlined: 'border-2 border-gray-300 bg-transparent'
  };

  return [
    ...baseClasses,
    sizeClasses[props.size],
    variantClasses[props.variant],
    props.customClass
  ].join(' ');
});

// Computed styles
const customStyles = computed(() => props.customStyle);

// Expose methods for parent component access
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  select: () => inputRef.value?.select(),
  input: inputRef
});
</script>

<style scoped>
/* Additional custom styles if needed */
:deep(.ant-input) {
  border-radius: 0.375rem; /* rounded-md */
}

:deep(.ant-input:focus) {
  box-shadow: none;
  outline: none;
}

:deep(.ant-input-affix-wrapper) {
  border-radius: 0.375rem;
}

:deep(.ant-input-affix-wrapper:focus),
:deep(.ant-input-affix-wrapper-focused) {
  box-shadow: none;
  border-color: #3b82f6; /* blue-500 */
}
</style>