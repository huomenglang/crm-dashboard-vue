<template>
  <a-card class="rounded-2xl shadow-md p-4 h-full">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-semibold text-gray-800">{{ title }}</h3>
      <div v-if="timeRangeOptions" class="flex items-center space-x-2">
        <a-select 
          v-model:value="selectedRange" 
          size="small" 
          class="w-28"
          :options="timeRangeOptions"
          @change="handleTimeRangeChange"
        />
      </div>
    </div>
    <apexchart
      :type="type"
      :options="chartOptions"
      :series="series"
      :height="height"
      
      
    />
  </a-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

defineOptions({ name: "BaseChart" })

interface ChartProps {
  type: "line" | "area" | "bar" | "pie" | "donut"
  series: any[]
  title?: string
  height?: number
  colors?: string[]
  xaxisCategories?: any[]
  timeRangeOptions?: { value: string; label: string }[]
  stacked?: boolean
  showDataLabels?: boolean
  curve?: "smooth" | "straight" | "stepline"
}

const props = withDefaults(defineProps<ChartProps>(), {
  height: 350,
  colors: () => ['#3B82F6', '#10B981', '#6366F1', '#8B5CF6', '#EC4899', '#F59E0B'],
  stacked: false,
  showDataLabels: false,
  curve: "smooth"
})

const emit = defineEmits(['timeRangeChange'])

const selectedRange = ref(props.timeRangeOptions?.[0]?.value || 'weekly')

const chartOptions = computed(() => {
  const baseOptions = {
    chart: {
      type: props.type,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false
        }
      },
      zoom: { enabled: false },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800
      }
    },
    colors: props.colors,
    dataLabels: { 
      enabled: props.showDataLabels,
      style: {
        fontSize: '12px',
        fontWeight: 'bold'
      }
    },
    stroke: { 
      curve: props.curve,
      width: props.type === 'line' || props.type === 'area' ? 3 : 0
    },
    fill: {
      type: props.type === 'area' ? 'gradient' : 'solid',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
      }
    },
    xaxis: {
      categories: props.xaxisCategories || [],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: '#6B7280',
          fontSize: '12px',
          fontWeight: 500
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#6B7280',
          fontSize: '12px',
          fontWeight: 500
        },
        formatter: (value: number) => {
          if (value >= 1000) {
            return `$${value / 1000}k`
          }
          return value
        }
      }
    },
    grid: {
      borderColor: '#E5E7EB',
      strokeDashArray: 4,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      fontSize: '14px',
      markers: {
        radius: 12
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5
      }
    },
    tooltip: {
      theme: 'light',
      x: {
        formatter: (val: any) => val
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        borderRadiusApplication: 'end',
        columnWidth: props.stacked ? '70%' : '50%'
      }
    }
  }

  return baseOptions
})

const handleTimeRangeChange = (value: string) => {
  emit('timeRangeChange', value)
}
</script>

<script lang="ts">
export default {
  components: {
    apexchart: VueApexCharts,
  },
}
</script>