<template>
  <div class="p-6 max-w-4xl mx-auto">
    <a-card :title="`Quotation #${quotation.quoteNo}`">
      <!-- Customer Info -->
      <div class="mb-4">
        <h3 class="font-semibold">Customer</h3>
        <p><b>Name:</b> {{ quotation.customer.name }}</p>
        <p><b>Email:</b> {{ quotation.customer.email }}</p>
        <p><b>Phone:</b> {{ quotation.customer.phone }}</p>
        <p><b>Address:</b> {{ quotation.customer.address }}</p>
      </div>

      <!-- Products -->
      <a-table
        :dataSource="quotation.products"
        :pagination="false"
        rowKey="product.productId"
        bordered
      >
        <a-table-column title="Product" :dataIndex="['product','name']" />
        <a-table-column title="Units" :customRender="renderUnits" />
        <a-table-column title="Discount" dataIndex="discount" />
        <a-table-column title="Subtotal" dataIndex="subtotal" />
      </a-table>

      <!-- Summary -->
      <div class="mt-4">
        <p><b>Discount:</b> {{ quotation.discount ?? 0 }}</p>
        <p><b>Tax:</b> {{ quotation.tax ?? 0 }}</p>
        <p class="text-lg font-bold"><b>Total:</b> {{ quotation.totalAmount }}</p>
      </div>

      <!-- Status -->
      <div class="mt-4">
        <p>
          <b>Status:</b>
          <a-tag :color="statusColor(quotation.status)">{{ quotation.status }}</a-tag>
        </p>
      </div>

      <!-- Actions -->
      <a-space class="mt-4">
        <a-button type="primary" @click="approve" :disabled="quotation.status==='APPROVE'">Approve</a-button>
        <a-button danger @click="drop" :disabled="quotation.status==='DROP'">Drop</a-button>
      </a-space>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Quotation } from "./type";

// Mock sample quotation
const quotation = ref<Quotation>({
  id: "Q1",
  quoteNo: "QT-0001",
  customer: {
    id: "C1",
    name: "ABC Corp",
    email: "abc@mail.com",
    phone: "123456",
    address: "Phnom Penh",
  },
  status: "PENDING",
  products: [
    {
      product: { id: "P1", sku: "SKU-001", name: "Laptop" },
      units: [
        { unitId: "U1", unitName: "Box", quantity: 2, price: 500, baseUnitId: "EA", baseUnitQuantity: 1, subtotal: 1000 },
        { unitId: "U2", unitName: "Piece", quantity: 1, price: 520, baseUnitId: "EA", baseUnitQuantity: 1, subtotal: 520 },
      ],
      subtotal: 1520,
    },
  ],
  totalAmount: 1520,
  discount: 20,
  tax: 30,
});

const statusColor = (status: string) => {
  switch (status) {
    case "APPROVE": return "green";
    case "DROP": return "red";
    default: return "blue";
  }
};

const renderUnits = ({ record }: any) => {
  return record.units.map(
    (u: any) => `${u.quantity} x ${u.unitName} @ ${u.price} = ${u.subtotal}`
  ).join(", ");
};

const approve = () => (quotation.value.status = "APPROVE");
const drop = () => (quotation.value.status = "DROP");
</script>
