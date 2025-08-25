<template>
  <!-- <AntTable
    :columns="columns"
    :data-source="data"
    :scroll="{ x: 1500, y: 600 }"
    size="small"
    table-class="shadow-md"
    search-placeholder="Search customers..."
    @create="onCreate"
    @edit="onEdit"
    @delete="onDelete"
    @search="onSearch"
    @filter="onFilter"
    
  /> -->


  <div class="p-6">
    <TableAnt
      :columns="columns"
      :data="data"
      :pagination="{ pageSize: 10, showSizeChanger: true }"
      :loading="loading"
      :row-key="record => record.key"
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
     :footer="true"
      title="Customer Form"
      v-model:open="showModal"
      width="800px"
    >
      <CustomerForm 
        @submit="handleSave"
        @cancel="handleCancel"
        :customer="customer"
       
      />
    </ant-modal>


  </div>

</template>
<script lang="ts" setup>
import type { TableColumnsType } from "ant-design-vue";

import { data } from "@/data/customer";
import TableAnt from "@/components/base/table/TableAnt.vue";
import { ref } from "vue";
import CustomerForm, { type Customer } from "@/components/pages/customer/CustomerForm.vue";
import AntModal from "@/components/base/modal/AntModal.vue";


//modal
const showModal = ref(false);
const customer = ref<Customer | null>(null);

const handleSave = (customer: Customer) => {
  console.log("Confirmed ✅", customer);
  showModal.value = false;
};

const handleCancel = () => {
  console.log("Cancelled ❌");
  showModal.value = false;
};


// Table data
const loading = ref(false);
const searchTerm = ref('');

// Event handlers
const handleCreate = () => {
  console.log('Create new user');
  showModal.value = true;
};

const handleEdit = (record: any, index: number) => {
  showModal.value = true;
  console.log('Edit user:', record, index);
  customer.value = { ...record };
};

const handleDelete = (record: any, index: number) => {
  console.log('Delete user:', record, index);
};

const handleSearch = (value: string) => {
  console.log('Search for:', value);
};

const handleFilter = () => {
  console.log('Open filter');
};

const columns: TableColumnsType = [
  { title: "Frist Name", width: 60, dataIndex: "firstname", key: "firstName" },
  { title: "Last Name", width: 60, dataIndex: "lastname", key: "lastName" },
  { title: "Gender", width: 50, dataIndex: "gender", key: "gender" },
  { title: "Age", dataIndex: "age", key: "age", width: 80 },
  { title: "Email", dataIndex: "email", key: "email", width: 100 },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    width: 100,
  },
  { title: "Address", dataIndex: "address", key: "address", width: 100 },
  // { title: 'Description', dataIndex: 'description', key: 'description', width: 150 },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 60,
  },
];
</script>
