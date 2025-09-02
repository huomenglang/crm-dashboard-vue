<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
    <a-card
      v-for="item in props.stats"
      :key="item.key"
      class="rounded-2xl shadow-md bg-white p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div class="flex justify-between items-start">
        <div>
          <p class="text-gray-500 text-sm font-medium mb-1">{{ item.title }}</p>
          <p class="text-2xl font-bold text-gray-800">{{ formattedValue(item) }}</p>
          <div v-if="item.trend !== undefined" class="flex items-center mt-2">
            <span
              class="text-xs font-medium flex items-center"
              :class="trendColor(item.trend)"
            >
              <component 
                :is="item.trend >= 0 ? CaretUpOutlined : CaretDownOutlined" 
                class="w-3 h-3 mr-1" 
              />
              {{ Math.abs(item.trend) }}%
            </span>
            <span class="text-[11px] text-gray-500 ml-1">{{ item.period || 'vs last period' }}</span>
          </div>
        </div>
        <div
          class="w-10 h-10 flex items-center justify-center rounded-full text-white"
          :class="item.bg"
        >
          <component :is="item.icon" class="text-xl"/>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons-vue"

export interface StatItem {
  key: string
  title: string
  value: string | number
  bg: string
  icon: any
  trend?: number // Percentage change (positive or negative)
  period?: string // Time period for comparison
  format?: 'currency' | 'number' | 'percent'
  currency?: string
}

const props = defineProps<{ stats: StatItem[] }>()

const formattedValue = (item: StatItem) => {
  if (item.format === 'currency') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: item.currency || 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(Number(item.value))
  }
  
  if (item.format === 'percent') {
    return `${item.value}%`
  }
  
  // Format numbers with commas
  if (typeof item.value === 'number') {
    return new Intl.NumberFormat('en-US').format(item.value)
  }
  
  return item.value
}

const trendColor = (trend: number) => {
  return trend >= 0 ? 'text-green-600' : 'text-red-600'
}
</script>