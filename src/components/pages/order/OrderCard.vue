<template>
  <a-card
    :title="order.orderNo"
    size="small"
    class="rounded-xl border shadow-sm"
  >
    <div class="text-sm font-medium">{{ order.customerName }}</div>
    <div class="text-xs text-gray-500">Status: {{ order.status }}</div>
    <div class="text-xs text-gray-600 mt-1">Total: ${{ order.totalAmount }}</div>
  </a-card>
</template>

<script setup lang="ts">
import type { Order } from './order';

defineProps<{ order: Order }>();
</script>
