<template>
  <div class="quotation-detail" v-if="quotation">
    <!-- Header Section -->
    <div class="header-section">
      <div class="quotation-info">
        <h1 class="quotation-title">QUOTATION</h1>
        <div class="quote-details">
          <p class="quote-no"><strong>Quote No:</strong> {{ quotation.quoteNo }}</p>
          <p class="quote-date"><strong>Date:</strong> {{ formatDate(quotation.createdAt) }}</p>
        </div>
      </div>
      
      <!-- Customer Information -->
      <div class="customer-section">
        <h3 class="customer-title">BILL TO:</h3>
        <div class="customer-details">
          <p class="customer-name">{{ quotation.customer.name }}</p>
          <p v-if="quotation.customer.email" class="customer-contact">{{ quotation.customer.email }}</p>
          <p v-if="quotation.customer.phone" class="customer-contact">{{ quotation.customer.phone }}</p>
          <p v-if="quotation.customer.address" class="customer-address">{{ quotation.customer.address }}</p>
        </div>
      </div>
    </div>

    <a-divider />

    <!-- Products Table -->
    <div class="products-section">
      <h3 class="products-title">PRODUCTS & SERVICES</h3>
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
              <td class="product-name">{{ product.product.name }}</td>
              <td class="unit-details">
                <div v-for="(unit, unitIndex) in product.units" :key="unitIndex" class="unit-row">
                  {{ unit.unitName }} ({{ unit.quantity }} × ${{ unit.price.toFixed(2) }})
                </div>
              </td>
              <td class="text-right">{{ product.discount || 0 }}%</td>
              <td class="text-right">${{ product.subtotal.toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Quotation Summary -->
    <div class="flex flex-col">
      <h3 class="">Quotation Summary</h3>
      <div class="summary-items">
        <div class="summary-item">
          <span class="summary-label">Subtotal:</span>
          <span class="summary-value">${{ calculateSubtotal().toFixed(2) }}</span>
        </div>
        <div class="summary-item" v-if="quotation.tax">
          <span class="summary-label">Tax ({{ quotation.tax }}%):</span>
          <span class="summary-value">${{ calculateTax().toFixed(2) }}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Status:</span>
          <span class="summary-value">
            <a-tag :color="getStatusColor(quotation.status)" class="status-tag">
              {{ quotation.status }}
            </a-tag>
          </span>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="action-buttons" v-if="quotation.status === QuoteStatus.PENDING">
      <a-button type="primary" size="large" @click="approveQuotation">
        Approve
      </a-button>
      <a-button type="primary" danger size="large" @click="dropQuotation">
        Drop
      </a-button>
    </div>

    <!-- Note Section -->
    <div class="note-section" v-if="quotation.note">
      <a-divider />
      <h3 class="note-title">NOTES</h3>
      <p class="note-content">{{ quotation.note }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { message } from 'ant-design-vue';
import { getAll, updateOne } from '@/data/ls_data';
import { KEY } from '@/data/Key';
import { QuoteStatus, type Quotation } from '@/components/pages/quotation/type';

const props = defineProps<{
  quotation: Quotation;
}>();

function getStatusColor(status: QuoteStatus) {
  const statusColors: Record<QuoteStatus, string> = {
    [QuoteStatus.PENDING]: 'orange',
    [QuoteStatus.APPROVED]: 'green',
    [QuoteStatus.DROP]: 'red'
  };
  
  return statusColors[status] || 'default';
}

function formatDate(dateString?: string) {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString();
}

function calculateSubtotal() {
  return props.quotation.products.reduce((sum, product) => sum + product.subtotal, 0);
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
    const quotations = await getAll(KEY.QUOTATION) || [];
    const updatedQuotations = quotations.map((q: Quotation) => {
      if (q.id === props.quotation.id) {
        return { 
          ...q, 
          status: QuoteStatus.APPROVED, 
          updatedAt: new Date().toISOString(),
          approvedBy: 'Current User'
        };
      }
      return q;
    });
    
   await updateOne(props.quotation.id,updatedQuotations,KEY.QUOTATION);
    message.success('Quotation approved successfully');
  } catch (error) {
    message.error('Failed to approve quotation');
  }
}

async function dropQuotation() {
  try {
    const quotations = await getAll(KEY.QUOTATION) || [];
    const updatedQuotations = quotations.map((q: Quotation) => {
      if (q.id === props.quotation.id) {
        return { 
          ...q, 
          status: QuoteStatus.DROP, 
          updatedAt: new Date().toISOString(),
          droppedBy: 'Current User'
        };
      }
      return q;
    });
    
    await updateOne(props.quotation.id,updatedQuotations,KEY.QUOTATION);
    message.success('Quotation dropped successfully');
  } catch (error) {
    message.error('Failed to drop quotation');
  }
}
</script>

<style scoped>
.quotation-detail {
  padding: 20px;
  font-family: 'Arial', sans-serif;
  color: #333;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
  flex-shrink: 0;
}

.quotation-info {
  flex: 1;
}

.quotation-title {
  color: #333;
  margin: 0 0 10px 0;
  font-size: 24px;
  font-weight: 600;
}

.quote-details {
  margin-bottom: 10px;
}

.quote-no, .quote-date {
  margin: 3px 0;
  font-size: 13px;
  color: #666;
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

.customer-contact, .customer-address {
  margin: 2px 0;
  font-size: 12px;
  color: #666;
  line-height: 1.3;
}

.products-section {
  flex: 1;
  margin-bottom: 20px;
  min-height: 0; /* Important for flex child to respect overflow */
}

.products-title {
  color: #333;
  margin-bottom: 12px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.table-container {
  height: 70vh; /* 70% of viewport height */
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
  padding: 10px;
  border-bottom: 1px solid #e8e8e8;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

.product-name {
  font-weight: 500;
  min-width: 120px;
}

.unit-details {
  font-size: 13px;
}

.unit-row {
  padding: 4px 0;
}

.unit-row:not(:last-child) {
  border-bottom: 1px dashed #f0f0f0;
  margin-bottom: 4px;
}

.summary-section {
  /* margin: 20px 0; */
  /* flex-shrink: 0; */
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
  font-size: 14px;
}

.summary-value {
  /* color: #333; */
  font-weight: 500;
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