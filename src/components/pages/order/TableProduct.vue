<template>
  <a-table 
    :data-source="products" 
    :columns="columns"
    :pagination="false"
    row-key="product.productId"
    size="small"
    class="products-table"
  >
    <template #bodyCell="{ column, record, index }">
      <template v-if="column.key === 'product'">
        <div class="product-info">
          <div class="product-name">{{ record.product.name }}</div>
          <div class="product-sku">SKU: {{ record.product.sku }}</div>
        </div>
      </template>
      
      <template v-else-if="column.key === 'units'">
        <div class="units-container">
          <div v-for="unit in record.units" :key="unit.unitId" class="unit-item">
            <div class="unit-header">
              <span class="unit-name">{{ unit.unitName }}</span>
              <span class="unit-base">(Base: {{ unit.baseUnitQuantity }} {{ unit.baseUnitId }})</span>
            </div>
            <div class="unit-details">
              <span class="unit-quantity">{{ unit.quantity }} ×</span>
              <span class="unit-price">${{ unit.price.toFixed(2) }}</span>
              <span class="unit-subtotal">= ${{ unit.subtotal.toFixed(2) }}</span>
              
              <div class="unit-actions" v-if="editable">
                <a-button 
                  type="link" 
                  size="small" 
                  @click="editUnit(record, unit)"
                  class="action-btn"
                >
                  <edit-outlined />
                </a-button>
                <a-button 
                  v-if="record.units.length > 1" 
                  type="link" 
                  size="small" 
                  danger
                  @click="removeUnit(record, unit)"
                  class="action-btn"
                >
                  <delete-outlined />
                </a-button>
              </div>
            </div>
          </div>
        </div>
        
        <a-button 
          v-if="editable" 
          type="dashed" 
          size="small" 
          @click="addUnit(record)"
          class="add-unit-btn"
        >
          <plus-outlined />
          Add Unit
        </a-button>
      </template>
      
      <template v-else-if="column.key === 'discount'">
        <div class="discount-container">
          <a-input-number
            v-if="editable"
            v-model:value="record.discount"
            :min="0"
            :max="100"
            :step="1"
            addon-after="%"
            size="small"
            @change="updateProductDiscount(record)"
            class="discount-input"
          />
          <span v-else class="discount-value">{{ record.discount }}%</span>
        </div>
      </template>
      
      <template v-else-if="column.key === 'subtotal'">
        <div class="subtotal">${{ record.subtotal.toFixed(2) }}</div>
      </template>
      
      <template v-else-if="column.key === 'actions' && editable">
        <a-button 
          type="link" 
          danger 
          @click="removeProduct(index)"
          class="remove-product-btn"
        >
          <delete-outlined />
        </a-button>
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  EditOutlined, 
  DeleteOutlined, 
  PlusOutlined 
} from '@ant-design/icons-vue'
import type { OrderProduct, OrderUnit } from '../order/order'

const props = defineProps<{
  products: OrderProduct[]
  editable?: boolean
}>()

const emit = defineEmits<{
  (e: 'product-update', products: OrderProduct[]): void
}>()

const columns = [
  {
    title: 'Product',
    key: 'product',
    width: '30%',
  },
  {
    title: 'Units',
    key: 'units',
    width: '45%',
  },
  {
    title: 'Discount',
    key: 'discount',
    width: '12%',
  },
  {
    title: 'Subtotal',
    key: 'subtotal',
    width: '8%',
  },
  ...(props.editable ? [{
    title: '',
    key: 'actions',
    width: '5%',
  }] : []),
]

const editUnit = (product: OrderProduct, unit: OrderUnit) => {
  // In a real app, you would show a modal to edit the unit
  const newQuantity = prompt(`Enter new quantity for ${unit.unitName}:`, unit.quantity.toString())
  if (newQuantity !== null) {
    const quantity = parseInt(newQuantity)
    if (!isNaN(quantity) && quantity > 0) {
      unit.quantity = quantity
      unit.subtotal = unit.price * quantity
      updateProductSubtotal(product)
    }
  }
}

const addUnit = (product: OrderProduct) => {
  // In a real app, you would show a modal to add a new unit
  const newUnit: OrderUnit = {
    unitId: `UNIT-${Date.now()}`,
    unitName: 'New Unit',
    quantity: 1,
    price: 0,
    baseUnitId: 'UNIT-BASE',
    baseUnitQuantity: 1,
    subtotal: 0
  }
  
  product.units.push(newUnit)
  updateProductSubtotal(product)
}

const removeUnit = (product: OrderProduct, unit: OrderUnit) => {
  if (product.units.length <= 1) {
    alert('Cannot remove the only unit of a product. Remove the entire product instead.')
    return
  }
  
  product.units = product.units.filter((u:any) => u.unitId !== unit.unitId)
  updateProductSubtotal(product)
}

const removeProduct = (index: number) => {
  const newProducts = [...props.products]
  newProducts.splice(index, 1)
  emit('product-update', newProducts)
}

const updateProductDiscount = (product: OrderProduct) => {
  // Recalculate subtotal with discount
  const unitsSubtotal = product.units.reduce((sum:any, unit:any) => sum + unit.subtotal, 0)
  product.subtotal = unitsSubtotal * (1 - (product.discount || 0) / 100)
  emit('product-update', [...props.products])
}

const updateProductSubtotal = (product: OrderProduct) => {
  // Recalculate product subtotal
  const unitsSubtotal = product.units.reduce((sum:any, unit:any) => sum + unit.subtotal, 0)
  product.subtotal = unitsSubtotal * (1 - (product.discount || 0) / 100)
  emit('product-update', [...props.products])
}
</script>

<style scoped>
.products-table :deep(.ant-table-thead > tr > th) {
  background-color: #fafafa;
  font-weight: 600;
  font-size: 12px;
  color: #595959;
  padding: 8px 12px;
}

.products-table :deep(.ant-table-tbody > tr > td) {
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.product-info {
  display: flex;
  flex-direction: column;
}

.product-name {
  font-weight: 500;
  font-size: 13px;
  color: #262626;
  margin-bottom: 2px;
}

.product-sku {
  font-size: 11px;
  color: #8c8c8c;
}

.units-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.unit-item {
  padding: 8px;
  background-color: #fafafa;
  border-radius: 4px;
  border: 1px solid #f0f0f0;
}

.unit-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
}

.unit-name {
  font-weight: 500;
  font-size: 12px;
  color: #262626;
}

.unit-base {
  font-size: 11px;
  color: #8c8c8c;
}

.unit-details {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.unit-quantity {
  font-size: 12px;
  color: #595959;
}

.unit-price {
  font-size: 12px;
  color: #1890ff;
}

.unit-subtotal {
  font-weight: 500;
  font-size: 12px;
  color: #389e0d;
}

.unit-actions {
  margin-left: auto;
  display: flex;
  gap: 4px;
}

.action-btn {
  height: 22px;
  width: 22px;
  min-width: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-unit-btn {
  margin-top: 8px;
  font-size: 12px;
}

.discount-container {
  display: flex;
  justify-content: center;
}

.discount-input {
  width: 80px;
}

.discount-value {
  font-size: 12px;
  color: #1890ff;
  font-weight: 500;
}

.subtotal {
  font-weight: 600;
  font-size: 12px;
  color: #389e0d;
  text-align: right;
}

.remove-product-btn {
  color: #ff4d4f;
  font-size: 14px;
}
</style>