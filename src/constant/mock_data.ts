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
  
} from '@ant-design/icons-vue';

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
    path: '/dashboard'
  },
  {
    key: 'sub1',
    title: 'Customers',
    icon: TeamOutlined,
    children: [
      {
        key: '1',
        title: 'Customer List',
        icon: UserOutlined,
        path: '/customers/list'
      },
      {
        key: '2',
        title: 'Add Customer',
        icon: UserOutlined,
        path: '/customers/add'
      },
      {
        key: '3',
        title: 'Customer Groups',
        icon: TeamOutlined,
        path: '/customers/groups'
      }
    ]
  },
  {
    key: 'sub2',
    title: 'Sales',
    icon: ShoppingOutlined,
    children: [
      {
        key: '4',
        title: 'Orders',
        icon: ShoppingOutlined,
        path: '/sales/orders'
      },
      {
        key: '5',
        title: 'Invoices',
        icon: FileOutlined,
        path: '/sales/invoices'
      },
      {
        key: '6',
        title: 'Quotes',
        icon: FileOutlined,
        path: '/sales/quotes'
      }
    ]
  },
  {
    key: 'sub3',
    title: 'Analytics',
    icon: BarChartOutlined,
    children: [
      {
        key: '7',
        title: 'Reports',
        icon: BarChartOutlined,
        path: '/analytics/reports'
      },
      {
        key: '8',
        title: 'Statistics',
        icon: BarChartOutlined,
        path: '/analytics/statistics'
      }
    ]
  },
  {
    key: 'calendar',
    title: 'Calendar',
    icon: CalendarOutlined,
    path: '/calendar'
  },
  {
    key: 'messages',
    title: 'Messages',
    icon: MessageOutlined,
    path: '/messages'
  },
  {
    key: 'settings',
    title: 'Settings',
    icon: SettingOutlined,
    children: [
      {
        key: '9',
        title: 'General',
        icon: SettingOutlined,
        path: '/settings/general'
      },
      {
        key: '10',
        title: 'Users',
        icon: TeamOutlined,
        path: '/settings/users'
      },
      {
        key: '11',
        title: 'Preferences',
        icon: SettingOutlined,
        path: '/settings/preferences'
      }
    ]
  }];
