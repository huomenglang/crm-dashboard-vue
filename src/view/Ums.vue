<template>
    <TableAnt
      :columns="umsColumns"
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
    <UmsForm
      :open="showModal"
      :isEditing="isEditing"
      :initialValues="ums || {}"
      @close="showModal = false"
      @submit="handleSubmit"
    />
</template>

<script lang="ts" setup>
import TableAnt from '@/components/base/table/TableAnt.vue';

import { computed, ref } from 'vue';
import {getAll,createOne,deleteOne,updateOne} from '@/data/ls_data'
import UmsForm from '@/components/pages/ums/UmsForm.vue';
import { type UmsProps ,umsColumns} from '@/components/pages/ums/ums';
import { KEY } from '@/data/Key';

// Modal state
const showModal = ref(false);
const ums = ref<UmsProps | null>(null);
const isEditing = ref(false)

// Table data
const loading = ref(false);
const searchTerm = ref('');
const page = ref(1);
const pageSize = ref(6);
const list = ref<UmsProps[]>(getAll(KEY.UNIT));
console.log('list; ',list)

// Event handlers
const handleCreate = () => {
  showModal.value = true;
isEditing.value = false;
  ums.value = null;
};

const handleEdit = (record: UmsProps) => {
  showModal.value = true;
  isEditing.value = true;
  ums.value = { ...record };

};

const handleView = (record: UmsProps) => {
  showModal.value = true;
  ums.value = { ...record };
};

const handleDelete = (record: UmsProps) => {
  deleteOne(record.id, KEY.UNIT);
  list.value = getAll(KEY.UNIT); // Refresh the list
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
        c.name.toLowerCase().includes(s)
      ) 
    : list.value;
});

const dataTable = computed(() => {
  const start = (page.value - 1) * pageSize.value;
  return filtered.value.slice(start, start + pageSize.value);
});

const handleSubmit = (values: Omit<UmsProps, "id">) => {
  if (isEditing.value && ums.value) {
    updateOne(ums.value.id, values, KEY.UNIT);
    list.value = getAll(KEY.UNIT);
  } else {
    createOne({ id: Date.now().toString(), ...values }, KEY.UNIT);
    list.value = getAll(KEY.UNIT);
  }
  showModal.value = false
}
</script>

<style lang="scss" scoped>

</style>