<script setup lang="ts">

import type { Quotation } from "@/components/pages/quotation/quotation";
import { defineProps } from "vue";

const props = defineProps<{ quotation: Quotation }>();
</script>

<template>
  <div>
    <p><strong>Customer:</strong> {{ props.quotation.customerId || '-' }}</p>
    <p><strong>Date:</strong> {{ props.quotation.quotationDate }}</p>
    <p><strong>Payment Method:</strong> {{ props.quotation.paymentMethod }}</p>
    <p><strong>Note:</strong> {{ props.quotation.note || '-' }}</p>
    <p><strong>Status:</strong> {{ props.quotation.status }}</p>

    <a-table
      :data-source="props.quotation.products"
      :pagination="false"
      row-key="productId"
      bordered
    >
      <a-table-column title="Product" key="productName" :customRender="({ record }:{record:any}) => record.productName" />

      <a-table-column title="Units" key="units">
        <template #default="{ record }">
          <a-table
            :data-source="record.units"
            :pagination="false"
            size="small"
            row-key="unitId"
            bordered
          >
            <a-table-column title="Unit" key="unitName" :customRender="({ record }:{record:any}) => record.unitName" />
            <a-table-column title="Quantity" key="quantity" :customRender="({ record }:{record:any}) => record.quantity" />
            <a-table-column title="Price" key="unitPrice" :customRender="({ record }:{record:any}) => `$${record.unitPrice.toFixed(2)}`" />
            <a-table-column title="Subtotal" key="subtotal" :customRender="({ record }:{record:any}) => `$${record.subtotal.toFixed(2)}`" />
            <a-table-column title="Base Unit Qty" key="baseUnitQuantity" :customRender="({ record }:{record:any}) => record.baseUnitQuantity" />
          </a-table>
        </template>
      </a-table-column>

      <a-table-column title="Product Subtotal" key="subtotal" :customRender="({ record }:{record:any}) => `$${record.subtotal.toFixed(2)}`" />
    </a-table>

    <div class="mt-4 text-right font-bold text-lg">
      Total Amount: ${{ props.quotation.totalAmount.toFixed(2) }}
    </div>
  </div>
</template>
