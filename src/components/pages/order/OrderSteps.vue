<template>
  <div class="order-steps">
    <div class="steps-header">
      <div class="verify-action" v-if="showVerifyButton">
        <a-button 
          type="primary" 
          @click="verifyCurrentStep"
          :loading="verificationLoading"
          class="verify-btn"
        >
          Mark as {{ getVerifyButtonText() }}
        </a-button>
        
        <!-- Cancel Button for specific steps -->
        <a-button 
          v-if="showCancelButton"
          @click="cancelOrder"
          danger
          class="cancel-btn"
        >
          Cancel Order
        </a-button>
      </div>
    </div>
    
    <!-- Ant Design Steps Component with Custom Styling -->
    <a-steps :current="currentStepIndex" class="custom-steps">
      <a-step 
        v-for="(step, index) in steps" 
        :key="step.status"
        :title="step.title"
        :description="getStepDescription(index)"
        :icon="getStepIcon(step.status)"
        :status="getStepStatus(index)"
        :class="{'step-finished': index < currentStepIndex}"
      />
    </a-steps>
  </div>
</template>

<script setup lang="ts">
import { 
  FileOutlined, 
  CheckCircleOutlined, 
  SafetyCertificateOutlined,
  RocketOutlined,
  CheckSquareOutlined,
  CloseCircleOutlined
} from '@ant-design/icons-vue'
import { computed, ref,h } from 'vue'
import type { OrderStatus } from './order'

interface Step {
  status: OrderStatus
  title: string
}

const props = defineProps<{
  currentStatus: OrderStatus
  editable?: boolean
}>()

const emit = defineEmits<{
  (e: 'status-change', status: OrderStatus): void
}>()

const verificationLoading = ref(false)

const steps: Step[] = [
  { status: 'CREATED', title: 'Created' },
  { status: 'STOCK_VERIFIED', title: 'Stock Verified' },
  { status: 'APPROVED', title: 'Approved' },
  { status: 'SHIPPED', title: 'Shipped' },
  { status: 'COMPLETED', title: 'Completed' },
]

const currentStepIndex = computed(() => {
  if (props.currentStatus === 'CANCELLED') return -1
  return steps.findIndex(step => step.status === props.currentStatus)
})

const showVerifyButton = computed(() => {
  // Don't show button if order is cancelled or completed
  if (props.currentStatus === 'CANCELLED' || props.currentStatus === 'COMPLETED') return false
  return props.editable
})

const showCancelButton = computed(() => {
  // Show cancel button only for CREATED, STOCK_VERIFIED, and APPROVED steps
  const cancelableStatuses = ['CREATED', 'STOCK_VERIFIED', 'APPROVED']
  return cancelableStatuses.includes(props.currentStatus)
})

const getStepIcon = (status: OrderStatus) => {
  const iconMap: Record<OrderStatus, any> = {
    CREATED: h(FileOutlined),
    STOCK_VERIFIED: h(CheckCircleOutlined),
    APPROVED: h(SafetyCertificateOutlined),
    SHIPPED: h(RocketOutlined),
    COMPLETED: h(CheckSquareOutlined),
    CANCELLED: h(CloseCircleOutlined),
  }
  return iconMap[status]
}

const getStepStatus = (index: number) => {
  if (props.currentStatus === 'CANCELLED') return 'error'
  if (index < currentStepIndex.value) return 'finish'
  if (index === currentStepIndex.value) return 'process'
  return 'wait'
}

const getStepDescription = (index: number) => {
  if (props.currentStatus === 'CANCELLED') return 'Cancelled'
  if (index < currentStepIndex.value) return 'Completed'
  if (index === currentStepIndex.value) return 'In progress'
  return 'Pending'
}

const getVerifyButtonText = () => {
  if (props.currentStatus === 'CREATED') return 'Stock Verified'
  if (props.currentStatus === 'STOCK_VERIFIED') return 'Approved'
  if (props.currentStatus === 'APPROVED') return 'Shipped'
  if (props.currentStatus === 'SHIPPED') return 'Completed'
  return 'Verified'
}

const verifyCurrentStep = () => {
  verificationLoading.value = true
  
  // Determine the next status
  let nextStatus: OrderStatus = 'COMPLETED'
  
  if (props.currentStatus === 'CREATED') nextStatus = 'STOCK_VERIFIED'
  else if (props.currentStatus === 'STOCK_VERIFIED') nextStatus = 'APPROVED'
  else if (props.currentStatus === 'APPROVED') nextStatus = 'SHIPPED'
  else if (props.currentStatus === 'SHIPPED') nextStatus = 'COMPLETED'
  
  // Simulate API call
  setTimeout(() => {
    emit('status-change', nextStatus)
    verificationLoading.value = false
  }, 500)
}

const cancelOrder = () => {
  emit('status-change', 'CANCELLED')
}
</script>

<style scoped>
.order-steps {
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.steps-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 12px;
}

.steps-header h3 {
  margin: 0;
  color: #262626;
  font-weight: 600;
  font-size: 16px;
}

.verify-action {
  display: flex;
  gap: 12px;
  align-items: center;
}

.verify-btn, .cancel-btn {
  height: 32px;
  font-size: 12px;
}

/* Custom styles for Ant Design Steps with smaller fonts and rounded icons */
.custom-steps {
  padding: 12px 4px;
  position: relative;
}

.custom-steps :deep(.ant-steps-item) {
  position: relative;
}

.custom-steps :deep(.ant-steps-item.step-finished) {
  background-color: #f6ffed;
  border-radius: 8px;
  padding: 6px;
  margin: -6px -6px -6px -12px;
}

.custom-steps :deep(.ant-steps-item.step-finished .ant-steps-item-container) {
  background-color: #f6ffed;
  border-radius: 6px;
  padding: 2px;
}

/* Smaller font sizes */
.custom-steps :deep(.ant-steps-item-title) {
  font-size: 12px !important;
  line-height: 1.3;
  font-weight: 500;
}

.custom-steps :deep(.ant-steps-item-description) {
  font-size: 11px !important;
  line-height: 1.2;
  margin-top: 2px;
}
.custom-steps :deep(.ant-steps-item-process .ant-steps-item-description) {
  color: #1890ff !important;
}
.custom-steps :deep(.ant-step-item.step-processing .ant-steps-item-description){
  color: #1890ff !important;
}

.custom-steps :deep(.ant-steps-item.step-finished .ant-steps-item-title) {
  color: #389e0d !important;
  font-weight: 600;
}

.custom-steps :deep(.ant-steps-item.step-finished .ant-steps-item-description) {
  color: #52c41a !important;
}

/* Rounded icon backgrounds */
.custom-steps :deep(.ant-steps-item-icon) {
  border-radius: 50% !important;
  width: 28px !important;
  height: 28px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.custom-steps :deep(.ant-steps-item-icon .ant-steps-icon) {
  font-size: 14px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  top: 0 !important;
  transform: none !important;
}

.custom-steps :deep(.ant-steps-item.step-finished .ant-steps-item-icon) {
  background-color: #52c41a !important;
  border-color: #52c41a !important;
}

.custom-steps :deep(.ant-steps-item.step-finished .ant-steps-item-icon .ant-steps-icon) {
  color: white !important;
}

.custom-steps :deep(.ant-steps-item-finish .ant-steps-item-icon) {
  background-color: #52c41a;
  border-color: #52c41a;
}

.custom-steps :deep(.ant-steps-item-finish .ant-steps-item-icon .ant-steps-icon) {
  color: white;
}

.custom-steps :deep(.ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title) {
  color: #389e0d;
  font-weight: 600;
}

.custom-steps :deep(.ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title::after) {
  background-color: #52c41a;
}

.custom-steps :deep(.ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-description) {
  color: #52c41a;
}

.custom-steps :deep(.ant-steps-item-process .ant-steps-item-icon) {
  background-color: #1890ff;
  border-color: #1890ff;
}

.custom-steps :deep(.ant-steps-item-process .ant-steps-item-icon .ant-steps-icon) {
  color: white;
}

.custom-steps :deep(.ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title) {
  color: #1890ff !important;
  font-weight: 600;
}

.custom-steps :deep(.ant-steps-item-wait .ant-steps-item-icon) {
  background-color: #f5f5f5;
  border-color: #d9d9d9;
}

.custom-steps :deep(.ant-steps-item-wait .ant-steps-item-icon .ant-steps-icon) {
  color: #bfbfbf;
}

.custom-steps :deep(.ant-steps-item-wait > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title) {
  color: #8c8c8c;
}

.custom-steps :deep(.ant-steps-item-wait > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-description) {
  color: #8c8c8c;
}

.custom-steps :deep(.ant-steps-item-error .ant-steps-item-icon) {
  background-color: #fff2f0;
  border-color: #ffccc7;
}

.custom-steps :deep(.ant-steps-item-error .ant-steps-item-icon .ant-steps-icon) {
  color: #ff4d4f;
}

.custom-steps :deep(.ant-steps-item-error > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title) {
  color: #ff4d4f;
}

.custom-steps :deep(.ant-steps-item-error > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-description) {
  color: #ff4d4f;
}

/* Connector line styling */
.custom-steps :deep(.ant-steps-item-finish .ant-steps-item-tail::after) {
  background-color: #52c41a;
  height: 2px;
}

.custom-steps :deep(.ant-steps-item-process .ant-steps-item-tail::after) {
  background-color: #1890ff;
  height: 2px;
}

.custom-steps :deep(.ant-steps-item-wait .ant-steps-item-tail::after) {
  background-color: #f0f0f0;
  height: 1px;
}

/* COMPLETELY REMOVE ALL HOVER EFFECTS */
.custom-steps :deep(.ant-steps-item) {
  cursor: default !important;
}

.custom-steps :deep(.ant-steps-item):hover {
  background-color: transparent !important;
}

.custom-steps :deep(.ant-steps-item-container):hover {
  background-color: transparent !important;
}

.custom-steps :deep(.ant-steps-item-title):hover {
  color: inherit !important;
}

.custom-steps :deep(.ant-steps-item-description):hover {
  color: inherit !important;
}

.custom-steps :deep(.ant-steps-item-icon):hover {
  background-color: inherit !important;
  border-color: inherit !important;
}

.custom-steps :deep(.ant-steps-item-icon .ant-steps-icon):hover {
  color: inherit !important;
}

.custom-steps :deep(.ant-steps-item-tail):hover::after {
  background-color: inherit !important;
}

/* Remove any pointer events that might trigger hover */
.custom-steps :deep(.ant-steps-item *),
.custom-steps :deep(.ant-steps-item-container *),
.custom-steps :deep(.ant-steps-item-content *),
.custom-steps :deep(.ant-steps-item-icon *) {
  pointer-events: none !important;
}

/* Responsive design */
@media (max-width: 768px) {
  .steps-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .verify-action {
    width: 100%;
    justify-content: space-between;
  }
  
  .custom-steps {
    flex-direction: column;
  }
  
  .custom-steps :deep(.ant-steps-item) {
    margin-bottom: 12px;
  }
  
  .custom-steps :deep(.ant-steps-item-tail) {
    left: 14px;
    top: 0;
    height: 100%;
    width: 2px;
  }
  
  .custom-steps :deep(.ant-steps-item.step-finished) {
    margin: -6px -6px -6px -10px;
  }
  
  .custom-steps :deep(.ant-steps-item-content) {
    margin-left: 28px;
  }
  
  .custom-steps :deep(.ant-steps-item-icon) {
    width: 24px !important;
    height: 24px !important;
  }
  
  .custom-steps :deep(.ant-steps-item-icon .ant-steps-icon) {
    font-size: 12px !important;
  }
  
  .custom-steps :deep(.ant-steps-item-title) {
    font-size: 11px !important;
  }
  
  .custom-steps :deep(.ant-steps-item-description) {
    font-size: 10px !important;
  }
}
</style>