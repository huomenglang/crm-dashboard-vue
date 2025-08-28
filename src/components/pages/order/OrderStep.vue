<template>
  <div class="mb-4">
    <a-steps
      :current="currentStepIndex"
      :status="stepStatus"
      size="small"
      direction="horizontal"
    >
      <a-step
        v-for="(step, idx) in steps"
        :key="idx"
        :title="step.title"
        
        @click="showStepInfo(step.code)"
        class="cursor-pointer"
      />
    </a-steps>

    <div
      v-if="activeStepInfo"
      class="mt-2 p-3 bg-gray-50 rounded shadow-sm text-sm"
    >
      <strong>{{ activeStepInfo.title }} Info:</strong>
      <div v-if="activeStepInfo.approvedBy">Approved By: {{ activeStepInfo.approvedBy }}</div>
      <div v-if="activeStepInfo.verifiedBy">Verified By: {{ activeStepInfo.verifiedBy }}</div>
      <div v-if="activeStepInfo.completedBy">Completed By: {{ activeStepInfo.completedBy }}</div>
      <div v-if="activeStepInfo.cancelledBy">Cancelled By: {{ activeStepInfo.cancelledBy }}</div>
      <div
        v-if="
          !activeStepInfo.approvedBy &&
          !activeStepInfo.verifiedBy &&
          !activeStepInfo.completedBy &&
          !activeStepInfo.cancelledBy
        "
      >
        No action yet
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { Order } from "./order";

const props = defineProps<{ order: Order }>();

// Map workflow codes to real titles
const workflowMapping = [
  { code: "CREATED", title: "Created" },
  { code: "STOCK_VERIFIED", title: "Stock Verified" },
  { code: "APPROVED", title: "Approved" },
  { code: "SHIPPED", title: "Shipped" },
  { code: "COMPLETED", title: "Completed" },
  { code: "CANCELLED", title: "Cancelled" },
];

// Steps array
const steps = computed(() => {
  if (props.order.status === "CANCELLED") {
    return workflowMapping.filter((s) => s.code === "CREATED" || s.code === "CANCELLED");
  }
  return workflowMapping.filter((s) => s.code !== "CANCELLED");
});

// Current step index
const currentStepIndex = computed(() =>
  steps.value.findIndex((s) => s.code === props.order.status)
);

// Step status for Ant Steps
const stepStatus = computed(() => {
  return props.order.status === "CANCELLED" ? "error" : "process";
});

// Active step info for click
const activeStepInfo = ref<Record<string, any> | null>(null);

const showStepInfo = (code: string) => {
  const info: Record<string, any> = { title: workflowMapping.find(s => s.code === code)?.title };
  if (code === "APPROVED") info.approvedBy = props.order.approvedBy;
  if (code === "STOCK_VERIFIED") info.verifiedBy = props.order.shippedBy;
  if (code === "COMPLETED") info.completedBy = props.order.completedBy;
  if (code === "CANCELLED") info.cancelledBy = props.order.cancelledBy;
  activeStepInfo.value = info;
};

// Description for each step
const stepDescription = (code: string) => {
  switch (code) {
    case "CREATED":
      return "Created";
    case "VERIFIED":
      return "Verified";
    case "APPROVED":
      return "Approved";
    case "SHIPPED":
      return "Shipped";
    case "COMPLETED":
      return "Completed";
    case "CANCELLED":
      return "Cancelled";
    default:
      return "";
  }
};
</script>

<style scoped>
.a-steps-item-title {
  font-weight: 500;
}
</style>
