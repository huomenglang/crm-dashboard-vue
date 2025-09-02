<template>
  <div class="quotations-page px-4">
    <div class="page-header">

      <a-button type="primary" @click="router.push('/quotation-action')" class="!flex justify-center items-center">
        <template #icon>
          <PlusOutlined />
        </template>
        Create
      </a-button>

    </div>


      <a-table 
        :dataSource="quotations" 
        :columns="columns" 
        :loading="loading"
        :pagination="{ pageSize: 10, showSizeChanger: true }"
        bordered
        size="small"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'customer'">
            {{ record?.customer?.name }}
          </template>
          
          <template v-else-if="column.key === 'status'">
            <a-tag :color="getStatusColor(record.status)">
              {{ record?.status }}
            </a-tag>
          </template>
          
          <template v-else-if="column.key === 'discount'">
            {{ record?.discount || 0 }}%
          </template>
          
          <template v-else-if="column.key === 'tax'">
            {{ record?.tax || 0 }}%
          </template>
          
          <template v-else-if="column.key === 'actions'">
            <a-space class="!flex !items-center" >
              <a-button type="primary"  size="small" @click="viewQuotation(record)" class="!flex justify-center items-center !bg-sky-500">
                <Eye class="w-4 h-4"/>

              </a-button>
                 <a-button type="primary"  size="small"@click="editQuotation(record)" class="!flex justify-center items-center !bg-cyan-500">
                <EditOutlined class="w-4 h-4"/>
              </a-button>
             
              <a-dropdown v-if="record.status === QuoteStatus.PENDING">
                <a-button size="small" type="primary"  class="!flex justify-center items-center" >
                  <span class="text-[12px]">Status</span> 
                  <ChevronDown class="w-4 h-4"/>
                </a-button>
                <template #overlay>
                  <a-menu @click="({ key }:{key:any}) => changeStatus(record, key)" >
                    <a-menu-item key="APPROVE">Approve</a-menu-item>
                    <a-menu-item key="DROP">Drop</a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </a-space>
          </template>
        </template>
      </a-table>
   

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
import { ref, onMounted} from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { PlusOutlined, EditOutlined } from '@ant-design/icons-vue';
import { getAll, updateOne } from '@/data/ls_data';
import { KEY } from '@/data/Key';
import { QuoteStatus, type Quotation } from '@/components/pages/quotation/type';
import QuotationDetails from './QuotationDetails.vue';
import { ChevronDown, Eye } from 'lucide-vue-next';

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
    title: 'Status',
    key: 'status',
    width: '15%'
  },
  {
    title: 'Discount',
    key: 'discount',
    width: '10%'
  },
  {
    title: 'Tax',
    key: 'tax',
    width: '10%'
  },
  {
    title: 'Actions',
    key: 'actions',
    width: '25%'
  }
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
    message.error('Failed to load quotations');
    quotations.value = [];
  } finally {
    loading.value = false;
  }
}

function getStatusColor(status: QuoteStatus) {
  const statusColors: Record<QuoteStatus, string> = {
    [QuoteStatus.PENDING]: 'orange',
    [QuoteStatus.APPROVED]: 'green',
    [QuoteStatus.DROP]: 'red'
  };
  
  return statusColors[status] || 'default';
}

function viewQuotation(quotation: Quotation) {
  selectedQuotation.value = quotation;
  detailModalVisible.value = true;
}

function editQuotation(quotation: Quotation) {
  router.push(`/quotation/${quotation.id}`);
}

async function changeStatus(quotation: Quotation, statusKey: string) {
  try {
    let newStatus: QuoteStatus;
    let updatedByField = '';
    
    if (statusKey === 'APPROVE') {
      newStatus = QuoteStatus.APPROVED;
      updatedByField = 'approvedBy';
    } else if (statusKey === 'DROP') {
      newStatus = QuoteStatus.DROP;
      updatedByField = 'droppedBy';
    } else {
      return;
    }
    
    const updatedQuotations = quotations.value.map(q => {
      if (q.id === quotation.id) {
        return { 
          ...q, 
          status: newStatus, 
          updatedAt: new Date().toISOString(),
          [updatedByField]: 'Current User' // Replace with actual user info
        };
      }
      return q;
    });
    
    await updateOne(quotation.id, updatedQuotations,KEY.QUOTATION);

    quotations.value = updatedQuotations;
    message.success(`Quotation ${statusKey.toLowerCase()}d successfully`);
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
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>