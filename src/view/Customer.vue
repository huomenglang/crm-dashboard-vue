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

     <customer-form
      :open="showModal"
      :isEditing="isEditing"
      :initialValues="customer || {}"
      @close="showModal = false"
      @submit="handleSubmit"
    />
  </div>
</template>

<script lang="ts" setup>
import type { TableColumnsType } from "ant-design-vue";
import TableAnt from "@/components/base/table/TableAnt.vue";
import { computed, ref, watch } from "vue"
import CustomerForm from "@/components/pages/customer/CustomerForm.vue";
import AntModal from "@/components/base/modal/AntModal.vue";
import {getAll,createOne,deleteOne,updateOne} from '@/data/ls_data'
import { columns, type Customer } from "@/components/pages/customer/customer";

// Modal state
const showModal = ref(false);
const customer = ref<Customer | null>(null);
const isEditing = ref(false)

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
  isEditing.value = false;
  customer.value = null;
};

const handleEdit = (record: Customer) => {
  showModal.value = true;
  isEditing.value = true;
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

// const handleSave = (customerData: Customer, isEdit: boolean) => {
//   if (isEdit && customer.value) {
//     // Update existing customer
//     updateOne(customer.value.id, customerData,'customer');
//   } else {
//     // Create new customer
//     createOne(customerData,'customer');
//   }
  
//   showModal.value = false;
//   list.value = getAll('customer'); // Refresh the list
// };
const handleSubmit = (values: Omit<Customer, "id">) => {
  if (isEditing.value && customer.value) {
    updateOne(customer.value.id, values,'customer');
    list.value = getAll('customer'); 
  } else {
    createOne({ id: Date.now().toString(), ...values },'customer');
    list.value = getAll('customer'); 
  }
  showModal.value = false
}

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


</script>