<template>
  <div class="h-full overflow-y-auto p-4 bg-gray-50">
    <a-select
      v-model:value="filterStatus"
      class="w-full mb-4"
      placeholder="Filter by Status"
      allowClear
    >
      <a-select-option v-for="status in statuses" :key="status" :value="status">
        {{ status }}
      </a-select-option>
    </a-select>

    <div class="grid gap-3">
      <OrderCard
        v-for="order in filteredOrders"
        :key="order.orderId"
        :order="order"
        @click="selectOrder(order)"
        class="cursor-pointer hover:shadow-lg transition"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";


import OrderCard from "./OrderCard.vue";
import type { Order } from "./order";
import { sampleOrders } from "./orderData";

const emit = defineEmits<{ (e: "select", order: Order): void }>();

const filterStatus = ref<string | null>(null);
const statuses = ["CREATED", "STOCK_VERIFIED", "APPROVED", "SHIPPED", "COMPLETED", "CANCELLED"];

const filteredOrders = computed(() =>
  filterStatus.value
    ? sampleOrders.filter((o) => o.status === filterStatus.value)
    : sampleOrders
);

const selectOrder = (order: Order) => emit("select", order);
</script>
