<template>
  <a-card
    class="order-card"
    :class="[{ selected: selected },getStatusColorWithBackground[order.status]]"
    
    @click="$emit('click', $event)"
    :bordered="false"
    :body-style="{ padding: '10px' }"
    
  >
    <div class="card-content">
      <div class="card-header">
        <div class="order-number" :class="[statusClasses[order.status]]">#{{ order.orderNo }}</div>
        <div
          class="flex justify-centers items-center ml-5 gap-x-0.5"
          :class="[statusClasses[order.status]]"
        >
          <component :is="getComponentByStatus(order.status)" class="w-5 h-5" />
          <div :color="getStatusColor(order.status)" class="status-tag">
            {{ formatStatus(order.status) }}
          </div>
        </div>
      </div>

      <!-- <div class="customer-info">
        <user-outlined class="info-icon" />
        <span class="customer-name">{{ order.customer.name }}</span>
      </div> -->

      <div class="order-info-grid">
        <div class="info-item">
          <BadgeDollarSign class="info-icon" :class="[statusClasses[order.status]]" />
          <span class="info-text font-bold !text-[15px]" :class="[statusClasses[order.status]]" >{{ order.totalAmount }}</span>
        </div>

        <div class="info-item">
          <CalendarCheck class="info-icon" :class="[statusClasses[order.status]]"  />
          <span class="info-text" :class="[statusClasses[order.status]]" >{{ formatDate(order.createdAt) }}</span>
        </div>

        <div class="info-item">
          <ShoppingCartIcon class="info-icon " :class="[statusClasses[order.status]]" />
          <span class="info-text" :class="[statusClasses[order.status]]" >{{ order.products.length }} items</span>
        </div>
      </div>

      <div class="card-footer">
        <div class="flex items-center gap-x-2 ">
             <div class="w-7 h-7 flex justify-center items-center rounded-full" :class="[getBgBoldClass[order.status]]" ><User class="w-4 h-4 text-white"  /></div>
             <div class="text-gray-500 flex flex-col" :class="[statusClasses[order.status]]" >
              <span class="font-bold text-[11px] -mt-1" :class="[statusClasses[order.status]]">{{ order.customer.name }}</span>
              <span class="text-[9px] -mt-1" :class="[statusClasses[order.status]]" >{{ order.customer.phone }}</span>
             </div>
        </div>
       
        <div class="view-details"><ArrowRightCircleIcon :class=[statusClasses[order.status]] /></div>
      </div>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import type { Order } from "./order";
import {
  ArrowRightCircleIcon,
  BadgeDollarSign,
  BookmarkCheckIcon,
  BoxIcon,
  CalendarCheck,
  CircleMinusIcon, ShieldCheck, ShipIcon, ShoppingCartIcon,
  User, VerifiedIcon
} from "lucide-vue-next";

defineProps<{
  order: Order;
  selected?: boolean;
}>();

defineEmits<{
  (e: "click", event: Event): void;
}>();

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatStatus = (status: string) => {
  return status
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
};

const getStatusColor = (status: string) => {
  const statusColors: Record<string, string> = {
    CREATED: "#fac16",
    STOCK_VERIFIED: "#1890ff",
    APPROVED: "#52c41a",
    SHIPPED: "#722ed1",
    COMPLETED: "#13c2c2",
    CANCELLED: "#f5222d",
  };
  return statusColors[status];
};
const getComponentByStatus = (status: string) => {
  const statusColors: Record<string, any> = {
    CREATED: BoxIcon,
    STOCK_VERIFIED: VerifiedIcon,
    APPROVED: BookmarkCheckIcon,
    SHIPPED: ShipIcon,
    COMPLETED: ShieldCheck,
    CANCELLED: CircleMinusIcon,
  };
  return statusColors[status];
};


const getStatusColorWithBackground:Record<string,string> = {
  CREATED: "!bg-orange-50",
  STOCK_VERIFIED: "!bg-blue-50",
  APPROVED: "!bg-sky-50",
  SHIPPED: "!bg-purple-50",
  COMPLETED:"!bg-green-50",
  CANCELLED:"!bg-red-50"
};

const statusClasses: Record<string, string> = {
  CREATED: "text-orange-500",
  STOCK_VERIFIED: "text-blue-500",
  APPROVED: "text-sky-500",
  SHIPPED: "text-purple-600",
  COMPLETED:"text-green-600",
  CANCELLED:"text-red-500"
}
const getBgBoldClass: Record<string, string> = {
  CREATED: "bg-orange-500",
  STOCK_VERIFIED: "bg-blue-500",
  APPROVED: "bg-sky-500",
  SHIPPED: "bg-purple-600",
  COMPLETED:"bg-green-600",
  CANCELLED:"bg-red-500"
}
</script>

<style scoped>
.order-card {
  /* border: 2px solid #efefef; */
  /* border-radius: 15px; */
  /* transition: all 0.2s ease; */
  /* background-color: #f9f9f9; */
}

.order-card.selected {
  /* border: 2px solid #1890ff; */
  /* background-color: #f6ffed; */
  /* box-shadow: 0 0 0 2px rgba(139, 139, 139, 0.2); */
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order-number {
  font-weight: 700;
  font-size: 12px;
  /* color: #535353; */
}

.status-tag {
  margin: 0;
  font-size: 10px;
  font-weight: 800;
  /* color: #8c8c8c; */
  /* padding: 2px 8px;
  border-radius: 4px; */
}

.customer-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.customer-name {
  font-size: 13px;
  /* color: #676767; */
  font-weight: 400;
}

.order-info-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.info-icon {
  width:15px;
  height:15px;
  /* color: #666666; */
}

.info-text {
  font-size: 12px;
  /* color: #6d6d6d; */
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
  /* color: #389e0d; */
}

.view-details {
  font-size: 12px;
  /* color: #1890ff; */
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
