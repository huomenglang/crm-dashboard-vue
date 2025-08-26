<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="props.data"
      row-key="id"
      :pagination="false"
    >
      <template #bodyCell="{ column, record }">
        <!-- Photo column -->
        <template v-if="column.key === 'imageBase64'">
          <img :src="record.imageBase64" class="w-12 h-12 rounded-full" />
        </template>

        <!-- Actions column -->
        <template v-else-if="column.key === 'actions'">
          <a-space>
            <a-button type="link" @click="emit('edit', record)">Edit</a-button>
            <a-popconfirm
              title="Are you sure delete this customer?"
              @confirm="emit('delete', record.id)"
            >
              <a-button type="link" danger>Delete</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>

    <!-- Pagination -->
    <div class="flex justify-end mt-4">
      <a-pagination
        :current="page"
        :pageSize="pageSize"
        :total="total"
        @change="(p:any, ps:any) => emit('page-change', p, ps)"
        show-less-items
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Customer } from "./init";

const props = defineProps<{
  data: Customer[];
  total: number;
  page: number;
  pageSize: number;
}>();

const emit = defineEmits<{
  (e: "page-change", page: number, pageSize: number): void;
  (e: "edit", c: Customer): void;
  (e: "delete", id: string): void;
}>();

// Table columns
const columns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Gender", dataIndex: "gender", key: "gender" },
  { title: "Age", dataIndex: "age", key: "age" },
  { title: "Photo", dataIndex: "imageBase64", key: "imageBase64" },
  { title: "Actions", key: "actions" },
];
</script>
