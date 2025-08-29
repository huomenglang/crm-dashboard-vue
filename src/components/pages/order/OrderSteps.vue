<template>
  <div class="order-steps">
    <div class="steps-header">
      <h3>Order Progress</h3>
      
      <!-- Single Verify Button -->
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
    
    <div class="steps-container">
      <div 
        v-for="(step, index) in steps" 
        :key="step.status"
        class="step"
        :class="getStepStatusClass(index)"
      >
        <div class="step-content">
          <div class="step-icon-container">
            <component :is="getStepIcon(step.status)" class="step-icon" />
          </div>
          <div class="step-info">
            <div class="step-title">{{ step.title }}</div>
            <div class="step-description">{{ getStepDescription(index) }}</div>
          </div>
        </div>
        
        <div v-if="index < steps.length - 1" class="step-connector"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  FileAddFilled, 
  CheckCircleFilled, 
  SafetyCertificateFilled,
  RocketFilled,
  CheckSquareFilled,
  CloseCircleFilled
} from '@ant-design/icons-vue'
import { computed, ref } from 'vue'
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
    CREATED: FileAddFilled,
    STOCK_VERIFIED: CheckCircleFilled,
    APPROVED: SafetyCertificateFilled,
    SHIPPED: RocketFilled,
    COMPLETED: CheckSquareFilled,
    CANCELLED: CloseCircleFilled,
  }
  return iconMap[status]
}

const getStepStatusClass = (index: number) => {
  if (props.currentStatus === 'CANCELLED') return 'cancelled'
  if (index < currentStepIndex.value) return 'completed'
  if (index === currentStepIndex.value) return 'current'
  return 'pending'
}

const getStepDescription = (index: number) => {
  if (props.currentStatus === 'CANCELLED') return 'Cancelled'
  if (index < currentStepIndex.value) return 'Completed'
  if (index === currentStepIndex.value) return 'Current'
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
}

.verify-action {
  display: flex;
  gap: 12px;
  align-items: center;
}

.verify-btn, .cancel-btn {
  height: 32px;
}

.steps-container {
  display: flex;
  justify-content: space-between;
  position: relative;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
  z-index: 2;
}

.step:last-child {
  flex: 0;
}

.step-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.step-icon-container {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.step.completed .step-icon-container {
  background-color: #f6ffed;
  border: 1px solid #b7eb8f;
  color: #52c41a;
}

.step.current .step-icon-container {
  background-color: #e6f7ff;
  border: 1px solid #91d5ff;
  color: #1890ff;
}

.step.pending .step-icon-container {
  background-color: #fafafa;
  border: 1px solid #d9d9d9;
  color: #bfbfbf;
}

.step.cancelled .step-icon-container {
  background-color: #fff2f0;
  border: 1px solid #ffccc7;
  color: #ff4d4f;
}

.step-icon {
  font-size: 18px;
}

.step-info {
  text-align: center;
}

.step-title {
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 4px;
  transition: all 0.3s ease;
}

.step.completed .step-title {
  color: #52c41a;
}

.step.current .step-title {
  color: #1890ff;
}

.step.pending .step-title {
  color: #bfbfbf;
}

.step.cancelled .step-title {
  color: #ff4d4f;
}

.step-description {
  font-size: 12px;
  color: #8c8c8c;
}

.step-connector {
  position: absolute;
  top: 20px;
  left: 50%;
  right: -50%;
  height: 2px;
  background-color: #f0f0f0;
  z-index: 1;
}

.step-connector::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0;
  background-color: #52c41a;
  transition: width 0.3s ease;
}

.step.completed .step-connector::after {
  width: 100%;
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
  
  .steps-container {
    flex-direction: column;
    gap: 24px;
  }
  
  .step {
    flex-direction: row;
    align-items: flex-start;
  }
  
  .step-content {
    flex-direction: row;
    align-items: center;
    gap: 12px;
    width: 100%;
  }
  
  .step-info {
    text-align: left;
    flex: 1;
  }
  
  .step-connector {
    position: absolute;
    top: 50%;
    bottom: -50%;
    left: 20px;
    width: 2px;
    height: auto;
  }
}
</style>