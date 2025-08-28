<template>
  <div class="order-steps">
    <div class="steps-container">
      <div 
        v-for="(step, index) in steps" 
        :key="step.status"
        class="step"
        :class="[
          getStepStatusClass(index),
          { clickable: index <= currentStepIndex || index === currentStepIndex + 1 }
        ]"
        @click="handleStepClick(index, step.status)"
      >
        <div class="step-icon-container">
          <component :is="getStepIcon(step.status)" class="step-icon" />
        </div>
        <div class="step-content">
          <div class="step-title">{{ step.title }}</div>
          <div class="step-description">{{ getStepDescription(index) }}</div>
        </div>
        <div v-if="index < steps.length - 1" class="step-connector"></div>
      </div>
    </div>
    
    <!-- Cancelled status (handled separately) -->
    <div v-if="currentStatus === 'CANCELLED'" class="cancelled-status">
      <close-circle-filled class="cancelled-icon" />
      <span>Order Cancelled</span>
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
import type { OrderStatus } from './order'
import { computed } from 'vue';

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
  return props.editable && index === currentStepIndex.value + 1 
    ? 'Click to advance' 
    : 'Pending'
}

const getStepColor = (index: number) => {
  if (props.currentStatus === 'CANCELLED') return '#ff4d4f'
  if (index < currentStepIndex.value) return '#52c41a'
  if (index === currentStepIndex.value) return '#1890ff'
  return '#d9d9d9'
}

const handleStepClick = (index: number, status: OrderStatus) => {
  // Only allow clicking on the next step when editable
  if (props.editable && index === currentStepIndex.value + 1) {
    emit('status-change', status)
  }
  
  // Allow clicking on previous steps to view their details
  if (index <= currentStepIndex.value) {
    // Emit an event or handle viewing previous state details
    console.log(`Viewing details for step: ${status}`)
  }
}
</script>

<style scoped>
.order-steps {
  padding: 16px 0;
}

.steps-container {
  display: flex;
  justify-content: space-between;
  position: relative;
}

.step {
  display: flex;
  align-items: center;
  flex: 1;
  position: relative;
  z-index: 2;
}

.step:last-child {
  flex: 0;
}

.step-icon-container {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
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
  font-size: 16px;
}

.step-content {
  min-width: 0;
}

.step-title {
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 2px;
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
  flex: 1;
  height: 1px;
  background-color: #f0f0f0;
  margin: 0 12px;
  position: relative;
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

.step.clickable {
  cursor: pointer;
}

.step.clickable:hover .step-icon-container {
  transform: scale(1.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.cancelled-status {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: #fff2f0;
  border: 1px solid #ffccc7;
  border-radius: 6px;
  margin-top: 16px;
  color: #ff4d4f;
  font-weight: 500;
}

.cancelled-icon {
  font-size: 18px;
  margin-right: 8px;
}

/* Responsive design */
@media (max-width: 768px) {
  .steps-container {
    flex-direction: column;
    gap: 16px;
  }
  
  .step-connector {
    display: none;
  }
  
  .step {
    flex: none;
  }
}
</style>