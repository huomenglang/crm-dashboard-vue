<template>
  <a-table
    :columns="columns"
    :data-source="products"
    :pagination="false"
    row-key="productId"
    bordered
    size="middle"
    class="shadow-sm rounded-lg"
    :expandable="expandableConfig"
  >
    <template #bodyCell="{ column, record }">
      <span v-if="column.key === 'units'">
        <div v-for="unit in record.units" :key="unit.unitId" class="flex justify-between gap-2">
          <span>{{ unit.unitName }} x {{ unit.quantity }}</span>
          <span>${{ (unit.price * unit.quantity).toFixed(2) }}</span>
        </div>
      </span>
      <span v-else-if="column.key === 'subtotal'">${{ record.subtotal.toFixed(2) }}</span>
      <span v-else-if="column.key === 'discount'">{{ record.discount || 0 }}%</span>
      <span v-else-if="column.key === 'tax'">{{ record.tax || 0 }}%</span>
      <span v-else-if="column.key === 'action'">
        <div class="flex gap-2">
          <a-button
            v-if="canRemove(record)"
            type="primary"
            danger
            size="small"
            @click="$emit('remove-product', record)"
          >
            Remove
          </a-button>
          <a-button
            v-if="canVerify(record)"
            type="primary"
            size="small"
            @click="$emit('verify-product', record)"
          >
            Verify
          </a-button>
        </div>
      </span>
      <span v-else>{{ record[column.dataIndex] }}</span>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import type { OrderProduct } from "./order";

const props = defineProps<{
  products: OrderProduct[];
  orderStatus?: string;
}>();

const canRemove = (product: OrderProduct) => {
  return props.orderStatus === "CREATED" || props.orderStatus === "STOCK_VERIFIED";
};

const canVerify = (product: OrderProduct) => {
  return props.orderStatus === "CREATED";
};

const columns = [
  { title: "Product", dataIndex: "productName", key: "productName" },
  { title: "SKU", dataIndex: "sku", key: "sku" },
  { title: "Units", key: "units" },
  { title: "Discount", key: "discount" },
  { title: "Tax", key: "tax" },
  { title: "Subtotal", key: "subtotal" },
  { title: "Action", key: "action" },
];

const expandableConfig = {
  expandedRowRender: (record: OrderProduct) => {
    return record.units.map(u => `${u.unitName} x ${u.quantity} - $${(u.price*u.quantity).toFixed(2)}`).join(', ')
  }
};
</script>
