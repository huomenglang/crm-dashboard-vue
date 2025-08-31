<script setup lang="ts">
import { ref } from "vue";
import type { Quotation, QuotationRequest } from "@/components/pages/quotation/quotation";
import QuotationDetail from "./QuotationDetail.vue";
import {
    DownOutlined,
  FilterOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons-vue";
import AntInput from "@/components/base/input/AntInput.vue";
import RoundButton from "@/components/base/button/RoundButton.vue";
import { message } from "ant-design-vue";
import QuotationForm from "@/components/pages/quotation/QuotationForm.vue";
import { useRouter } from "vue-router";
const router=useRouter()
const quotations = ref<Quotation[]>([
  {
    quotationId: "QUO-1001",
    customerId: "CUST-001",
    quotationDate: "2025-08-28",
    paymentMethod: "CASH",
    note: "Urgent delivery",
    status: "DRAFT",
    totalAmount: 66.0,
    products: [
      {
        productId: "PROD-001",
        productName: "Coca Cola",
        subtotal: 21.0,
        units: [
          {
            unitId: "UNIT-BOX",
            unitName: "Box",
            quantity: 2,
            unitPrice: 9.0,
            subtotal: 18.0,
            baseUnitId: "UNIT-BOTTLE",
            baseUnitQuantity: 20,
          },
          {
            unitId: "UNIT-BOTTLE",
            unitName: "Bottle",
            quantity: 3,
            unitPrice: 1.0,
            subtotal: 3.0,
            baseUnitId: "UNIT-BOTTLE",
            baseUnitQuantity: 3,
          },
        ],
      },
    ],
  },
]);


const showQuotationDetails = (quotation: Quotation) => {
  selectedQuotation.value = quotation;
  open.value = true;
};
const open = ref<boolean>(false);
const close = () => {
  open.value = false;
  selectedQuotation.value = null;
};


const changeStatus = (quotation: Quotation, status: Quotation["status"]) => {
  quotation.status = status;
};

// Handle search input
const handleSearch = (value: string) => {};
const isModalVisible = ref(false);
const isEdit = ref(false);
const selectedQuotation = ref<Quotation | null>(null);

const closeModal = () => {
  isModalVisible.value = false;
  selectedQuotation.value = null;
};

// Open create modal
const openCreateModal = () => {
  router.push('/quotation_action')
  // isEdit.value = false;
  // selectedQuotation.value = null;
  // isModalVisible.value = true;
};

const openEditModal = (quotation: Quotation) => {
  isEdit.value = true;
  selectedQuotation.value = { ...quotation }; // clone
  isModalVisible.value = true;
};

// Submit handler
const handleSubmit = (quotation: Quotation) => {
  if (isEdit.value) {
    // Update
    const index = quotations.value.findIndex(q => q.quotationId === quotation.quotationId);
    if (index !== -1) {
      quotations.value[index] = quotation;
      message.success("Quotation updated!");
    }
  } else {
    // Create new
    quotation.quotationId = `Q-${String(quotations.value.length + 1).padStart(3, "0")}`;
    quotations.value.push(quotation);
    message.success("Quotation created!");
  }
  isModalVisible.value = false;
};

// Delete quotation
const deleteQuotation = (id: string) => {
  quotations.value = quotations.value.filter(q => q.quotationId !== id);
  message.success("Quotation deleted!");
};

// Status color
const statusColor = (status: string) => {
  switch (status) {
    case "DRAFT": return "default";
    case "SENT": return "blue";
    case "APPROVED": return "green";
    case "REJECTED": return "red";
    default: return "default";
  }
};
</script>

<template>
  <div class="px-2 py-3">
    <div class="!flex justify-between items-center py-3 w-full">
      <!-- Create Button -->
      <div class="w-[30%] !flex !justify-between !items-center">
        <round-button @click="openCreateModal" type="primary">
          Create
          <PlusOutlined />
        </round-button>
      </div>

      <!-- Search and Filter Section -->
      <div class="w-[50%] flex flex-between">
        <div class="flex justify-end items-center gap-2 w-full">
          <!-- Search Input -->
          <div class="w-[60%] flex justify-center gap-2">
            <ant-input
              :placeholder="'Search Quotation'"
              @update:value="handleSearch"
            />
            <round-button type="primary" class="">
              <SearchOutlined class="!text-sm" />
            </round-button>
          </div>

          <!-- Filter Button -->
          <round-button class="ml-2">
            Filter
            <FilterOutlined />
          </round-button>
        </div>
      </div>
    </div>

    <a-table
      :data-source="quotations"
      :pagination="{ pageSize: 5 }"
      row-key="quotationId"
      bordered
    >
      <a-table-column
        title="Quotation ID"
        key="quotationId"
        :customRender="({ record }:{record:any}) => record.quotationId"
      />
      <a-table-column
        title="Customer"
        key="customerId"
        :customRender="({ record }:{record:any}) => record.customerId || '-'"
      />
      <a-table-column
        title="Date"
        key="quotationDate"
        :customRender="({ record }:{record:any}) => record.quotationDate"
      />
      <a-table-column
        title="Status"
        key="status"
        :customRender="({ record }:{record:any}) => record.status"
      />
      <a-table-column
        title="Total Amount"
        key="totalAmount"
        :customRender="({ record }:{record:any}) => `$${record.totalAmount.toFixed(2)}`"
      />
      <a-table-column title="Action" key="action">
        <template #default="{ record }" >
          <round-button type="primary" @click="showQuotationDetails(record)"
            >View
            </round-button
          >
          
          <a-dropdown :trigger="['click']">
            <template #overlay>
              <a-menu @click="(e:any)=>changeStatus(record, e?.key)">
               
                <a-menu-item key="MOVE">
                  <UserOutlined />
                 MOVE
                </a-menu-item>
                <a-menu-item key="REJECT">
                  <UserOutlined />
                  REJECT
                </a-menu-item>
              </a-menu>
            </template>
            <round-button class="ant-dropdown-link !bg-green-700 !ml-2" @click.prevent>
              Draft
              <DownOutlined />
            </round-button>
          </a-dropdown>

        </template>
      </a-table-column>
    </a-table>


    <QuotationForm
      :open="isModalVisible"
      :quotation="selectedQuotation"
      :is-edit="isEdit"
      
      @cancel="closeModal"
      @submit="handleSubmit"
    />

    <a-modal
      v-model:open="open"
      title="Quotation Details"
      width="800px"
      :footer="null"
      @cancel="close"
    >
      <QuotationDetail
        v-if="selectedQuotation"
        :quotation="selectedQuotation"
      />
    
    </a-modal>
  </div>
</template>
