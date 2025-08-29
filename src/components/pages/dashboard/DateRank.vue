<template>
  <div>
    <a-select
      ref="select"
      style="width: 150px"
        placeholder="Select Date"
      :options="options1"
      @focus="focus"
      @change="handleChange"
    ></a-select>
  </div>
</template>

<script setup lang="ts">
import type { SelectProps } from "ant-design-vue";
import { ref } from "vue";


const focus = () => {
  console.log("focus");
};

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};
const options1 = ref<SelectProps["options"]>([
  {
    value: "TODAY",
    label: "Today",
  },
  {
    value: "THIS_WEEK",
    label: "This Week",
  },
  {
    value: "LAST_WEEK",
    label: "Last Week",
  },
  {
    value: "THIS_MONTH",
    label: "This Month",
  },
  {
    value: "LAST_MONTH",
    label: "Last Month",
  },
  {
    value: "LAST_YEAR",
    label: "Last Year",
  },
  {
    value: "THIS_YEAR",
    label: "This Year",
  },
]);
</script>

<style scoped></style>
