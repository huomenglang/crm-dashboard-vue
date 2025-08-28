<template>
  <div class="flex w-full h-screen gap-4 p-4">
    <!-- Order List -->
    <div class="w-1/3 border-r pr-4 overflow-y-auto">
      <OrderList
        :orders="orders"
        :selectedOrderId="selectedOrder?.orderId"
        :statusFilter="statusFilter"
        @filter-change="statusFilter = $event"
        @select-order="handleSelectOrder"
      />
    </div>

    <!-- Order Details -->
    <div class="w-2/3 pl-4">
      <OrderDetails
        v-if="selectedOrder"
        :order="selectedOrder"
        @update-status="handleUpdateStatus"
        @remove-product="handleRemoveProduct"
      />
      <div v-else class="text-gray-400 flex items-center justify-center h-full">
        Select an order to view details
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import OrderList from "./OrderList.vue";
import OrderDetails from "./OrderDetails.vue";

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

const statusFilter = ref<"ALL" | "PENDING" | "APPROVED" | "COMPLETED">("ALL");

const orders = ref<Order[]>([
  {
    orderId: "1",
    orderNo: "ORD-001",
    customerName: "John Doe",
    status: "PENDING",
    totalAmount: 250,
    products: [
      {
        productId: "p1",
        productName: "Coca Cola",
        subtotal: 100,
        units: [{ unitId: "u1", unitName: "Box", quantity: 2, unitPrice: 50, subtotal: 100 }]
      },
      {
        productId: "p2",
        productName: "Pepsi",
        subtotal: 150,
        units: [{ unitId: "u2", unitName: "Case", quantity: 3, unitPrice: 50, subtotal: 150 }]
      }
    ]
  },
  {
    orderId: "2",
    orderNo: "ORD-002",
    customerName: "Jane Smith",
    status: "APPROVED",
    totalAmount: 500,
    approvedBy: "Admin A",
    products: [
      {
        productId: "p3",
        productName: "Sprite",
        subtotal: 500,
        units: [{ unitId: "u3", unitName: "Bottle", quantity: 50, unitPrice: 10, subtotal: 500 }]
      }
    ]
  }
]);

const selectedOrderId = ref<string | null>(null);

const selectedOrder = computed(() =>
  orders.value.find((o) => o.orderId === selectedOrderId.value) || null
);

function handleSelectOrder(orderId: string) {
  selectedOrderId.value = orderId;
}

function handleUpdateStatus(orderId: string, newStatus: Order["status"]) {
  const order = orders.value.find((o) => o.orderId === orderId);
  if (order) order.status = newStatus;
}

function handleRemoveProduct(orderId: string, productId: string) {
  const order = orders.value.find((o) => o.orderId === orderId);
  if (order) {
    order.products = order.products.filter((p) => p.productId !== productId);
    order.totalAmount = order.products.reduce((sum, p) => sum + p.subtotal, 0);
  }
}
</script>
