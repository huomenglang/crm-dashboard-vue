// routes_path.ts
export const RoutePath = {
  HOME: '',
  SUPPLIER: 'suppliers',
  SUPPLIER_DETAIL: 'suppliers/:id',
  PURCHASE_ORDER: 'purchase-orders',
  PURCHASE_ORDER_DETAIL: 'purchase-orders/:id',
  WAREHOUSE: 'warehouses',
  WAREHOUSE_DETAIL: 'warehouses/:id',
  QUOTATION: 'quotations',
  QUOTATION_DETAIL: 'quotations/:id',
  QUOTATION_ACTION: 'quotation-action/:id?',
  PRODUCT: 'products',
  PRODUCT_DETAIL: 'products/:id',
  ADMIN_USER: 'users',
  REPORT: 'reports',
  REPORT_CUSTOMER: 'reports/customers',
  REPORT_CUSTOMER_DETAIL: 'reports/customers/:id',
  REPORT_EXPORT: 'reports/export',
  REPORT_EXPORT_DETAIL: 'reports/export/:id',
  ORDER: 'orders',
  ORDER_DETAIL: 'orders/:id',
  DASHBOARD: 'dashboard',
  CATEGORY: 'categories',
  CATEGORY_DETAIL: 'categories/:id',
  ATTACHMENT: 'attachments',
  CUSTOMER: 'customers',
  CUSTOMER_DETAIL: 'customers/:id',
  UNIT: 'units',
  UNIT_DETAIL: 'units/:id',
  ADMIN: 'admin',
  ADMINISTRATION: 'administration',
  LOGIN: 'login',
  ERROR_404: ':pathMatch(.*)*',
} as const;

export type RoutePathType = keyof typeof RoutePath;
export type RouteParams = {
  [RoutePath.SUPPLIER_DETAIL]: { id: string };
  [RoutePath.PURCHASE_ORDER_DETAIL]: { id: string };
  [RoutePath.WAREHOUSE_DETAIL]: { id: string };
  [RoutePath.QUOTATION_DETAIL]: { id: string };
  [RoutePath.QUOTATION_ACTION]: { id?: string };
  [RoutePath.PRODUCT_DETAIL]: { id: string };
  [RoutePath.REPORT_CUSTOMER_DETAIL]: { id: string };
  [RoutePath.REPORT_EXPORT_DETAIL]: { id: string };
  [RoutePath.ORDER_DETAIL]: { id: string };
  [RoutePath.CATEGORY_DETAIL]: { id: string };
  [RoutePath.CUSTOMER_DETAIL]: { id: string };
  [RoutePath.UNIT_DETAIL]: { id: string };
};