<template>
  <div class="w-full">
    <!-- Toolbar -->
    <div class="flex justify-between items-center mb-4 w-full">
      <!-- Create Button -->
      <div class="w-[30%]">
        <round-button @click="emit('create')">
          <slot name="create-icon">
            <PlusOutlined />
          </slot>
          <span>Create</span>
        </round-button>
      </div>

      <!-- Search + Filter -->
      <div class="w-[50%] flex flex-between">
        <div class="flex justify-end items-center gap-2 w-full">
          <ant-input
          v-model:value="searchQuery"
          :placeholder="searchPlaceholder"
          class="w-[50%]"
        />
        <round-button @click="onSearch">
          <SearchOutlined />
        </round-button>
        <round-button @click="emit('filter')">
          <slot name="filter-icon">
            <FilterOutlined />
          </slot>
          <span>Filter</span>
        </round-button>
        </div>
      </div>
    </div>

    <!-- AntD Table -->
    <a-table
      v-bind="attrs"
      :columns="columns"
      :data-source="dataSource"
      :class="['rounded-lg border border-gray-200', tableClass]"
      
    >
      <!-- Default body cell override for operation column -->
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'operation'">
          <round-button @click="emit('edit', record)">
            <EditOutlined />
          </round-button>
          <a-divider type="vertical" />
          <round-button :is-danger="true" @click="emit('delete', record)">
            <DeleteOutlined />
          </round-button>
        </template>

        <!-- Forward other slots -->
        <slot name="bodyCell" :column="column" :record="record" />
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref, useAttrs, defineProps, defineEmits } from 'vue'
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  FilterOutlined,
  PlusOutlined,
} from '@ant-design/icons-vue'
import RoundButton from '@/components/base/button/RoundButton.vue'
import AntInput from '@/components/base/input/AntInput.vue'

const attrs = useAttrs()

const props = defineProps<{
  columns: any[]
  dataSource: any[]
  tableClass?: string
  searchPlaceholder?: string
}>()

const emit = defineEmits<{
  (e: 'create'): void
  (e: 'filter'): void
  (e: 'search', q: string): void
  (e: 'edit', record: any): void
  (e: 'delete', record: any): void
}>()

const searchQuery = ref('')

function onSearch() {
  emit('search', searchQuery.value)
}
</script>
