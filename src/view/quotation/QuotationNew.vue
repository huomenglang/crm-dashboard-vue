<template>
  <div class="quotations-page">
    <div class="page-header">
      <h2>Quotations</h2>
      <a-button type="primary" @click="router.push('/quotation_action')">
        <template #icon>
          <PlusOutlined />
        </template>
        Create Quotation
      </a-button>
    </div>

    <a-card>
      <a-table 
        :dataSource="quotations" 
        :columns="columns" 
        :loading="loading"
        :pagination="{ pageSize: 10, showSizeChanger: true }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'customer'">
            {{ console.log("daa record: ",toRaw(record)) }}
            {{ record[0].customer?.name }}
          </template>
          
          <template v-else-if="column.key === 'total'">
            ${{ record?.totalAmount?.toFixed(2) }}
          </template>
          
          <template v-else-if="column.key === 'status'">
            <a-tag :color="getStatusColor(record.status)">
              {{ record.status }}
            </a-tag>
          </template>
          
          <template v-else-if="column.key === 'actions'">
            <a-space>
              <a-button type="link" size="small" @click="viewQuotation(record)">
                View
              </a-button>
              <a-button type="link" size="small" @click="editQuotation(record)">
                Edit
              </a-button>
              <a-dropdown>
                <a-button type="link" size="small">
                  Status <DownOutlined />
                </a-button>
                <template #overlay>
                  <a-menu @click="({ key }:{key:any}) => changeStatus(record, key)">
                    <a-menu-item key="PENDING">Pending</a-menu-item>
                    <a-menu-item key="APPROVED">Approved</a-menu-item>
                    <a-menu-item key="REJECTED">Rejected</a-menu-item>
                    <a-menu-item key="SENT">Sent</a-menu-item>
                    <a-menu-item key="CONVERTED">Converted to Invoice</a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>

    <!-- Quotation Detail Modal -->
    <a-modal 
      v-model:open="detailModalVisible" 
      :title="`Quotation Details - ${selectedQuotation?.quoteNo}`" 
      width="800px"
      :footer="null"
    >
      <QuotationDetails :quotation="selectedQuotation" v-if="selectedQuotation" />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, toRaw } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { PlusOutlined, DownOutlined } from '@ant-design/icons-vue';
import { getAll, updateOne } from '@/data/ls_data';
import { KEY } from '@/data/Key';
import type { Quotation } from '@/components/pages/quotation/type';
import QuotationDetails from './QuotationDetails.vue';

const router = useRouter();
const quotations = ref<Quotation[]>([]);
const loading = ref(false);
const detailModalVisible = ref(false);
const selectedQuotation = ref<Quotation | null>(null);

const columns = [
  {
    title: 'Quote No',
    dataIndex: 'quoteNo',
    key: 'quoteNo',
    width: '15%'
  },
  {
    title: 'Customer',
    key: 'customer',
    width: '25%'
  },
  {
    title: 'Total Amount',
    key: 'total',
    width: '15%'
  },
  {
    title: 'Status',
    key: 'status',
    width: '15%'
  },
  {
    title: 'Created Date',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: '15%'
  },
  {
    title: 'Actions',
    key: 'actions',
    width: '15%'
  }
];

onMounted(async () => {
  await loadQuotations();
});

async function loadQuotations() {
  try {
    loading.value = true;
    quotations.value = toRaw(getAll(KEY.QUOTATION) || []);
    console.log("quotation: ",quotations.value)
  } catch (error) {
    message.error('Failed to load quotations');
  } finally {
    loading.value = false;
  }
}

function getStatusColor(status: string) {
  const statusColors: Record<string, string> = {
    PENDING: 'orange',
    APPROVED: 'green',
    REJECTED: 'red',
    SENT: 'blue',
    CONVERTED: 'purple'
  };
  
  return statusColors[status] || 'default';
}

function viewQuotation(quotation: Quotation) {
    console.log("REcord: ",quotation)
  selectedQuotation.value = quotation;
  detailModalVisible.value = true;
}

function editQuotation(quotation: Quotation) {
  router.push(`/quotation/${quotation.id}`);
}

async function changeStatus(quotation: Quotation, status: string) {
  try {
    const updatedQuotations = quotations.value.map(q => {
      if (q.id === quotation.id) {
        return { ...q, status, updatedAt: new Date().toISOString() };
      }
      return q;
    });
    
    await updateOne(KEY.QUOTATION, updatedQuotations);
    // quotations.value = updatedQuotations;
    message.success('Status updated successfully');
  } catch (error) {
    message.error('Failed to update status');
  }
}
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
  margin-bottom: 24px;
}
</style>