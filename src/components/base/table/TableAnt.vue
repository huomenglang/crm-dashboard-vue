<template>
  <div class="w-full custom-table-container" :class="containerClass">
    <!-- Header Section -->
    <div class="!flex justify-between items-center mb-4 w-full">
      <!-- Create Button -->
      <div class="w-[30%]">
        <round-button @click="emit('create')">
          Create
          <PlusOutlined />
        </round-button>
      </div>

      <!-- Search and Filter Section -->
      <div class="w-[50%] flex flex-between">
        <div class="flex justify-end items-center gap-2 w-full">
          <!-- Search Input -->
          <div class="w-[60%] flex justify-center gap-2">
            <ant-input
              :placeholder="searchPlaceholder"
              :value="searchValue"
              @update:value="handleSearch"
            />
            <round-button
              :class="searchButtonClass"
              @click="emit('search', searchValue)"
            >
              <SearchOutlined class="!text-sm" />
            </round-button>
          </div>

          <!-- Filter Button -->
          <round-button
            @click="emit('filter')"
            class="ml-2"
            :class="filterButtonClass"
          >
            Filter
            <FilterOutlined />
          </round-button>
        </div>
      </div>
    </div>

    <!-- Ant Design Table -->
    <a-table
      size="small"
      bordered
      v-bind="attrs"
      :columns="processedColumns"
      :data-source="data"
      :class="['custom-table', tableClass]"
      :scroll="mergedScroll"
    >
      <!-- Custom Body Cells -->
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'image'">
          <a-image
            v-if="record.image"
            :src="record.image"
            class="!w-10 !h-10 !rounded-full border-2 border-gray-200"
            :preview="true"
            style="border-radius: 6px; object-fit: cover"
            fallback="https://via.placeholder.com/50?text=No+Image"
          />
          <div
            v-else
            class="w-[50px] h-[50px] bg-gray-200 rounded-md flex items-center justify-center"
          >
            <span class="text-gray-400 text-xs">No Image</span>
          </div>
        </template>

        <!-- Action Column -->
        <template v-else-if="column.key === 'operation'">
          <div class="flex items-center gap-x-0.5">
            <round-button
              @click="emit('view', record, index)"
              :class="viewButtonClass"
            >
              <EyeOutlined />
            </round-button>
            <a-divider type="vertical" />
            <round-button
              @click="emit('edit', record, index)"
              :class="editButtonClass"
            >
              <EditOutlined />
            </round-button>
            <a-divider type="vertical" />

            <a-popconfirm
              title="Are you sure delete?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="handleConfirm(record, index)"
              class="flex justify-center items-center"
            >
              <template #icon><QuestionCircleOutlined style="color: red" /></template>
              <round-button :is-danger="true" :class="deleteButtonClass">
                <DeleteOutlined />
              </round-button>
            </a-popconfirm>
          </div>
        </template>

        <!-- Default Slot for other columns -->
        <template v-else>
          <slot
            :name="`bodyCell-${column.key}`"
            :record="record"
            :index="index"
            :column="column"
          >
            <slot
              :name="`column-${column.key}`"
              :record="record"
              :index="index"
              :column="column"
            >
              {{ record[column.dataIndex] }}
            </slot>
          </slot>
        </template>
      </template>

      <!-- Empty State -->
      <template #emptyText>
        <slot name="empty">
          <div class="text-center py-8 text-gray-500">No data found</div>
        </slot>
      </template>

      <!-- Header Cell Slots -->
      <template v-for="column in columns" #[`headerCell-${column.key}`]>
        <slot :name="`header-${column.key}`" :column="column">
          {{ column.title }}
        </slot>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, type CSSProperties, useAttrs } from "vue";
import type { TableColumnsType, TableProps } from "ant-design-vue";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  FilterOutlined,
  PlusOutlined,
  EyeOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons-vue";

import RoundButton from "@/components/base/button/RoundButton.vue";
import AntInput from "@/components/base/input/AntInput.vue";

const attrs = useAttrs();

// Define props that extend Ant Design Table props
interface CustomTableProps extends Omit<TableProps, "columns" | "dataSource"> {
  // Required props
  columns: TableColumnsType;
  data: any[];

  // Custom props
  searchPlaceholder?: string;
  searchValue?: string;

  // Class overrides
  containerClass?: string;
  tableClass?: string;
  createButtonClass?: string;
  searchInputClass?: string;
  searchButtonClass?: string;
  filterButtonClass?: string;
  editButtonClass?: string;
  viewButtonClass?: string;
  deleteButtonClass?: string;
}

const props = withDefaults(defineProps<CustomTableProps>(), {
  searchPlaceholder: "Search...",
  searchValue: "",

  containerClass: "",
  tableClass: "",
  createButtonClass: "",
  searchInputClass: "",
  searchButtonClass: "",
  filterButtonClass: "",
  editButtonClass: "",
  deleteButtonClass: "",
  scroll: () => ({ x: 1500, y: 1000 }),
});

// Define emits
const emit = defineEmits<{
  (e: "create"): void;
  (e: "edit", record: any, index: number): void;
  (e: "delete", record: any, index: number): void;
  (e: "search", value: string): void;
  (e: "filter"): void;
  (e: "view", record: any, index: number): void;
  (e: "update:searchValue", value: string): void;
}>();

// Table ref
const tableRef = ref();

// Process columns to include actions if needed
const processedColumns = computed(() => {
  const columns = [...props.columns];

  return columns;
});

// Merge scroll configuration
const mergedScroll = computed(() => ({
  x: 1500,
  y: 1000,
  ...props.scroll,
}));

// Handle search input
const handleSearch = (value: string) => {
  emit("update:searchValue", value);
};

const handleConfirm = (record: any, index: any) => {
  emit("delete", record, index);
};
// Expose table methods
defineExpose({
  tableRef,
  refresh: () => tableRef.value?.refresh?.(),
  // Add other table methods as needed
});
</script>

<style scoped>
.custom-table-container {
  background: white;
  border-radius: 8px;
  padding: 16px;
}

:deep(.custom-table .ant-table) {
  border-radius: 8px;
  overflow: hidden;
}

:deep(.custom-table .ant-table-thead > tr > th) {
  background-color: #f8fafc !important;
  font-weight: 600;
  color: #374151;
  border-bottom: 2px solid #e5e7eb !important;
}

:deep(.custom-table .ant-table-tbody > tr:hover > td) {
  background-color: #f1f5f9 !important;
}

:deep(.custom-table .ant-pagination) {
  margin-top: 16px;
  padding: 0 16px;
}
</style>
