<template>
  <div class="p-4">
    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold">Quotation List</h2>
      <a-button type="primary" @click="goToCreate">+ Create Quotation</a-button>
    </div>

    <!-- Table -->
    <a-table :dataSource="quotations" :columns="columns" rowKey="id" bordered>
      <template #bodyCell="{ column, record }">
        <!-- Status Column -->
        <template v-if="column.key === 'status'">
          <a-tag :color="statusColor(record.status)">{{ record.status }}</a-tag>
        </template>

        <!-- Actions Column -->
        <template v-else-if="column.key === 'actions'">
          <a-space>
            <a-button size="small" @click="viewDetail(record.id)">View</a-button>
            <a-button size="small" @click="editQuotation(record.id)">Edit</a-button>
            <a-button size="small" type="primary" @click="approve(record.id)" :disabled="record.status==='APPROVE'">Approve</a-button>
            <a-button size="small" danger @click="drop(record.id)" :disabled="record.status==='DROP'">Drop</a-button>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Quotation } from "./type";
import { useRouter } from "vue-router";

const router = useRouter();

// Mock data (replace with API call)
const quotations = ref<Quotation[]>([
  {
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
    products: [],
    totalAmount: 1200,
    createdAt: "2025-08-29",
  },
  {
    id: "Q2",
    quoteNo: "QT-0002",
    customer: {
      id: "C2",
      name: "XYZ Ltd",
      email: "xyz@mail.com",
      phone: "987654",
      address: "Siem Reap",
    },
    status: "APPROVE",
    products: [],
    totalAmount: 850,
    createdAt: "2025-08-20",
  },
]);

const columns = [
  { title: "Quote No", dataIndex: "quoteNo", key: "quoteNo" },
  { title: "Customer", dataIndex: ["customer", "name"], key: "customer" },
  { title: "Status", key: "status" },
  { title: "Total Amount", dataIndex: "totalAmount", key: "totalAmount" },
  { title: "Created At", dataIndex: "createdAt", key: "createdAt" },
  { title: "Actions", key: "actions" },
];

const statusColor = (status: string) => {
  switch (status) {
    case "APPROVE": return "green";
    case "DROP": return "red";
    default: return "blue";
  }
};

const goToCreate = () => router.push("/quotations/create");
const viewDetail = (id: string) => router.push(`/quotations/${id}`);
const editQuotation = (id: string) => router.push(`/quotations/${id}/edit`);

const approve = (id: string) => {
  const q = quotations.value.find(q => q.id === id);
  if (q) q.status = "APPROVE";
};
const drop = (id: string) => {
  const q = quotations.value.find(q => q.id === id);
  if (q) q.status = "DROP";
};
</script>
