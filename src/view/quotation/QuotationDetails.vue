<template>
  <div class="quotation-detail" v-if="quotation">
    <div class="detail-section">
      <h3>Customer Information</h3>
      <p><strong>Name:</strong> {{ quotation.customer.name }}</p>
      <p><strong>Email:</strong> {{ quotation.customer.email || 'N/A' }}</p>
      <p><strong>Phone:</strong> {{ quotation.customer.phone || 'N/A' }}</p>
    </div>
    
    <a-divider />
    
    <div class="detail-section">
      <h3>Products</h3>
      <a-table 
        :dataSource="quotation.products" 
        :columns="productColumns" 
        :pagination="false"
        size="small"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'product'">
            {{ record.product.name }} ({{ record.product.sku }})
          </template>
          
          <template v-else-if="column.key === 'units'">
            <div v-for="(unit, index) in record.units" :key="index" class="unit-detail">
              {{ unit.quantity }} {{ unit.unitName }} × ${{ unit.price.toFixed(2) }} = ${{ unit.subtotal.toFixed(2) }}
            </div>
          </template>
          
          <template v-else-if="column.key === 'discount'">
            {{ record.discount || 0 }}%
          </template>
          
          <template v-else-if="column.key === 'subtotal'">
            ${{ record.subtotal.toFixed(2) }}
          </template>
        </template>
      </a-table>
    </div>
    
    <a-divider />
    
    <div class="detail-section summary">
      <h3>Summary</h3>
      <div class="summary-row">
        <span>Subtotal:</span>
        <span>${{ calculateSubtotal().toFixed(2) }}</span>
      </div>
      <div class="summary-row">
        <span>Discount ({{ quotation.discount }}%):</span>
        <span>-${{ calculateDiscount().toFixed(2) }}</span>
      </div>
      <div class="summary-row">
        <span>Tax ({{ quotation.tax }}%):</span>
        <span>${{ calculateTax().toFixed(2) }}</span>
      </div>
      <a-divider />
      <div class="summary-row total">
        <span>Total Amount:</span>
        <span>${{ quotation.totalAmount.toFixed(2) }}</span>
      </div>
    </div>
    
    <a-divider />
    
    <div class="detail-section" v-if="quotation.note">
      <h3>Note</h3>
      <p>{{ quotation.note }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { Quotation } from '@/components/pages/quotation/type';

const props = defineProps<{
  quotation: Quotation;
}>();

const productColumns = [
  {
    title: 'Product',
    key: 'product',
    width: '30%'
  },
  {
    title: 'Units & Quantities',
    key: 'units',
    width: '40%'
  },
  {
    title: 'Discount',
    key: 'discount',
    width: '15%'
  },
  {
    title: 'Subtotal',
    key: 'subtotal',
    width: '15%'
  }
];

function calculateSubtotal() {
  return props.quotation.products.reduce((sum, product) => sum + product.subtotal, 0);
}

function calculateDiscount() {
  const subtotal = calculateSubtotal();
  return subtotal * (props?.quotation?.discount / 100);
}

function calculateTax() {
  const subtotal = calculateSubtotal();
  const afterDiscount = subtotal - calculateDiscount();
  return afterDiscount * (props?.quotation?.tax / 100);
}
</script>

<style scoped>
.quotation-detail {
  padding: 10px;
}

.detail-section {
  margin-bottom: 20px;
}

.detail-section h3 {
  margin-bottom: 12px;
  color: #262626;
}

.unit-detail {
  padding: 4px 0;
  border-bottom: 1px dashed #f0f0f0;
}

.unit-detail:last-child {
  border-bottom: none;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.summary-row.total {
  font-weight: bold;
  font-size: 16px;
}
</style>