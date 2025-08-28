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

     <ProductForm
      :open="showModal"
      :isEditing="isEditing"
      :initialValues="product || {}"
      @close="showModal = false"
      @submit="handleSubmit"
    />
  </div>
</template>

<script lang="ts" setup>
import type { TableColumnsType } from "ant-design-vue";
import TableAnt from "@/components/base/table/TableAnt.vue";
import { computed, ref, toRaw, watch } from "vue"
import CustomerForm from "@/components/pages/customer/CustomerForm.vue";
import AntModal from "@/components/base/modal/AntModal.vue";
import {getAll,createOne,deleteOne,updateOne} from '@/data/ls_data'
import { columns, type ProductResponse } from "@/components/pages/product/product";
import ProductForm from "@/components/pages/product/ProductForm.vue";
import { KEY } from "@/data/Key";
import { categoryData } from "@/data/mock_data";

// Modal state
const showModal = ref(false);
const product = ref<any | null>(null);
const isEditing = ref(false)

// Table data
const loading = ref(false);
const searchTerm = ref('');
const page = ref(1);
const pageSize = ref(6);
const list = ref<ProductResponse[]>(getAll(KEY.PRODUCT));

// Watch for changes in localStorage and update the list
watch(showModal, (newVal) => {
  if (!newVal) {
    // Refresh the list when modal closes
    list.value = getAll(KEY.PRODUCT);
  }
});

// Event handlers
const handleCreate = () => {
  showModal.value = true;
  isEditing.value = false;
  product.value = null;
};

const handleEdit = (record: any) => {
  showModal.value = true;
  isEditing.value = true;
  console.log("Editing product:", {...record});


  const productEdit={
    id: record.id,
    name: record?.name,
    categoryId: record?.category?.id,
    description: record?.description,
    image: record?.image,
    units: record?.units?.map((unit:any) => ({
      unitName:{
        key: unit?.unitId?.toString(),
        label: unit?.unitName,
        value: unit?.unitId?.toString(),
        originLabel: unit?.unitName,
      },
      conversionToBase: parseInt(unit?.conversionToBase),
      sellingPrice: parseFloat(unit?.sellingPrice),
    })),
  }

  console.log('convert product:', toRaw(productEdit));
  product.value = { ...productEdit };

};

const handleDelete = (record: any) => {
  console.log("Deleting product:", record.id);
  deleteOne(record.id, KEY.PRODUCT);
  list.value = getAll(KEY.PRODUCT); // Refresh the list
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
const handleSubmit =async (values: any) => {

  console.log(`Submitted values:`, values);

  if (isEditing.value && product.value) {

    const category = categoryData.find(c => c.id === values?.categoryId);
    const units=values?.units?.map((unit:any)=>({
      unitId: unit.unitName?.key,
      unitName: unit?.unitName?.label,
      conversionToBase: parseInt(unit.conversionToBase),
      sellingPrice: parseFloat(unit.sellingPrice),
    })) || [];

    const mock_product: any = {
      id: Date.now().toString(),
      name: values.name,
      category: { id: category?.id, name: category?.name },
      description: values.description,
      image: values.image,
      warehouse: { id: '1', name: "Watphnom"},
      units: units,
      quantity: 0,
      cost: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      updatedBy: "Admin",
      createdBy: "Admin",
    };
    updateOne(product.value.id, mock_product, KEY.PRODUCT);
    list.value = getAll(KEY.PRODUCT);
  } else {

    const category = categoryData.find(c => c.id === values?.categoryId);
    const units=values?.units?.map((unit:any)=>({
      unitId: unit.unitName?.key,
      unitName: unit?.unitName?.label,
      conversionToBase: unit.conversionToBase,
      sellingPrice: unit.sellingPrice,
    })) || [];

    const mock_product: any = {
      id: Date.now().toString(),
      name: values.name,
      category: { id: category?.id, name: category?.name },
      description: values.description,
      image: values.image,
      warehouse: { id: '1', name: "Watphnom"},
      units: units,
      quantity: 0,
      cost: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      updatedBy: "Admin",
      createdBy: "Admin",
    };

    console.log("Creating product:", mock_product);
  await createOne(mock_product, KEY.PRODUCT);
    list.value = getAll(KEY.PRODUCT);
  }
  showModal.value = false
}



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


</script>