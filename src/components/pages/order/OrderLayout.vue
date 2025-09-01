<template>
  <a-layout class="order-management-layout">
    
    <a-layout-content class="content">
      <div class="split-container">
        <!-- Order List Side (400px) -->
        <div class="order-list-side">
          <div class="side-header">
            <h3>Orders</h3>
            <a-button type="text" size="small">
              <template #icon><ReloadOutlined /></template>
            </a-button>
          </div>
          
          <div class="filters">
            <a-input-search
              v-model:value="searchTerm"
              placeholder="Search invoice..."
              @search="handleSearch"
              class="search-input"
            >
              <template #prefix><SearchOutlined /></template>
            </a-input-search>
            <a-select
              v-model:value="statusFilter"
              placeholder="Filter status"
              :options="statusOptions"
              allow-clear
              @change="handleFilter"
              class="status-filter"
            >
              <template #suffixIcon><FilterOutlined /></template>
            </a-select>
          </div>

          <a-list
            :data-source="filteredOrders"
            :loading="loading"
            class="order-list-container"
          >
            <template #renderItem="{ item }">
              <OrderCard
                :order="item"
                :selected="selectedOrder?.orderId === item.orderId"
                @click="handleOrderClick(item)"
                class="order-card"
              />
            </template>
          </a-list>
        </div>

        <!-- Order Details Side (800px) -->
        <div class="order-details-side">
          <OrderDetails
            v-if="selectedOrder" 
            :order="selectedOrder"
            @status-change="handleStatusChange"
            @product-update="handleProductUpdate"
          />
          <div v-else class="no-order-selected">
            <a-empty 
              description="Select an order to view details" 
              image-style="height: 100px"
            >
              <template #image>
                <ShoppingOutlined style="font-size: 48px; color: #d9d9d9;" />
              </template>
            </a-empty>
          </div>
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { 
  UserOutlined, 
  ReloadOutlined, 
  SearchOutlined, 
  FilterOutlined,
  ShoppingOutlined 
} from '@ant-design/icons-vue'

import { mockOrders } from './orderData'
import type { Order, OrderProduct, OrderStatus } from './order'
import OrderCard from './OrderCard.vue'
import OrderDetails from './OrderDetails.vue'


const searchTerm = ref('')
const statusFilter = ref<OrderStatus | undefined>()
const loading = ref(false)
const selectedOrder = ref<Order | null>(null)

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
    result = result.filter((order:any) => 
      order.orderNo.toLowerCase().includes(term)
    )
  }

  if (statusFilter.value) {
    result = result.filter((order:any) => order.status === statusFilter.value)
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
  selectedOrder.value = { ...order }
}

const handleStatusChange = (newStatus: OrderStatus) => {
  console.log("status: ",newStatus)
  if (selectedOrder.value) {
    // Update the selected order
    selectedOrder.value.status = newStatus
    selectedOrder.value.updatedAt = new Date().toISOString()
    
    // Also update the order in the main list
    const index = mockOrders.findIndex((o:any) => o.orderId === selectedOrder.value?.orderId)
    if (index !== -1) {
      mockOrders[index].status = newStatus
      mockOrders[index].updatedAt = new Date().toISOString()
      
      // Set the user who performed the action
      const user = 'Admin User'
      if (newStatus === 'APPROVED') {
        selectedOrder.value.approvedBy = user
        mockOrders[index].approvedBy = user
      }else if(newStatus ==='STOCK_VERIFIED'){
        console.log("stock verify")
        selectedOrder.value.verifiedBy=user
        mockOrders[index].verifiedBy=user
      }else if (newStatus === 'SHIPPED') {
        selectedOrder.value.shippedBy = user
        mockOrders[index].shippedBy = user
      } else if (newStatus === 'COMPLETED') {
        selectedOrder.value.completedBy = user
        mockOrders[index].completedBy = user
      } else if (newStatus === 'CANCELLED') {
        selectedOrder.value.cancelledBy = user
        mockOrders[index].cancelledBy = user
      }
    }
  }
}

const handleProductUpdate = (updatedProducts: OrderProduct[]) => {
  if (selectedOrder.value) {
    selectedOrder.value.products = updatedProducts
    
    // Recalculate order totals
    const subtotal = selectedOrder.value.products.reduce((sum:any, product:any) => sum + product.subtotal, 0)
    const discountAmount = selectedOrder.value.discount ? subtotal * (selectedOrder.value.discount / 100) : 0
    const taxAmount = selectedOrder.value.tax || 0
    
    selectedOrder.value.totalAmount = subtotal - discountAmount + taxAmount
    selectedOrder.value.updatedAt = new Date().toISOString()
    
    // Also update the order in the main list
    const index = mockOrders.findIndex((o:any) => o.orderId === selectedOrder.value?.orderId)
    if (index !== -1) {
      mockOrders[index].products = updatedProducts
      mockOrders[index].totalAmount = selectedOrder.value.totalAmount
      mockOrders[index].updatedAt = new Date().toISOString()
    }
  }
}

onMounted(() => {
  // In a real app, you would fetch orders from an API
  loading.value = true
  setTimeout(() => {
    loading.value = false
    // Select the first order by default
    if (mockOrders.length > 0) {
      selectedOrder.value = { ...mockOrders[0] }
    }
  }, 500)
})
</script>

<style scoped>
.order-management-layout {
  min-height: 100vh;
}

.header {
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
  color: white;
  padding: 0 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
}

.header h1 {
  color: white;
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.content {
  background-color: #f5f7fa;
  height: calc(100vh - 64px);
}

.split-container {
  display: flex;
  height: 100%;
  gap: 24px;
}

.order-list-side {
  width: 400px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.order-details-side {
  flex: 1;
  min-width: 0;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
}

.side-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.side-header h3 {
  margin: 0;
  font-weight: 500;
  color: #262626;
}

.filters {
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.search-input :deep(.ant-input) {
  border-radius: 6px;
}

.status-filter :deep(.ant-select-selector) {
  border-radius: 6px;
}

.order-list-container {
  flex: 1;
  overflow-y: auto;
  padding: 0 12px;
}

.order-card {
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 8px;
  overflow: hidden;
}

.order-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.no-order-selected {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #bfbfbf;
}
</style>