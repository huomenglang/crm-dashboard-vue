<template>
  <div class="h-full p-4 bg-white shadow-inner overflow-y-auto">
    <div v-if="order">
      <h2 class="text-lg font-bold mb-2">{{ order.orderNo }}</h2>
      <p class="text-sm text-gray-600">Customer: {{ order.customerName }}</p>
      <p class="text-sm text-gray-600 mb-4">Created: {{ order.createdAt }}</p>

      <!-- Order Steps -->
      <OrderStep :order="order" />

      <!-- Product Table -->
      <ProductTable
        :products="order.products"
        :order-status="order.status"
        @remove-product="handleRemoveProduct"
        @verify-product="handleVerifyProduct"
      />

      <!-- Summary -->
      <div class="mt-4 border-t pt-3 text-sm space-y-1">
        <div>Discount: {{ order.discount || 0 }}%</div>
        <div>Tax: {{ order.tax || 0 }}%</div>
        <div class="font-bold">Total: ${{ order.totalAmount.toFixed(2) }}</div>
        <div v-if="order.approvedBy">Approved by: {{ order.approvedBy }}</div>
        <div v-if="order.shippedBy">Shipped by: {{ order.shippedBy }}</div>
        <div v-if="order.completedBy">Completed by: {{ order.completedBy }}</div>
        <div v-if="order.cancelledBy">Cancelled by: {{ order.cancelledBy }}</div>
      </div>
    </div>
    <div v-else class="flex items-center justify-center h-full text-gray-400">
      Select an order to view details
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import type { Order, OrderProduct } from "./order";
import ProductTable from "./ProductTable.vue";
import OrderStep from "./OrderStep.vue";

const props = defineProps<{ order: Order | null }>();

const handleRemoveProduct = (product: OrderProduct) => {
  console.log("Remove product:", product.productName);
  // Implement remove logic here
};

const handleVerifyProduct = (product: OrderProduct) => {
  console.log("Verify product:", product.productName);
  // Implement verify logic here
};
</script>
