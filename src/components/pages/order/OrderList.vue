<template>
  <div class="order-list">
    <div class="filters">
      <a-input-search
        v-model:value="searchTerm"
        placeholder="Search by Invoice No"
        style="width: 300px; margin-right: 16px"
        @search="handleSearch"
      />
      <a-select
        v-model:value="statusFilter"
        placeholder="Filter by status"
        style="width: 200px"
        :options="statusOptions"
        allow-clear
        @change="handleFilter"
      />
    </div>

    <a-list
      :data-source="filteredOrders"
      :loading="loading"
      class="order-list-container"
    >
      <template #renderItem="{ item }">
        <order-card
          :order="item"
          @click="handleOrderClick(item)"
          class="order-card"
        />
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import OrderCard from './OrderCard.vue'
import type { Order, OrderStatus } from './order'
import { mockOrders } from './orderData'


const router = useRouter()
const searchTerm = ref('')
const statusFilter = ref<OrderStatus | undefined>()
const loading = ref(false)

// Status options for filter dropdown
const statusOptions = [
  { value: 'CREATED', label: 'Created' },
  { value: 'STOCK_VERIFIED', label: 'Stock Verified' },
  { value: 'APPROVED', label: 'Approved' },
  { value: 'SHIPPED', label: 'Shipped' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
]

// Filter orders based on search term and status
const filteredOrders = computed(() => {
  let result = mockOrders

  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase()
    result = result.filter(order => 
      order.orderNo.toLowerCase().includes(term)
    )
  }

  if (statusFilter.value) {
    result = result.filter(order => order.status === statusFilter.value)
  }

  return result
})

const handleSearch = () => {
  // Search logic is handled in computed property
}

const handleFilter = () => {
  // Filter logic is handled in computed property
}

const handleOrderClick = (order: Order) => {
  router.push(`/orders/${order.orderId}`)
}

onMounted(() => {
  // In a real app, you would fetch orders from an API
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 500)
})
</script>

<style scoped>
.filters {
  display: flex;
  margin-bottom: 24px;
  align-items: center;
}

.order-list-container {
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}

.order-card {
  margin-bottom: 16px;
  cursor: pointer;
  transition: box-shadow 0.3s;
}

.order-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>