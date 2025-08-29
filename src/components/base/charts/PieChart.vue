<template>
  <apexchart
    type="pie"
    :options="mergedOptions"
    :series="series"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { computed } from "vue"
import VueApexCharts from "vue3-apexcharts"

const apexchart = VueApexCharts

// Props extend ApexCharts attributes
interface Props {
  series: number[]
  labels?: string[]
  options?: Record<string, any>
}

const props = defineProps<Props>()

// Default pie chart options
const defaultOptions = {
  chart: {
    type: "pie",
  },
  legend: {
    position: "bottom",
  },
  tooltip: {
    y: {
      formatter: (val: number) => `${val}%`,
    },
  },
  dataLabels: {
    formatter: (val: number) => `${val.toFixed(0)}%`,
  },
}

// Merge default options with user options
const mergedOptions = computed(() => {
  return {
    ...defaultOptions,
    ...props.options,
    labels: props.labels ?? props.options?.labels ?? [],
  }
})
</script>
