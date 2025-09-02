<template>
  <div class="quotation-detail" v-if="quotation">
    <h1 class="text-gray-700 font-bold text-[19px] text-center">QUOTATION</h1>
    <!-- Header Section -->
    <div class="header-section px-3">
      <div class="quotation-info">
        <div class="flex flex-col">
          <span class="text-[12px] font-medium text-gray-600"
            >Quote No: <span class="">{{ quotation.quoteNo }}</span>
          </span>
          <span class="text-[12px] font-medium text-gray-600"
            >Date:
            <span class="tracking-wider">{{
              formatDate(quotation.createdAt)
            }}</span></span
          >
        </div>
      </div>

      <!-- Customer Information -->
      <div class="customer-section">
        <div class="flex flex-col -mt-2">
          <span class="customer-contact">{{ quotation.customer.name }}</span>
          <span v-if="quotation.customer.phone" class="customer-contact">
            {{ quotation?.customer?.phone }}</span
          >
        </div>
      </div>
    </div>

    <!-- Products Table -->
    <div class="products-section mt-4">
      <!-- <h3 class="products-title">PRODUCTS</h3> -->
      <div class="table-container">
        <table class="clean-products-table">
          <thead>
            <tr>
              <th class="text-left">Product</th>
              <th class="text-left">Unit</th>
              <th class="text-right">Discount</th>
              <th class="text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in quotation.products" :key="index">
              <td class="product-name text-[11px]">
                {{ product.product.name }}
              </td>
              <td class="unit-details">
                <div
                  v-for="(unit, unitIndex) in product.units"
                  :key="unitIndex"
                  class="unit-row tracking-wide"
                >
                  {{ unit.unitName }} ({{ unit.quantity }} × ${{
                    unit.price.toFixed(2)
                  }})
                </div>
              </td>
              <td class="text-right text-[12px]">
                {{ product.discount || 0 }}%
              </td>
              <td class="text-right text-[12px]">
                ${{ product.subtotal.toFixed(2) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Quotation Summary -->
    <div class="flex gap-x-3 mt-3">
      <div class="flex-1 mr-3">
        <div class="border border-gray-200 rounded-xl px-4 py-2 h-[110px]">
          <div v-if="quotation.note">
            <p class="text-[12px]"><b>Note: </b> {{ quotation.note }}</p>
          </div>
        </div>
      </div>
      <div class="flex-1 -mt-1">
        <span class="font-bold">Summary</span>
        <div class="">
          <div class="summary-item flex justify-between">
            <span class="summary-label">Subtotal:</span>
            <span class="summary-value"
              >${{ calculateSubtotal().toFixed(2) }}</span
            >
          </div>
          <div class="summary-item flex justify-between">
            <span class="summary-label">Discount:</span>
            <span class="summary-value">${{ quotation.discount }}</span>
          </div>
          <div class="summary-item flex justify-between">
            <span class="summary-label">Tax ({{ quotation.tax }}%):</span>
            <span class="summary-value">${{ calculateTax().toFixed(2) }}</span>
          </div>
          <div class="summary-item flex justify-between">
            <span class="summary-label">Status:</span>
            <span class="summary-value">
              <a-tag
                :color="getStatusColor(quotation.status)"
                class="status-tag"
              >
                {{ quotation.status }}
              </a-tag>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex gap-x-2 mt-3 justify-end " v-if="quotation.status === QuoteStatus.PENDING">
      <a-button type="primary" class="gap-x-0.5 !flex justify-center items-center" danger  @click="dropQuotation">
        <XIcon class="w-4 h-4"/>
        Drop
       
      </a-button>
        <a-button type="primary" class="gap-x-0.5 !flex justify-center items-center" @click="approveQuotation">
          <CheckCircle class="h-3 w-3"/>
           <span>Approve</span>
            
      </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { message } from "ant-design-vue";
import { getAll, updateOne } from "@/data/ls_data";
import { KEY } from "@/data/Key";
import { QuoteStatus, type Quotation } from "@/components/pages/quotation/type";
import { CheckCheck, CheckCheckIcon, CheckCircle, XCircleIcon, XIcon } from "lucide-vue-next";

const props = defineProps<{
  quotation: Quotation;
}>();

function getStatusColor(status: QuoteStatus) {
  const statusColors: Record<QuoteStatus, string> = {
    [QuoteStatus.PENDING]: "orange",
    [QuoteStatus.APPROVED]: "green",
    [QuoteStatus.DROP]: "red",
  };

  return statusColors[status] || "default";
}

function formatDate(dateString?: string) {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString();
}

function calculateSubtotal() {
  return props.quotation.products.reduce(
    (sum, product) => sum + product.subtotal,
    0
  );
}

function calculateTax() {
  const subtotal = calculateSubtotal();
  const afterDiscount = subtotal - calculateDiscount();
  return afterDiscount * ((props.quotation.tax || 0) / 100);
}

function calculateDiscount() {
  const subtotal = calculateSubtotal();
  return subtotal * ((props.quotation.discount || 0) / 100);
}

async function approveQuotation() {
  try {
    const quotations = (getAll(KEY.QUOTATION)) || [];
    const updatedQuotations = quotations.map((q: Quotation) => {
      if (q.id === props.quotation.id) {
        return {
          ...q,
          status: QuoteStatus.APPROVED,
          updatedAt: new Date().toISOString(),
          approvedBy: "Current User",
        };
      }
      return q;
    });

    await updateOne(props.quotation.id, updatedQuotations, KEY.QUOTATION);
    message.success("Quotation approved successfully");
  } catch (error) {
    message.error("Failed to approve quotation");
  }
}

async function dropQuotation() {
  try {
    const quotations = (await getAll(KEY.QUOTATION)) || [];
    const updatedQuotations = quotations.map((q: Quotation) => {
      if (q.id === props.quotation.id) {
        return {
          ...q,
          status: QuoteStatus.DROP,
          updatedAt: new Date().toISOString(),
          droppedBy: "Current User",
        };
      }
      return q;
    });

    await updateOne(props.quotation.id, updatedQuotations, KEY.QUOTATION);
    message.success("Quotation dropped successfully");
  } catch (error) {
    message.error("Failed to drop quotation");
  }
}
</script>

<style scoped>
.quotation-detail {
  /* padding: 5px; */
  font-family: "kantumruy", sans-serif;
  color: #444444;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: -20px;
  /* margin-bottom: 10px; */
  /* flex-shrink: 0; */
}

.quotation-info {
  flex: 1;
}

.quote-details {
  margin-bottom: 5px;
}


.customer-section {
  text-align: right;
  flex: 1;
}

.customer-title {
  margin: 0 0 8px 0;
  font-size: 12px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.customer-details {
  margin-top: 5px;
}

.customer-name {
  font-weight: 600;
  margin-bottom: 4px;
  font-size: 14px;
  color: #333;
}

.customer-contact,
.customer-address {
  margin: 2px 0;
  font-size: 12px;
  color: #666;
  line-height: 1.3;
}

.products-section {
  flex: 1;
  margin-bottom: 5px;
  min-height: 0; /* Important for flex child to respect overflow */
}

.products-title {
  color: #333;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.table-container {
  height: 60vh; /* 70% of viewport height */
  overflow-y: auto;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
}

.clean-products-table {
  width: 100%;
  border-collapse: collapse;
}

.clean-products-table th {
  background-color: #fafafa;
  padding: 12px 10px;
  font-weight: 600;
  border-bottom: 1px solid #e8e8e8;
  position: sticky;
  top: 0;
  z-index: 1;
}

.clean-products-table td {
  padding: 7px;
  border-bottom: 1px solid #e8e8e8;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

.product-name {
  font-weight: 600;
  min-width: 120px;
}

.unit-details {
  font-size: 11px;
}

.unit-row {
  padding: 2px 0;
}

.unit-row:not(:last-child) {
  border-bottom: 1px dashed #f0f0f0;
  /* margin-bottom: 4px; */
}

.summary-items {
  display: flex;
  flex-direction: column;
  gap: 0px 10px;
  max-width: 300px;
  /* margin-left: auto; */
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 2px 0;
}

.summary-label {
  /* color: #666; */
  font-size: 12px;
}

.summary-value {
  /* color: #333; */
  font-weight: 700;
  font-size: 12px;

  /* font-size: 14px; */
}

.status-tag {
  margin: 0;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 20px 0;
  flex-shrink: 0;
}

.note-section {
  margin-top: 20px;
  flex-shrink: 0;
}

.note-title {
  color: #333;
  margin-bottom: 10px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.note-content {
  background: #f9f9f9;
  padding: 12px;
  border-radius: 4px;
  color: #666;
  font-size: 13px;
  line-height: 1.5;
}
</style>
