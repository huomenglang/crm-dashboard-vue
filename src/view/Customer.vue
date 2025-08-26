<template>
  <div class="px-6">
    <TableAnt
      :columns="columns"
      :data="dataTable"
      :pagination="{ pageSize: pageSize, showSizeChanger: true }"
      :loading="loading"
      :row-key="record => record.id"
      :scroll="{ x: 1200, y: 600 }"
      size="small"
      search-placeholder="Search..."
      :search-value="searchTerm"
      @update:search-value="searchTerm = $event"
      @search="handleSearch"
      @create="handleCreate"
      @edit="handleEdit"
      @delete="handleDelete"
      @filter="handleFilter"
    />

    <ant-modal
      :footer="null"
      :title="modalTitle"
      v-model:open="showModal"
      width="800px"
      @cancel="handleModalCancel"
    >
      <CustomerForm 
        @submit="handleSave"
        @cancel="handleCancel"
        :customer="customer"
        :is-edit-mode="mode === 'edit'"
      />
    </ant-modal>
  </div>
</template>

<script lang="ts" setup>
import type { TableColumnsType } from "ant-design-vue";
import TableAnt from "@/components/base/table/TableAnt.vue";
import { computed, ref, watch } from "vue"
import CustomerForm from "@/components/pages/customer/CustomerForm.vue";
import AntModal from "@/components/base/modal/AntModal.vue";
import { type Customer, getAll, createOne, updateOne, deleteOne } from "@/components/pages/customer/customer";

// Modal state
const showModal = ref(false);
const customer = ref<Customer | null>(null);
const mode = ref<"create" | "edit">("create");
const modalTitle = computed(() => mode.value === "create" ? "Create Customer" : "Edit Customer");

// Table data
const loading = ref(false);
const searchTerm = ref('');
const page = ref(1);
const pageSize = ref(6);
const list = ref<Customer[]>(getAll());

// Watch for changes in localStorage and update the list
watch(showModal, (newVal) => {
  if (!newVal) {
    // Refresh the list when modal closes
    list.value = getAll('customer');
  }
});

// Event handlers
const handleCreate = () => {
  showModal.value = true;
  mode.value = "create";
  customer.value = null;
};

const handleEdit = (record: Customer) => {
  showModal.value = true;
  mode.value = "edit";
  console.log("Editing customer:", {...record});
  customer.value = { ...record };
  
};

const handleDelete = (record: Customer) => {
  deleteOne(record.id);
  list.value = getAll('customer'); // Refresh the list
};

const handleSearch = (value: string) => {
  searchTerm.value = value;
};

const handleFilter = () => {
  console.log('Open filter');
};

const handleSave = (customerData: Customer, isEdit: boolean) => {
  if (isEdit && customer.value) {
    // Update existing customer
    updateOne(customer.value.id, customerData,'customer');
  } else {
    // Create new customer
    createOne(customerData,'customer');
  }
  
  showModal.value = false;
  list.value = getAll('customer'); // Refresh the list
};

const handleCancel = () => {
  showModal.value = false;
};

const handleModalCancel = () => {
  showModal.value = false;
};

// Filter and paginate data
const filtered = computed(() => {
  const s = searchTerm.value.trim().toLowerCase();
  return s 
    ? list.value.filter((c) => 
        c.firstname.toLowerCase().includes(s) || 
        c.lastname.toLowerCase().includes(s) ||
        c.email.toLowerCase().includes(s)
      ) 
    : list.value;
});

const dataTable = computed(() => {
  const start = (page.value - 1) * pageSize.value;
  return filtered.value.slice(start, start + pageSize.value);
});

const columns: TableColumnsType = [
  { title: "First Name", width: 60, dataIndex: "firstname", key: "firstname" },
  { title: "Last Name", width: 60, dataIndex: "lastname", key: "lastname" },
  { title: "Gender", width: 50, dataIndex: "gender", key: "gender" },
  { title: "Age", dataIndex: "age", key: "age", width: 80 },
  { title: "Email", dataIndex: "email", key: "email", width: 100 },
  { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber", width: 100 },
  { title: "Address", dataIndex: "address", key: "address", width: 100 },
  { 
    title: "Profile", 
    dataIndex: "image", 
    key: "image", 
    width: 50,
   },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 120,
  },
];
</script>