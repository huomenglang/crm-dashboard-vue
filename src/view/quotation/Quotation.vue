<template>
  <div class="quotations-page px-4">
    
    <TableAnt
      :columns="columns"
      :data="quotations"
      :pagination="{ pageSize: 10, showSizeChanger: true }"
      :loading="loading"
      :row-key="(record) => record.id"
      :scroll="{ x: 1200, y: 600 }"
      size="small"
      search-placeholder="Search..."
      @search="handleSearch"
      @create="handleCreate"
      @view="handleView"
      @edit="handleEdit"
      @delete="handleDelete"
      @filter="handleFilter"
    >
      <template #column-customer="{ record }">
        {{ record?.customer?.name }}
      </template>
      <template #bodyCell-status="{ record }">
        <a-tag :color="getStatusColor(record.status)">
          {{ record?.status }}
        </a-tag>
      </template>
      <template #bodyCell-discount="{ record }">
        {{ record?.discount || 0 }}%
      </template>

      <template #bodyCell-tax="{ record }"> {{ record?.tax || 0 }}% </template>
      <template #bodyCell-actions="{ record }">
        <a-space class="!flex !items-center">
          <a-button
            type="primary"
            size="small"
            @click="viewQuotation(record)"
            class="!flex justify-center items-center !bg-sky-500"
          >
            <Eye class="w-4 h-4" />
          </a-button>
          <a-button
            type="primary"
            size="small"
            @click="editQuotation(record)"
            class="!flex justify-center items-center !bg-cyan-500"
          >
            <EditOutlined class="w-4 h-4" />
          </a-button>

          <a-dropdown v-if="record.status === QuoteStatus.PENDING">
            <a-button
              size="small"
              type="primary"
              class="!flex justify-center items-center"
            >
              <span class="text-[12px]">Status</span>
              <ChevronDown class="w-4 h-4" />
            </a-button>
            <template #overlay>
              <a-menu @click="({ key }:{key:any}) => changeStatus(record, key)">
                <a-menu-item key="APPROVE">Approve</a-menu-item>
                <a-menu-item key="DROP">Drop</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </a-space>
      </template>
    </TableAnt>

    <!-- Quotation Detail Modal -->
    <a-modal
      v-model:open="detailModalVisible"
      :title="`Quotation Details - ${selectedQuotation?.quoteNo}`"
      width="800px"
      :footer="null"
    >
      <QuotationDetails
        :quotation="selectedQuotation"
        v-if="selectedQuotation"
      />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { EditOutlined } from "@ant-design/icons-vue";
import { createOne, getAll, updateOne } from "@/data/ls_data";
import { KEY } from "@/data/Key";
import { QuoteStatus, type Quotation, type QuotationProduct, type Unit } from "@/components/pages/quotation/type";
import QuotationDetails from "./QuotationDetails.vue";
import { ChevronDown, Eye } from "lucide-vue-next";
import TableAnt from "@/components/base/table/TableAnt.vue";
import type { Customer, Order, OrderProduct } from "@/components/pages/order/order";

const router = useRouter();
const quotations = ref<Quotation[]>([]);
const loading = ref(false);
const detailModalVisible = ref(false);
const selectedQuotation = ref<Quotation | null>(null);

const columns = [
  {
    title: "Quote No",
    dataIndex: "quoteNo",
    key: "quoteNo",
    width: "15%",
  },
  {
    title: "Customer",
    key: "customer",
    width: "25%",
  },
  {
    title: "Status",
    key: "status",
    width: "15%",
  },
  {
    title: "Discount",
    key: "discount",
    width: "10%",
  },
  {
    title: "Tax",
    key: "tax",
    width: "10%",
  },
  {
    title: "Actions",
    key: "actions",
    width: "25%",
  },
];

onMounted(async () => {
  await loadQuotations();
});

async function loadQuotations() {
  try {
    loading.value = true;
    const data = getAll(KEY.QUOTATION);

    quotations.value = Array.isArray(data) ? data : [];
  } catch (error) {
    message.error("Failed to load quotations");
    quotations.value = [];
  } finally {
    loading.value = false;
  }
}

function getStatusColor(status: QuoteStatus) {
  const statusColors: Record<QuoteStatus, string> = {
    [QuoteStatus.PENDING]: "orange",
    [QuoteStatus.APPROVED]: "green",
    [QuoteStatus.DROP]: "red",
  };

  return statusColors[status] || "default";
}

function viewQuotation(quotation: Quotation) {
  selectedQuotation.value = quotation;
  detailModalVisible.value = true;
}

function editQuotation(quotation: Quotation) {
  // router.push(`/quotation/${quotation.id}`);
  router.push({ name: "QuotationActions", params: { id: quotation.id } });
}

async function changeStatus(quotation: Quotation, statusKey: string) {
  try {
    let newStatus: QuoteStatus;
    let updatedByField = "";

    if (statusKey === "APPROVE") {
      newStatus = QuoteStatus.APPROVED;
      updatedByField = "approvedBy";
    } else if (statusKey === "DROP") {
      newStatus = QuoteStatus.DROP;
      updatedByField = "droppedBy";
    } else {
      return;
    }

    const updatedQuotations = quotations.value
      .map((q) => {
        if (q.id === quotation.id) {
          console.log("id; ", q.id);
          return {
            ...q,
            status: newStatus,
            updatedAt: new Date().toISOString(),
            [updatedByField]: "Current User", // Replace with actual user info
          };
        }
      })
      .filter((p) => p !== undefined)[0];
    await updateOne(quotation.id, updatedQuotations, KEY.QUOTATION);
    quotations.value = getAll(KEY.QUOTATION);

    if(newStatus===QuoteStatus.APPROVED){
      moveQuotationToOrder(updatedQuotations);
    }
    message.success(`Quotation ${statusKey.toLowerCase()}d successfully`);


  } catch (error) {
    message.error("Failed to update status");
  }
}

const moveQuotationToOrder=(data:Quotation)=>{
  const mockCustomer:Customer={
    id:data.customer.id,
    email:data.customer.email,
    phone:data.customer.phone,
    name:data.customer.name,
    address:data.customer.address
  }
  const mockOrderProducts:OrderProduct[]=data.products.map((p:QuotationProduct)=>{
      return {
           product: {
              id:p.product.id,
              name: p.product.name,
              sku: p.product.sku
           },
           subtotal:p.subtotal,
           discount:p.discount,
           units:p.units.map((unit:Unit)=>{
              return {
                unitId: unit.unitId,
                unitName: unit.unitName,
                quantity: unit.quantity,
                price: unit.price,
                baseUnitId: unit.baseUnitId||'',
                baseUnitQuantity: unit.baseUnitQuantity||0,
                subtotal: unit.subtotal
              }    
           }
          )
      }
  })
    const order:Order={
    orderId: 'ORD'+Math.ceil(Math.random()*1000),
    orderNo: 'INV-'+Math.ceil(Math.random()*10000),
    customer: mockCustomer,
    status: 'CREATED',
    products: mockOrderProducts,
    totalAmount: data.totalAmount,
    discount: data.discount,
    tax: data.tax,
    createdAt: new Date().toISOString(),
    updatedAt: '',
    createdBy: 'user123'
    }
    console.log("order data: ",order)
    createOne(order,KEY.ORDER);
}

// Event handlers
const handleCreate = () => {
  router.push("/quotation-action");
};

const handleEdit = (record: any) => {};

const handleView = (record: any) => {};

const handleDelete = (record: any) => {};

const handleSearch = (value: string) => {
  console.log("data search: ",value)
};

const handleFilter = () => {
  console.log("Open filter");
};
</script>

<style scoped>
.quotations-page {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>
