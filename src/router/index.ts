import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import Dashboard from '@/view/Dashboard.vue'
import Customer from '@/view/Customer.vue'
import Reports from '@/view/Reports.vue'
import CustomerReports from '@/view/CustomerReport.vue'
import ExportReports from '@/view/ExportReports.vue'
import NotFound from '@/view/NotFound.vue'
import { useAuthStore } from '@/stores/auth'
import Login from '@/view/Login.vue'

const routes: RouteRecordRaw[] = [
   { path: '/login', name: 'Login', component: Login },
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
router.beforeEach(async (to) => {
  console.log('Navigating to:', to)
  const auth = useAuthStore()
  await auth.verifyUser()
  if (to.meta.requiresAuth && !auth.isLogin) return '/login'
  if (to.path === '/login' && auth.isLogin) return '/'
})

export default router
