<template>
  <div class="px-5 py-4">
    <div class="mb-2 flex items-center">
      <h2 class="flex-1 text-2xl font-bold">Dashboard Overview</h2>
      <div class="flex-1">
        <div class="flex gap-x-3">
          <div>
            <SaleByDashboard />
          </div>
          <div>
            <DateRank />
          </div>
          <div>
            <DateRankPicker v-model="selectedDates" @change="handleChange" />
          </div>
        </div>
      </div>
      <div class="space-y-6"></div>
    </div>

    <div class="space-y-6 py-4 min-h-screen">
      <!-- Statistic Cards -->
      <StatisticCard :stats="statsData" />

      <!-- Charts -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart
          type="bar"
          :series="orderSeries"
          :xaxis-categories="barCategories"
          title="Orders"
          :colors="['#3B82F6', '#10B981']"
          :time-range-options="timeRangeOptions"
          @time-range-change="handleTimeRangeChange"
        />
        <Chart
          type="area"
          :series="revenueSeries"
          :xaxis-categories="lineCategories"
          title="Revenue"
          :colors="['#8B5CF6', '#EC4899']"
          :time-range-options="timeRangeOptions"
          @time-range-change="handleTimeRangeChange"
        />
      </div>

      <!-- Additional Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart
          type="area"
          :series="orderStatusSeries"
          :xaxis-categories="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']"
          title="Order Status"
          :colors="['#F59E0B', '#FE3344', '#0FB981', '#344ffe']"
          :height="300"
        />
        <Chart
          type="line"
          :series="qutationSeries"
          :xaxis-categories="['Mon', 'Tue', 'Web', 'Thu', 'Fri', 'Sat', 'Sun']"
          title="Quotaions"
          :colors="['#F59E0B', '#46C290', '#FE3344']"
          :height="300"
          show-data-labels
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Chart from "@/components/base/charts/Chart.vue";
import StatisticCard from "@/components/base/charts/StatisticCard.vue";
import DateRank from "@/components/pages/dashboard/DateRank.vue";
import DateRankPicker from "@/components/pages/dashboard/DateRankPicker.vue";
import SaleByDashboard from "@/components/pages/dashboard/SaleByDashboard.vue";
import {
  dayOfWeek,
  months,
  orderSerialYearly,
  orderSeriesDaily,
  orderSeriesWeekly,
  orderStatusSeriesData,
  quotationSeriesData,
  revenueSeriesDaily,
  revenueSeriesMonthly,
  revenueSeriesWeekly,
  statsData,
  timeRangeOptions,
  workingHours,
} from "@/data/mock_data";
import type { Dayjs } from "dayjs";
import { computed, ref } from "vue";

const selectedDates = ref<[Dayjs, Dayjs] | null>(null);

const handleChange = (dates: [Dayjs, Dayjs] | null) => {
  console.log(
    "Formatted:",
    dates
      ? [dates[0].format("YYYY-MM-DD"), dates[1].format("YYYY-MM-DD")]
      : null
  );
};

const selectedTimeRange = ref("weekly");

const barCategories = computed(() => {
  if (selectedTimeRange.value === "daily") return workingHours;
  else if (selectedTimeRange.value === "weekly") return dayOfWeek;
  else return months;
});

const lineCategories = computed(() => {
  if (selectedTimeRange.value === "daily") {
    return workingHours;
  } else if (selectedTimeRange.value === "weekly") {
    return dayOfWeek;
  } else {
    return months;
  }
});

const orderSeries = computed(() => {
  if (selectedTimeRange.value === "daily") {
    return orderSeriesDaily;
  } else if (selectedTimeRange.value === "weekly") {
    return orderSeriesWeekly;
  } else {
    return orderSerialYearly;
  }
});

const revenueSeries = computed(() => {
  if (selectedTimeRange.value === "daily") return revenueSeriesDaily;
  else if (selectedTimeRange.value === "weekly") return revenueSeriesWeekly;
  else return revenueSeriesMonthly;
});

const orderStatusSeries = ref(orderStatusSeriesData);

const qutationSeries = ref(quotationSeriesData);

const handleTimeRangeChange = (range: string) => {
  selectedTimeRange.value = range;
};
</script>
