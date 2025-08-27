<template>
    <TableAnt
      :columns="warehouseColumns"
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
      @view="handleView"
      @edit="handleEdit"
      @delete="handleDelete"
      @filter="handleFilter"
    />
    <WarehouseForm
      :open="showModal"
      :isEditing="isEditing"
      :initialValues="warehouse || {}"
      @close="showModal = false"
      @submit="handleSubmit"
    />
</template>

<script lang="ts" setup>
import TableAnt from '@/components/base/table/TableAnt.vue';

import { computed, ref } from 'vue';
import {getAll,createOne,deleteOne,updateOne} from '@/data/ls_data'
import WarehouseForm from '@/components/pages/warehouse/WarehouseForm.vue';
import { warehouseColumns, type WarehouseProps } from '@/components/pages/warehouse/warehouse';
import { KEY } from '@/data/Key';

// Modal state
const showModal = ref(false);
const warehouse = ref<WarehouseProps | null>(null);
const isEditing = ref(false)

// Table data
const loading = ref(false);
const searchTerm = ref('');
const page = ref(1);
const pageSize = ref(6);
const list = ref<WarehouseProps[]>(getAll(KEY.WAREHOUSE));
console.log('list; ',list)

// Event handlers
const handleCreate = () => {
  showModal.value = true;
  isEditing.value = false;
  warehouse.value = null;
};

const handleEdit = (record: WarehouseProps) => {
  showModal.value = true;
  isEditing.value = true;
  warehouse.value = { ...record };

};

const handleView = (record: WarehouseProps) => {
  showModal.value = true;
  warehouse.value = { ...record };
};

const handleDelete = (record: WarehouseProps) => {
  deleteOne(record.id, KEY.WAREHOUSE);
  list.value = getAll(KEY.WAREHOUSE); // Refresh the list
};

const handleSearch = (value: string) => {
  searchTerm.value = value;
  
};

const handleFilter = () => {
  console.log('Open filter');
};


// Filter and paginate data
const filtered = computed(() => {
  const s = searchTerm.value.trim().toLowerCase();
  return s 
    ? list.value.filter((c) => 
        c.name.toLowerCase().includes(s)||
        c.location.toLowerCase().includes(s)
      ) 
    : list.value;
});

const dataTable = computed(() => {
  const start = (page.value - 1) * pageSize.value;
  return filtered.value.slice(start, start + pageSize.value);
});

const handleSubmit = (values: Omit<WarehouseProps, "id">) => {
  if (isEditing.value && warehouse.value) {
    updateOne(warehouse.value.id, values, KEY.WAREHOUSE);
    list.value = getAll(KEY.WAREHOUSE);
  } else {
    createOne({ id: Date.now().toString(), ...values }, KEY.WAREHOUSE);
    list.value = getAll(KEY.WAREHOUSE);
  }
  showModal.value = false
}
</script>

<style lang="scss" scoped>

</style>