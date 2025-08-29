<template>
  <div class="order-details" v-if="order">
    <div class="details-header">
      <h2>Order #{{ order.orderNo }}</h2>
      <div class="header-actions">
        <a-button v-if="isEditable" type="primary" @click="handleSave">
          <template #icon><SaveOutlined /></template>
          Save Changes
        </a-button>
        <a-button>
          <template #icon><PrinterOutlined /></template>
          Print
        </a-button>
      </div>
    </div>

    <order-steps 
      :current-status="order.status" 
      @status-change="handleStatusChange"
      :editable="isEditable"
      class="order-steps-container"
    />

    <a-divider class="section-divider" />

    <div class="details-content">
      <div class="content-section">
        <h3 class="section-title">Order Information</h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">Customer:</span>
            <span class="info-value">{{ order.customer.name }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Email:</span>
            <span class="info-value">{{ order.customer.email }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Phone:</span>
            <span class="info-value">{{ order.customer.phone }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Address:</span>
            <span class="info-value">{{ order.customer.address }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Order Date:</span>
            <span class="info-value">{{ formatDate(order.createdAt) }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Last Updated:</span>
            <span class="info-value">{{ formatDate(order.updatedAt) }}</span>
          </div>
        </div>
      </div>

      <a-divider class="section-divider" />

      <div class="content-section">
        <h3 class="section-title">Products</h3>
        <table-product
          :products="order.products" 
          :editable="isEditable"
          @product-update="$emit('product-update', $event)"
          class="products-table"
        />
      </div>

      <a-divider class="section-divider" />

      <div class="content-section">
        <h3 class="section-title">Order Summary</h3>
        <div class="summary-grid">
          <div class="summary-item">
            <span class="summary-label">Subtotal:</span>
            <span class="summary-value">${{ calculateSubtotal().toFixed(2) }}</span>
          </div>
          <div class="summary-item" v-if="order.discount">
            <span class="summary-label">Discount ({{ order.discount }}%):</span>
            <span class="summary-value discount">-${{ calculateDiscount().toFixed(2) }}</span>
          </div>
          <div class="summary-item" v-if="order.tax">
            <span class="summary-label">Tax:</span>
            <span class="summary-value">${{ order.tax.toFixed(2) }}</span>
          </div>
          <a-divider class="summary-divider" />
          <div class="summary-item total">
            <span class="summary-label">Total Amount:</span>
            <span class="summary-value total">${{ order.totalAmount.toFixed(2) }}</span>
          </div>
        </div>
      </div>

      <a-divider class="section-divider" />

      <div class="content-section">
        <h3 class="section-title">Order History</h3>
        <div class="audit-grid">
          <div class="audit-item" v-if="order.createdBy">
            <user-outlined class="audit-icon" />
            <div class="audit-details">
              <span class="audit-action">Order Created</span>
              <span class="audit-user">by {{ order.createdBy }}</span>
              <span class="audit-time">{{ formatDate(order.createdAt) }}</span>
            </div>
          </div>
          <div class="audit-item" v-if="order.approvedBy">
            <check-circle-outlined class="audit-icon approved" />
            <div class="audit-details">
              <span class="audit-action">Order Approved</span>
              <span class="audit-user">by {{ order.approvedBy }}</span>
              <span class="audit-time">{{ formatDate(order.updatedAt) }}</span>
            </div>
          </div>
          <div class="audit-item" v-if="order.shippedBy">
            <car-outlined class="audit-icon shipped" />
            <div class="audit-details">
              <span class="audit-action">Order Shipped</span>
              <span class="audit-user">by {{ order.shippedBy }}</span>
              <span class="audit-time">{{ formatDate(order.updatedAt) }}</span>
            </div>
          </div>
          <div class="audit-item" v-if="order.completedBy">
            <check-circle-outlined class="audit-icon completed" />
            <div class="audit-details">
              <span class="audit-action">Order Completed</span>
              <span class="audit-user">by {{ order.completedBy }}</span>
              <span class="audit-time">{{ formatDate(order.updatedAt) }}</span>
            </div>
          </div>
          <div class="audit-item" v-if="order.cancelledBy">
            <close-circle-outlined class="audit-icon cancelled" />
            <div class="audit-details">
              <span class="audit-action">Order Cancelled</span>
              <span class="audit-user">by {{ order.cancelledBy }}</span>
              <span class="audit-time">{{ formatDate(order.updatedAt) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { 
  SaveOutlined, 
  PrinterOutlined,
  UserOutlined,
  CheckCircleOutlined,
  CarOutlined,
  CloseCircleOutlined
} from '@ant-design/icons-vue'
import type { Order, OrderProduct, OrderStatus } from './order'
import OrderSteps from './OrderSteps.vue'
import TableProduct from './TableProduct.vue'

const props = defineProps<{
  order: Order
}>()

const emit = defineEmits<{
  (e: 'status-change', status: string): void
  (e: 'product-update', products: OrderProduct[]): void
}>()

const isEditable = computed(() => {
  return props.order.status === 'CREATED'
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const calculateSubtotal = () => {
  if (!props.order) return 0
  return props.order.products.reduce((sum:any, product:any) => sum + product.subtotal, 0)
}

const calculateDiscount = () => {
  if (!props.order || !props.order.discount) return 0
  const subtotal = calculateSubtotal()
  return subtotal * (props.order.discount / 100)
}

const handleStatusChange = (newStatus: OrderStatus) => {
  emit('status-change', newStatus)
}

const handleSave = () => {
  // Handle save logic
  console.log('Saving changes...')
}
</script>

<style scoped>
/* Keep the same styles as before */
.details-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.details-header h2 {
  margin: 0;
  color: #262626;
  font-weight: 600;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.order-steps-container {
  margin-bottom: 24px;
}

.section-divider {
  margin: 20px 0;
}

.details-content {
  padding: 0 8px;
}

.content-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #262626;
  margin-bottom: 16px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-label {
  font-size: 12px;
  color: #8c8c8c;
  font-weight: 500;
}

.info-value {
  font-size: 14px;
  color: #262626;
}

.products-table {
  margin-top: 16px;
}

.summary-grid {
  max-width: 400px;
  margin-left: auto;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
}

.summary-label {
  font-size: 14px;
  color: #595959;
}

.summary-value {
  font-size: 14px;
  color: #262626;
  font-weight: 500;
}

.summary-value.discount {
  color: #f5222d;
}

.summary-divider {
  margin: 8px 0;
}

.summary-item.total {
  border-top: 1px solid #f0f0f0;
  padding-top: 12px;
  margin-top: 4px;
}

.summary-item.total .summary-label {
  font-weight: 600;
  font-size: 15px;
}

.summary-item.total .summary-value {
  font-weight: 600;
  font-size: 15px;
  color: #389e0d;
}

.audit-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.audit-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.audit-icon {
  font-size: 18px;
  color: #bfbfbf;
  margin-top: 2px;
}

.audit-icon.approved {
  color: #52c41a;
}

.audit-icon.shipped {
  color: #722ed1;
}

.audit-icon.completed {
  color: #13c2c2;
}

.audit-icon.cancelled {
  color: #f5222d;
}

.audit-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.audit-action {
  font-size: 14px;
  color: #262626;
  font-weight: 500;
}

.audit-user {
  font-size: 13px;
  color: #595959;
}

.audit-time {
  font-size: 12px;
  color: #8c8c8c;
}
</style>