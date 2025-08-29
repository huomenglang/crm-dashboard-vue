<template>
  <apexchart
    type="line"
    :options="options"
    :series="series"
    height="350"
    class="bg-white rounded-2xl shadow-md p-4"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import VueApexCharts from "vue3-apexcharts"

defineOptions({ name: "BaseChart" })

interface ChartProps {
  type: "line" | "area" | "bar"
  options?: any
  series: any[]
}

const props = defineProps<ChartProps>()

const options = computed(() => ({
  chart: {
    type: props.type,
    toolbar: { show: false },
    zoom: { enabled: false },
  },
  dataLabels: { enabled: false },
  stroke: { curve: "smooth" },
  xaxis: props.options?.xaxis || { categories: [] },
  ...props.options,
}))
</script>

<script lang="ts">
export default {
  components: {
    apexchart: VueApexCharts,
  },
}
</script>
