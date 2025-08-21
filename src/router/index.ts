import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import Dashboard from '@/view/Dashboard.vue'
import Customer from '@/view/Customer.vue'
import Reports from '@/view/Reports.vue'
import CustomerReports from '@/view/CustomerReport.vue'
import ExportReports from '@/view/ExportReports.vue'
import NotFound from '@/view/NotFound.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/customers', name: 'Customers', component: Customer},
  {
    path: '/reports',
    name: 'Reports',
    component: Reports,
    children: [
      { path: 'customer/:customerId', name: 'CustomerReports', component: CustomerReports },
      { path: 'export', name: 'ExportReports', component: ExportReports },
    ],
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
