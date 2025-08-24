<script setup lang="ts">
import { Button } from "ant-design-vue";
import type { ButtonProps as AntButtonProps } from "ant-design-vue";

// 🔹 Extend Ant Button props with your own
interface CustomButtonProps extends AntButtonProps {
  isDanger?: boolean;
  secondary?:boolean
}

// 🔹 Define props with defaults
const props = withDefaults(defineProps<CustomButtonProps>(), {
  isDanger: false,
  secondary:false
});

// 🔹 Emit all events that Ant Button supports
const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();
</script>

<template>
  <Button
  class="!border-none !rounded-[6px] !font-[500] hover:!scale-105 !transition !duration-100 !ease-in-out !shadow-xl "
    v-bind="props"
    v-wave="false"
    :class="[{ 
      '!bg-[#1597BB] !text-white':props.isDanger===false&&props.secondary==false,
      '!bg-[#E94560] !text-white':props.isDanger===true&&props.secondary==false,
      '!bg-[#b6e7ee] !text-[#00a8b4]':props.isDanger===false&&props.secondary===true,
      '!bg-[#febcc2] !text-red-500':props.isDanger===true&&props.secondary===true
    }]"
    @click="emit('click', $event)"
  >
    <slot />
  </Button>
</template>
<style scoped>
.ant-btn::after {
  display: none !important;
}
</style>
