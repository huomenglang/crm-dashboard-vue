<template>
  <div class="order-details" v-if="order">
    <div class="pt-3 pl-3">
     
      <div class="flex gap-x-0.5 justify-center items-center">
        <ReceiptText class="text-gray-600 w-5 h-5" />

        <h1 class="!mt-3 text-[17px] text-gray-600">
          <span class="">No:</span> {{ order.orderNo }}
        </h1>
      </div>

      <span class=" text-[10px] flex flex-col justify-center items-start -mt-2 text-gray-500">
        <b>Customer: {{ order.customer.name }}</b>
        <b>Phone: {{ order.customer.phone }}</b>
        <b> Ordered At: {{ formatDate(order.createdAt) }} </b>
      </span>
    </div>

    <order-steps
      :current-status="order.status"
      @status-change="handleStatusChange"
      :editable="isEditable"
      class="order-steps-container"
    />

    <div class="details-content">
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
        <h3 class="text-center text-gray-500 font-semibold text-[15px]">Order Summary</h3>
        <div class="summary-grid">
          <div class="summary-item text-gray-500 font-medium text-[13px]">
            <span class=" text-gray-500 text-[13px]">Subtotal:</span>
            <span class="summary-value"
              >${{ calculateSubtotal().toFixed(2) }}</span
            >
          </div>
          <div class="summary-item" >
            <span class="text-gray-500 font-medium text-[13px]">Discount ({{ order.discount }}%):</span>
            <span class="summary-value discount text-[13px]"
              >-${{ calculateDiscount().toFixed(2) }}</span
            >
          </div>
          <div class="summary-item" >
            <span class="text-gray-500 font-medium text-[13px]">Tax:</span>
            <span class="summary-value text-[13px]">${{order?.tax? order?.tax.toFixed(2):0 }}</span>
          </div>
         
          <div class="summary-item total text-[13px]">
            <span class="text-gray-500 font-medium text-[13px]">Total Amount:</span>
            <span class="summary-value total"
              >${{ order.totalAmount.toFixed(2) }}</span
            >
          </div>
        </div>
      </div>

      <a-divider class="section-divider" />

      <div class="pb-6">
        <div class="audit-grid border-[1px] border-dashed rounded-lg border-gray-300 p-2">
             <h3 class=" text-center text-gray-500 text-[15px]">Order History</h3>
          <div class="audit-item" v-if="order.createdBy">
            <user-outlined class="audit-icon !text-blue-500" />
            <div class="audit-details">
              <span class=" text-gray-700 text-[13px] font-semibold">Order Created</span>
              <span class=" text-gray-500 text-[12px] font-medium">by {{ order.createdBy }}</span>
              <span class="text-[11px] text-gray-500">{{ formatDate(order.createdAt) }}</span>
            </div>
          </div>
          <div class="audit-item" v-if="order.approvedBy">
            <check-circle-outlined class="audit-icon approved" />
            <div class="audit-details">
              <span class=" text-gray-700 text-[13px] font-semibold">Order Approved</span>
              <span class=" text-gray-500 text-[12px] font-medium">by {{ order.approvedBy }}</span>
              <span class="text-[11px] text-gray-500">{{ formatDate(order.updatedAt) }}</span>
            </div>
          </div>
          <div class="audit-item" v-if="order.shippedBy">
            <car-outlined class="audit-icon shipped" />
            <div class="audit-details">
              <span class=" text-gray-700 text-[13px] font-semibold">Order Shipped</span>
              <span class=" text-gray-500 text-[12px] font-medium">by {{ order.shippedBy }}</span>
              <span class="text-[11px] text-gray-500">{{ formatDate(order.updatedAt) }}</span>
            </div>
          </div>
          <div class="audit-item" v-if="order.completedBy">
            <check-circle-outlined class="audit-icon completed" />
            <div class="audit-details">
              <span class=" text-gray-700 text-[13px] font-semibold">Order Completed</span>
              <span class=" text-gray-500 text-[12px] font-medium">by {{ order.completedBy }}</span>
              <span class="text-[11px] text-gray-500">{{ formatDate(order.updatedAt) }}</span>
            </div>
          </div>
          <div class="audit-item" v-if="order.cancelledBy">
            <close-circle-outlined class="audit-icon cancelled" />
            <div class="audit-details">
              <span class=" text-gray-700 text-[13px] font-semibold">Order Cancelled</span>
              <span class=" text-gray-500 text-[12px] font-medium">by {{ order.cancelledBy }}</span>
              <span class="text-[11px] text-gray-500">{{ formatDate(order.updatedAt) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  SaveOutlined,
  PrinterOutlined,
  UserOutlined,
  CheckCircleOutlined,
  CarOutlined,
  CloseCircleOutlined,
  ContainerFilled,
} from "@ant-design/icons-vue";
import type { Order, OrderProduct, OrderStatus } from "./order";
import OrderSteps from "./OrderSteps.vue";
import TableProduct from "./TableProduct.vue";
import {
  BadgeInfoIcon,
  CalculatorIcon,
  CalendarCheck,
  ContainerIcon,
  MailCheckIcon,
  PhoneCallIcon,
  ReceiptIcon,
  ReceiptText,
} from "lucide-vue-next";

const props = defineProps<{
  order: Order;
}>();

const emit = defineEmits<{
  (e: "status-change", status: OrderStatus): void;
  (e: "product-update", products: OrderProduct[]): void;
}>();

const isEditable = computed(() => {
  return props.order.status === "CREATED";
});

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const calculateSubtotal = () => {
  if (!props.order) return 0;
  return props.order.products.reduce(
    (sum: any, product: any) => sum + product.subtotal,
    0
  );
};

const calculateDiscount = () => {
  if (!props.order || !props.order.discount) return 0;
  const subtotal = calculateSubtotal();
  return subtotal * (props.order.discount / 100);
};

const handleStatusChange = (newStatus: OrderStatus) => {
  emit("status-change", newStatus);
};

const handleSave = () => {

  console.log("Saving changes...");
};
</script>

<style scoped>
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
  margin: 10px 0;
}

.details-content {
  padding: 0 8px;
}

.content-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 15px;
  font-weight: 600;
  text-align: center;
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
  padding: 3px 0;
  
}

.summary-label {
  font-size: 14px;
  /* color: #595959; */
}

.summary-value {
  font-size: 13px;
  color: #373737;
  font-weight: 700;
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

/* Responsive adjustments */
@media (max-width: 768px) {
  .details-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .header-actions {
    flex-direction: column;
    width: 100%;
  }

  .header-actions .ant-btn {
    width: 100%;
    margin-bottom: 8px;
  }
}
</style>
