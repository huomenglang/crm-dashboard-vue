<template>
  <div>
    <a-select
      v-model:value="internalFilter"
      class="mb-4 w-full"
      @change="$emit('filter-change', internalFilter)"
    >
      <a-select-option value="ALL">All</a-select-option>
      <a-select-option value="PENDING">Pending</a-select-option>
      <a-select-option value="APPROVED">Approved</a-select-option>
      <a-select-option value="COMPLETED">Completed</a-select-option>
    </a-select>

    <div class="space-y-3">
      <a-card
        v-for="order in filteredOrders"
        :key="order.orderId"
        :class="['cursor-pointer transition', order.orderId === selectedOrderId ? 'border-blue-500 border-2' : '']"
        @click="$emit('select-order', order.orderId)"
      >
        <p class="font-bold">{{ order.orderNo }}</p>
        <p>{{ order.customerName }}</p>
        <p>Status: <a-tag :color="statusColor(order.status)">{{ order.status }}</a-tag></p>
        <p>Total: ${{ order.totalAmount }}</p>
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

interface Order {
  orderId: string;
  orderNo: string;
  customerName: string;
  status: "PENDING" | "APPROVED" | "COMPLETED";
  totalAmount: number;
}

const props = defineProps<{
  orders: Order[];
  selectedOrderId: string | any;
  statusFilter: "ALL" | "PENDING" | "APPROVED" | "COMPLETED";
}>();

const emit = defineEmits(["select-order", "filter-change"]);

const internalFilter = ref(props.statusFilter);

watch(
  () => props.statusFilter,
  (val) => (internalFilter.value = val)
);

const filteredOrders = computed(() =>
  props.statusFilter === "ALL"
    ? props.orders
    : props.orders.filter((o) => o.status === props.statusFilter)
);

function statusColor(status: string) {
  switch (status) {
    case "PENDING":
      return "orange";
    case "APPROVED":
      return "blue";
    case "COMPLETED":
      return "green";
    default:
      return "gray";
  }
}
</script>
