// router.ts
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import ContentWrapper from '@/components/layout/ContentWrapper.vue'
import { RoutePath } from './routes_path'
import Login from '@/view/Login.vue'
import Dashboard from '@/view/dashboard/Dashboard.vue'
import Quotation from '@/view/quotation/Quotation.vue'
import QuotationAction from '@/view/quotation/QuotationAction.vue'
import Customer from '@/view/Customer.vue'
import Product from '@/view/Product.vue'
import Ums from '@/view/Ums.vue'
import Warehouse from '@/view/Warehouse.vue'
import Order from '@/view/order/Order.vue'
import PurchaseOrder from '@/view/PurchaseOrder.vue'
import Category from '@/view/Category.vue'
import Supplier from '@/view/Supplier.vue'
import CustomerReport from '@/view/CustomerReport.vue'
import ExportReports from '@/view/ExportReports.vue'


// Import all views
// const views = import.meta.glob('@/view/**/*.vue');
// const viewComponents = import.meta.glob('@/view/**/*.vue', { eager: true });

// // Helper to get component by path
// const getComponent = (path: string) => {
//   const componentPath = `../view/${path}.vue`;
//   return views[componentPath] || (() => import('@/view/NotFound.vue'));
// };

const routes: RouteRecordRaw[] = [
  { 
    path: `/${RoutePath.LOGIN}`, 
    name: 'Login', 
    component: () => Login,
    meta: { layout: false } 
  },
  {
    path: '/',
    component: ContentWrapper,
    children: [
      { path: '/', redirect: `/${RoutePath.DASHBOARD}` },
      
      // Dynamic routes with parameters
      { path: `/${RoutePath.DASHBOARD}`, name: 'Dashboard', component: Dashboard },
      
      // List views
      { path: `/${RoutePath.QUOTATION}`, name: 'Quotations', component: () => Quotation },
      // { path: `/${RoutePath.QUOTATION_DETAIL}`, name: 'QuotationDetail', component: () => import('@/view/quotation/QuotationDetail.vue') },
      { path: `/${RoutePath.QUOTATION_ACTION}`, name: 'QuotationActions', component: () => QuotationAction },
      
      { path: `/${RoutePath.CUSTOMER}`, name: 'Customers', component: () => Customer },
      // { path: `/${RoutePath.CUSTOMER_DETAIL}`, name: 'CustomerDetail', component: () => import('@/view/CustomerDetail.vue') },
      
      { path: `/${RoutePath.PRODUCT}`, name: 'Products', component: () => Product },
      // { path: `/${RoutePath.PRODUCT_DETAIL}`, name: 'ProductDetail', component: () => import('@/view/ProductDetail.vue') },
      
      { path: `/${RoutePath.UNIT}`, name: 'Units', component: () => Ums },
      // { path: `/${RoutePath.UNIT_DETAIL}`, name: 'UnitDetail', component: () => import('@/view/UnitDetail.vue') },
      
      { path: `/${RoutePath.WAREHOUSE}`, name: 'Warehouse', component: () => Warehouse },
      // { path: `/${RoutePath.WAREHOUSE_DETAIL}`, name: 'WarehouseDetail', component: () => import('@/view/WarehouseDetail.vue') },
      
      { path: `/${RoutePath.ORDER}`, name: 'Orders', component: () => Order },
      // { path: `/${RoutePath.ORDER_DETAIL}`, name: 'OrderDetail', component: () => import('@/view/order/OrderDetail.vue') },
      
      { path: `/${RoutePath.PURCHASE_ORDER}`, name: 'PurchaseOrder', component: () => PurchaseOrder },
      // { path: `/${RoutePath.PURCHASE_ORDER_DETAIL}`, name: 'PurchaseOrderDetail', component: () => import('@/view/PurchaseOrderDetail.vue') },
      
      { path: `/${RoutePath.CATEGORY}`, name: 'Category', component: () => Category },
      // { path: `/${RoutePath.CATEGORY_DETAIL}`, name: 'CategoryDetail', component: () => import('@/view/CategoryDetail.vue') },
      
      { path: `/${RoutePath.SUPPLIER}`, name: 'Supplier', component: () => Supplier},
      // { path: `/${RoutePath.SUPPLIER_DETAIL}`, name: 'SupplierDetail', component: () => import('@/view/SupplierDetail.vue') },
      
      // { path: `/${RoutePath.ADMINISTRATION}`, name: 'Administration', component: () => import('@/view/Configuration.vue') },
      
      // Reports with nested routes
      {
        path: `/${RoutePath.REPORT}`,
        name: 'Reports',
        component: () => import('@/view/Reports.vue'),
        children: [
          { path: RoutePath.REPORT_CUSTOMER.split('/')[1], name: 'CustomerReports', component: () => CustomerReport},
          { path: RoutePath.REPORT_CUSTOMER_DETAIL.split('/')[2], name: 'CustomerReportDetail', component: () => CustomerReport},
          { path: RoutePath.REPORT_EXPORT.split('/')[1], name: 'ExportReports', component: () => ExportReports },
          { path: RoutePath.REPORT_EXPORT_DETAIL.split('/')[2], name: 'ExportReportDetail', component: () => ExportReports},
        ],
      },
      
      { path: `/${RoutePath.ERROR_404}`, name: 'NotFound', component: () => import('@/view/NotFound.vue') },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const auth = useAuthStore();
  await auth.verifyUser();
  
  if (to.meta.requiresAuth && !auth.isLogin) return `/${RoutePath.LOGIN}`;
  if (to.path === `/${RoutePath.LOGIN}` && auth.isLogin) return '/';
});

export default router;