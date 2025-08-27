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
      @search="handleSearch"s
      @create="handleCreate"
      @edit="handleEdit"
      @delete="handleDelete"
      @filter="handleFilter"
    />

     <SupplierForm
      :open="showModal"
      :isEditing="isEditing"
      :initialValues="supplier || {}"
      @close="showModal = false"
      @submit="handleSubmit"
    />
  </div>
</template>

<script lang="ts" setup>
import TableAnt from "@/components/base/table/TableAnt.vue";
import { computed, ref, watch } from "vue"
import {getAll,createOne,deleteOne,updateOne} from '@/data/ls_data'
import { columns, type Supplier } from "@/components/pages/supplier/supplier";
import SupplierForm from "@/components/pages/supplier/SupplierForm.vue";
import { KEY } from "@/data/Key";

// Modal state
const showModal = ref(false);
const supplier = ref<Supplier | null>(null);
const isEditing = ref(false)
const mode = ref<"create" | "edit">("create");

// Table data
const loading = ref(false);
const searchTerm = ref('');
const page = ref(1);
const pageSize = ref(6);
const list = ref<Supplier[]>(getAll(KEY.SUPPLIER));

// Watch for changes in localStorage and update the list
watch(showModal, (newVal) => {
  if (!newVal) {
    // Refresh the list when modal closes
    list.value = getAll(KEY.SUPPLIER);
  }
});

// Event handlers
const handleCreate = () => {
  showModal.value = true;
  isEditing.value = false;
  supplier.value = null;
};

const handleEdit = (record: Supplier) => {
  showModal.value = true;
  isEditing.value = true;
  console.log("Editing supplier:", {...record});
  supplier.value = { ...record };

};

const handleDelete = (record: Supplier) => {
  deleteOne(record.id);
  list.value = getAll(KEY.SUPPLIER); // Refresh the list
};

const handleSearch = (value: string) => {
  searchTerm.value = value;
};

const handleFilter = () => {
  console.log('Open filter');
};

const handleSubmit = (values: Omit<Supplier, "id">) => {
  if (isEditing.value && supplier.value) {
    updateOne(supplier.value.id, values, KEY.SUPPLIER);
    list.value = getAll(KEY.SUPPLIER);
  } else {
    createOne({ id: Date.now().toString(), ...values }, KEY.SUPPLIER);
    list.value = getAll(KEY.SUPPLIER);
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
        c.name.toLowerCase().includes(s) || 
        c.phoneNumber.toLowerCase().includes(s)
      ) 
    : list.value;
});

const dataTable = computed(() => {
  const start = (page.value - 1) * pageSize.value;
  return filtered.value.slice(start, start + pageSize.value);
});

</script>