import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import Dashboard from '@/view/Dashboard.vue'
import Customer from '@/view/Customer.vue'
import Reports from '@/view/Reports.vue'
import CustomerReports from '@/view/CustomerReport.vue'
import ExportReports from '@/view/ExportReports.vue'
import NotFound from '@/view/NotFound.vue'
import { useAuthStore } from '../stores/auth'
import Login from '@/view/Login.vue'
import ContentWrapper from '@/components/layout/ContentWrapper.vue'
import { RoutePath } from './routes_path'

const routes: RouteRecordRaw[] = [
  { path: '/login', name: 'Login', component: Login,meta: { layout: false } },

   {
    path: '/',
    component: ContentWrapper, // everything else uses AppLayout
    children: [
      { path: '/', redirect: '/dashboard' },
      { path:RoutePath.DASHBOARD, name: 'Dashboard', component: Dashboard },
      { path:RoutePath.CUSTOMER, name: 'Customers', component: Customer },
      { path:RoutePath.INVOICE, name: 'Invoice', component: Customer },
      {
        path: RoutePath.REPORT,
        name: 'Reports',
        component: Reports,
        children: [
          { path: 'customers', name: 'CustomerReports', component: CustomerReports },
           { path: 'customers/:id', name: 'CustomerReports', component: CustomerReports },
          { path: 'export', name: 'ExportReports', component: ExportReports },
          { path: 'export/:id', name: 'ExportReports', component: ExportReports },
        ],
      },
       { path:RoutePath.ADMINISTRATION, name: 'Administration', component: Customer },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
      },
    ],
  },

]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to) => {

  const auth = useAuthStore()
  await auth.verifyUser()
  if (to.meta.requiresAuth && !auth.isLogin) return '/login'
  if (to.path === '/login' && auth.isLogin) return '/'
})

export default router
