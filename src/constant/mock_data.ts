import { 
  UserOutlined, 
  DashboardOutlined,
  TeamOutlined,
  FileOutlined,
  SettingOutlined,
  ShoppingOutlined,
  BarChartOutlined,
  CalendarOutlined,
  MessageOutlined,
  BoxPlotFilled,
  UserAddOutlined,
  BoxPlotOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UsergroupAddOutlined,
  
} from '@ant-design/icons-vue';
// import { Boxes, ContactRound, ShoppingBasket, ShoppingCart, Warehouse } from 'lucide-vue-next';

export interface ItemMenuProps {
  key: string;
  title: string;
  icon: any;
  path?: string;
  children?: ItemMenuProps[];
}
export const menuData: ItemMenuProps[] = [
  {
    key: 'dashboards',
    title: 'Dashboard',
    icon: DashboardOutlined,
    path: '/dashboards'
  },
  {
    key: 'customers',
    title: 'Customers',
    icon: UserAddOutlined,
    path: '/customers'
  },
  {
    key: 'categories',
    title: 'Categories',
    icon: ShoppingOutlined,
    path: '/categories',

  },
  {
    key: 'products',
    title: 'Products',
    icon: BoxPlotOutlined,
    path: '/products',

  },
  {
    key: 'warehouses',
    title: 'Warehouse',
    icon: ShopOutlined,
    path: '/warehouses',

  },
  {
    key: 'orders',
    title: 'Orders',
    icon: ShoppingCartOutlined,
    path: '/orders',

  },
    {
    key: 'purchase-orders',
    title: 'Purchase',
    icon: ShoppingOutlined,
    path: '/purchase-orders',

  },
  {
    key: 'suppliers',
    title: 'Supplier',
    icon: UsergroupAddOutlined,
    path: '/suppliers',

  },
  {
    key: 'reports',
    title: 'Report',
    icon: BarChartOutlined,
    children: [
      {
        key: '/customer/orders',
        title: 'Reports',
        icon: BarChartOutlined,
        path: '/analytics/reports'
      },
      {
        key: '/suppliers/purchase-orders',
        title: 'Statistics',
        icon: BarChartOutlined,
        path: '/analytics/statistics'
      }
    ]
  }

  ];
