<template>
  <div class="flex h-screen">
    <div class="w-1/3 border-r">
      <OrderList @select="selectOrder" />
    </div>
    <div class="flex-1">
      <OrderDetails :order="selectedOrder" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { type Order } from "./order";
import OrderList from "./OrderList.vue";
import OrderDetails from "./OrderDetails.vue";

const selectedOrder = ref<Order | null>(null);
const selectOrder = (order: Order) => (selectedOrder.value = order);
</script>
