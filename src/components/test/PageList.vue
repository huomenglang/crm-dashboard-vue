<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <a-input
        v-model:value="search"
        placeholder="Search name..."
        class="w-64"
        allow-clear
      />
      <a-button type="primary" @click="openCreate">Create Customer</a-button>
    </div>

    <CustomerTable
      :data="paged"
      :total="filtered.length"
      :page="page"
      :pageSize="pageSize"
      @page-change="(p:any, ps:any) => { page = p; pageSize = ps }"
      @edit="openEdit"
      @delete="onDelete"
    />

    <CustomerModal
      :open="modalOpen"
      :mode="mode"
      :initial="currentPayload"
      @close="closeModal"
      @submit="handleSubmit"
      :customer="customerEdit"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, customRef, reactive, ref } from "vue";
import CustomerModal from "./CustomerModal.vue";
import CustomerTable from "./CustomerTable.vue";
import type { Customer, UpsertPayload } from "./init";
import { getAll, createOne, updateOne, deleteOne } from "./init";

const list = ref<Customer[]>(getAll());
const search = ref("");
const page = ref(1);
const pageSize = ref(6);
const customerEdit=ref<Customer>()

const modalOpen = ref(false);
const mode = ref<"create" | "edit">("create");
const editingId = ref<string | null>(null);
const currentPayload = ref<UpsertPayload | undefined>(undefined);

function closeModal() {
  modalOpen.value = false;
}

function openCreate() {
  mode.value = "create";
  editingId.value = null;
  currentPayload.value = undefined;
  modalOpen.value = true;
}

function openEdit(c: Customer) {
  mode.value = "edit";
  editingId.value = c.id;
  currentPayload.value = { ...c };
  modalOpen.value = true;
  customerEdit.value=c
}

function handleSubmit(payload: UpsertPayload) {
    console.log("data submit",payload)
    console.log("mode: ",mode.value)
  if (mode.value === "create") {
    const created = createOne(payload as Omit<Customer, "id">);
    list.value.unshift(created);
  } else if (mode.value === "edit" && editingId.value) {
    const updated = updateOne(editingId.value, payload as any);
    if (updated) {
      list.value = list.value.map((c) => (c.id === updated.id ? updated : c));
    }
  }
  closeModal();
}



function onDelete(id: string) {
  deleteOne(id);
  list.value = list.value.filter((c) => c.id !== id);
}



const filtered = computed(() => {
  const s = search.value.trim().toLowerCase();
  return s ? list.value.filter((c) => c.name.toLowerCase().includes(s)) : list.value;
});

const paged = computed(() => {
  const start = (page.value - 1) * pageSize.value;
  return filtered.value.slice(start, start + pageSize.value);
});


// const handleOk = (customer: Customer) => {
//   if (editingCustomer.value) {
//     // update existing
//     const idx = customers.value.findIndex(c => c.name === editingCustomer.value?.name);
//     if (idx > -1) {
//       customers.value[idx] = { ...customer };
//     }
//   } else {
//     // add new
//     customers.value.push(customer);
//   }
//   saveCustomers(customers.value);
//   modalOpen.value = false;
//   editingCustomer.value = null;
// };
</script>
