<template>
  <a-card 
    class="order-card" 
    :class="{ selected: selected }"
    @click="$emit('click', $event)"
    :body-style="{ padding: '16px' }"
  >
    <div class="card-content">
      <div class="card-header">
        <div class="order-number">{{ order.orderNo }}</div>
        <a-tag :color="getStatusColor(order.status)" class="status-tag">
          {{ formatStatus(order.status) }}
        </a-tag>
      </div>
      
      <div class="customer-info">
        <user-outlined class="info-icon" />
        <span class="customer-name">{{ order.customer.name }}</span>
      </div>
      
      <div class="order-info-grid">
        <div class="info-item">
          <calendar-outlined class="info-icon" />
          <span class="info-text">{{ formatDate(order.createdAt) }}</span>
        </div>
        <div class="info-item">
          <shopping-cart-outlined class="info-icon" />
          <span class="info-text">{{ order.products.length }} items</span>
        </div>
      </div>
      
      <a-divider class="card-divider" />
      
      <div class="card-footer">
        <div class="total-amount">${{ order.totalAmount.toFixed(2) }}</div>
        <div class="view-details">View Details <arrow-right-outlined /></div>
      </div>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import { 
  UserOutlined, 
  CalendarOutlined, 
  ShoppingCartOutlined,
  ArrowRightOutlined 
} from '@ant-design/icons-vue'
import type { Order } from '../order/order'

defineProps<{
  order: Order
  selected?: boolean
}>()

defineEmits<{
  (e: 'click', event: Event): void
}>()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const formatStatus = (status: string) => {
  return status.split('_').map(word => 
    word.charAt(0) + word.slice(1).toLowerCase()
  ).join(' ')
}

const getStatusColor = (status: string) => {
  const statusColors: Record<string, string> = {
    CREATED: '#fa8c16',
    STOCK_VERIFIED: '#1890ff',
    APPROVED: '#52c41a',
    SHIPPED: '#722ed1',
    COMPLETED: '#13c2c2',
    CANCELLED: '#f5222d',
  }
  return statusColors[status]
}
</script>

<style scoped>
.order-card {
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.order-card.selected {
  border: 1px solid #1890ff;
  background-color: #f6ffed;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.order-number {
  font-weight: 600;
  font-size: 15px;
  color: #262626;
}

.status-tag {
  margin: 0;
  font-size: 11px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 10px;
}

.customer-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.customer-name {
  font-size: 13px;
  color: #595959;
}

.order-info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.info-icon {
  font-size: 12px;
  color: #bfbfbf;
}

.info-text {
  font-size: 12px;
  color: #8c8c8c;
}

.card-divider {
  margin: 4px 0;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-amount {
  font-weight: 600;
  font-size: 15px;
  color: #389e0d;
}

.view-details {
  font-size: 12px;
  color: #1890ff;
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>