<script setup lang="ts">

import type { OrderResponse } from '@/components/pages/quotation/quotation';
import { defineProps } from 'vue';

const props = defineProps<{
  order: OrderResponse
}>();
console.log("order details:", props.order);
</script>

<template>
  <div>
    <p><strong>Customer:</strong> {{ props.order.customerId }}</p>
    <p><strong>Order Date:</strong> {{ props.order.orderDate }}</p>
    <p><strong>Payment Method:</strong> {{ props.order.paymentMethod }}</p>
    <p><strong>Note:</strong> {{ props.order.note || '-' }}</p>

    <a-table
      :data-source="props.order.products"
      :pagination="false"
      row-key="productId"
      bordered
    >
      <a-table-column title="Product" key="productName" :customRender="({record}:{record:any}) => record?.productName" />

      <a-table-column title="Units" key="units">
        <template #default="{ record }">
          <a-table
            :data-source="record.units"
            :pagination="false"
            size="small"
            row-key="unitId"
            bordered
          >
            <a-table-column title="Unit" key="unitName" :customRender="({record}:{record:any})=> record?.unitName" />
            <a-table-column title="Quantity" key="quantity" :customRender="({record}:{record:any}) => record?.quantity" />
            <a-table-column title="Price" key="unitPrice" :customRender="({record}:{record:any}) => `$${record?.unitPrice?.toFixed(2)}`" />
            <a-table-column title="Subtotal" key="subtotal" :customRender="({record}:{record:any})=> `$${record?.subtotal?.toFixed(2)}`" />
            <a-table-column title="Base Unit Qty" key="baseUnitQuantity" :customRender="({record}:{record:any}) => record?.baseUnitQuantity" />
          </a-table>
        </template>
      </a-table-column>

      <a-table-column title="Product Subtotal" key="subtotal" :customRender="({record}:{record:any})=> `$${record.subtotal?.toFixed(2)}`" />
    </a-table>

    <div class="mt-4 text-right font-bold text-lg">
      Total Amount: ${{ props.order.totalAmount?.toFixed(2) }}
    </div>
  </div>
</template>
