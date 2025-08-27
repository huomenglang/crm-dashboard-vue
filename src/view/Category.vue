<template>
    <TableAnt
      :columns="categoryColums"
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
    <category-form
      :open="showModal"
      :isEditing="isEditing"
      :initialValues="category || {}"
      @close="showModal = false"
      @submit="handleSubmit"
    />
</template>

<script lang="ts" setup>
import TableAnt from '@/components/base/table/TableAnt.vue';

import { computed, ref } from 'vue';
import {getAll,createOne,deleteOne,updateOne} from '@/data/ls_data'
import AntModal from '@/components/base/modal/AntModal.vue';
import CategoryForm from '@/components/pages/category/CategoryForm.vue';
import { categoryColums, type CategoryProps } from '@/components/pages/category/category';

// Modal state
const showModal = ref(false);
const category = ref<CategoryProps | null>(null);
const isEditing = ref(false)

// Table data
const loading = ref(false);
const searchTerm = ref('');
const page = ref(1);
const pageSize = ref(6);
const list = ref<CategoryProps[]>(getAll('category'));
console.log('list; ',list)

// Event handlers
const handleCreate = () => {
  showModal.value = true;
isEditing.value = false;
  category.value = null;
};

const handleEdit = (record: CategoryProps) => {
  showModal.value = true;
  isEditing.value = true;
  category.value = { ...record };
  
};

const handleView = (record: CategoryProps) => {
  showModal.value = true;
  category.value = { ...record };
};

const handleDelete = (record: CategoryProps,) => {
  deleteOne(record.id,'category');
  list.value = getAll('category'); // Refresh the list
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

const handleSubmit = (values: Omit<CategoryProps, "id">) => {
  if (isEditing.value && category.value) {
    updateOne(category.value.id, values,'category');
    list.value = getAll('category'); 
  } else {
    createOne({ id: Date.now().toString(), ...values },'category');
    list.value = getAll('category'); 
  }
  showModal.value = false
}
</script>

<style lang="scss" scoped>

</style>