<template>
  <div>
    <a-select
      :options="options"
      show-search
      placeholder="Select Saler"
      :filter-option="filterOption"
      @select="(selected:any) => {
                console.log('selected Saler:', selected);
                emit('select', selected);
              }"
    
      style="width: 200px"
      allow-clear
      label-in-value
    />
  </div>
</template>

<script setup lang="ts">
import { KEY } from "@/data/Key";
import { getAll } from "@/data/ls_data";
import type { SelectProps } from "ant-design-vue";
import { ref } from "vue";

const emit = defineEmits(["select", "select"])
const options = ref<SelectProps['options']>(getAll(KEY.CUSTOMER)).value?.map(unit => ({
  value: unit.id,
  label: unit.name,
  id: unit.id,
}));
const filterOption = (input: string, option: any) => {
  const label = option?.label?.toString().toLowerCase() || "";
  const value = option?.value?.toString().toLowerCase() || "";
  return (
    label.includes(input.toLowerCase()) || value.includes(input.toLowerCase())
  );
};
</script>



<style scoped></style>
