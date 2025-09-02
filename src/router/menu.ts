// menu.ts
import { 
  DashboardOutlined,
  ContainerOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
  ShoppingOutlined,
  ApartmentOutlined,
  BoxPlotOutlined,
  ShopOutlined,
  UsergroupAddOutlined,
  BarChartOutlined,
  SettingOutlined,
  FileTextOutlined,
  ExportOutlined
} from '@ant-design/icons-vue';
import { RoutePath } from './routes_path';

export interface ItemMenuProps {
  key: string;
  title: string;
  icon: any;
  path?: string;
  children?: ItemMenuProps[];
}

export const menuData: ItemMenuProps[] = [
  {
    key: 'dashboard',
    title: 'Dashboard',
    icon: DashboardOutlined,
    path: RoutePath.DASHBOARD
  },
  {
    key: 'quotations',
    title: 'Quotations',
    icon: ContainerOutlined,
    path: RoutePath.QUOTATION
  },
  {
    key: 'orders',
    title: 'Orders',
    icon: ShoppingCartOutlined,
    path: RoutePath.ORDER
  },
  {
    key: 'customers',
    title: 'Customers',
    icon: UserAddOutlined,
    path: RoutePath.CUSTOMER
  },
  {
    key: 'categories',
    title: 'Categories',
    icon: ShoppingOutlined,
    path: RoutePath.CATEGORY
  },
  {
    key: 'units',
    title: 'Units',
    icon: ApartmentOutlined,
    path: RoutePath.UNIT
  },
  {
    key: 'products',
    title: 'Products',
    icon: BoxPlotOutlined,
    path: RoutePath.PRODUCT
  },
  {
    key: 'warehouses',
    title: 'Warehouses',
    icon: ShopOutlined,
    path: RoutePath.WAREHOUSE
  },
  {
    key: 'purchase-orders',
    title: 'Purchase Orders',
    icon: ShoppingOutlined,
    path: RoutePath.PURCHASE_ORDER
  },
  {
    key: 'suppliers',
    title: 'Suppliers',
    icon: UsergroupAddOutlined,
    path: RoutePath.SUPPLIER
  },
  {
    key: 'reports',
    title: 'Reports',
    icon: BarChartOutlined,
    children: [
      {
        key: 'customer-reports',
        title: 'Customer Reports',
        icon: FileTextOutlined, // Different icon for child items
        path: RoutePath.REPORT_CUSTOMER
      },
      {
        key: 'export-reports',
        title: 'Export Reports',
        icon: ExportOutlined, // Different icon for child items
        path: RoutePath.REPORT_EXPORT
      }
    ]
  },
  {
    key: 'administration',
    title: 'Administration',
    icon: SettingOutlined,
    path: RoutePath.ADMINISTRATION
  }
];

// Helper to generate full path
export const generatePath = (path: string): string => {
  return `/${path}`;
};

// Helper to check if menu item is active
export const isMenuActive = (currentPath: string, menuPath?: string): boolean => {
  if (!menuPath) return false;
  
  // Remove parameters for comparison
  const cleanCurrentPath = currentPath.replace(/\/:[^/]+/g, '');
  const cleanMenuPath = menuPath.replace(/\/:[^/]+/g, '');
  
  return cleanCurrentPath === generatePath(cleanMenuPath);
};