<template>
  <a-card v-if="order">
    <h2 class="font-bold text-lg mb-2">{{ order.orderNo }}</h2>
    <p>Customer: {{ order.customerName }}</p>
    <p>Total: ${{ order.totalAmount }}</p>

    <a-steps :current="stepIndex" class="my-4">
      <a-step title="Pending" />
      <a-step title="Approved" />
      <a-step title="Completed" />
    </a-steps>

    <!-- Pending -->
    <div v-if="order.status === 'PENDING'">
      <a-table :data-source="order.products" :pagination="false" row-key="productId">
        <a-table-column title="Product" dataIndex="productName" key="productName" />
        <a-table-column title="Units" key="units" :customRender="renderUnits" />
        <a-table-column title="Subtotal" key="subtotal" :customRender="({ text }:{text:any}) => '$' + text" />
        <a-table-column
          title="Action"
          key="action"
          :customRender="(_:any, record:any) => 
            h('a-button', { type: 'link', danger: true, onClick: () => $emit('remove-product', order.orderId, record.productId) }, 'Remove')"
        />
      </a-table>
      <a-button type="primary" class="mt-4" @click="$emit('update-status', order.orderId, 'APPROVED')">
        Verify & Approve
      </a-button>
    </div>

    <!-- Approved -->
    <div v-else-if="order.status === 'APPROVED'">
      <p class="mb-2">Approved By: {{ order.approvedBy || 'Unknown' }}</p>
      <a-table :data-source="order.products" :pagination="false" row-key="productId">
        <a-table-column title="Product" dataIndex="productName" key="productName" />
        <a-table-column title="Units" key="units" :customRender="renderUnits" />
        <a-table-column title="Subtotal" key="subtotal" :customRender="({ text }: { text: any }) => '$' + text" />
      </a-table>
      <a-button type="primary" class="mt-4" @click="$emit('update-status', order.orderId, 'COMPLETED')">
        Mark as Completed
      </a-button>
    </div>

    <!-- Completed -->
    <div v-else>
      <p class="mb-1">Approved By: {{ order.approvedBy }}</p>
      <p class="mb-1">Completed By: {{ order.completedBy || 'System' }}</p>
      <a-table :data-source="order.products" :pagination="false" row-key="productId">
        <a-table-column title="Product" dataIndex="productName" key="productName" />
        <a-table-column title="Units" key="units" :customRender="renderUnits" />
        <a-table-column title="Subtotal" key="subtotal" :customRender="({ text }: { text: any }) => '$' + text" />
      </a-table>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import { h, computed } from "vue";

interface OrderUnit {
  unitId: string;
  unitName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

interface OrderProduct {
  productId: string;
  productName: string;
  units: OrderUnit[];
  subtotal: number;
}

interface Order {
  orderId: string;
  orderNo: string;
  customerName: string;
  status: "PENDING" | "APPROVED" | "COMPLETED";
  totalAmount: number;
  products: OrderProduct[];
  approvedBy?: string;
  completedBy?: string;
}

const props = defineProps<{ order: Order }>();
const emit = defineEmits(["update-status", "remove-product"]);

const stepIndex = computed(() => {
  switch (props.order.status) {
    case "PENDING": return 0;
    case "APPROVED": return 1;
    case "COMPLETED": return 2;
  }
});

function renderUnits({ record }: { record: OrderProduct }) {
  return record.units.map(u => `${u.quantity}x ${u.unitName}`).join(", ");
}
</script>
