

import type { StatItem } from "@/components/base/charts/StatisticCard.vue";
import type { CategoryProps } from "@/components/pages/category/category";
import type { Customer } from "@/components/pages/customer/customer";
import type { ProductResponse } from "@/components/pages/product/product";
import type { Supplier } from "@/components/pages/supplier/supplier";
import type { UmsProps } from "@/components/pages/ums/ums";
import type { WarehouseProps } from "@/components/pages/warehouse/warehouse";
import { ContainerOutlined, DollarOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons-vue";
import { BoxIcon } from "lucide-vue-next";

export const customerData: Customer[] = [
  {
    id: "1",
    // firstname: "Tola",
    name: "Sam Toal",
    gender: "Male",
    email: "toa@gmail.com",
    age: 30,
    address: "123 Main St",
    phoneNumber: "092 119 111",
    image:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMCAyMXYtMmE0IDQgMCAwIDAtNC00SDhhNCA0IDAgMCAwLTQgNHYyIj48L3BhdGg+PGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0Ij48L2NpcmNsZT48L3N2Zz4=",
  },
  {
    id: "2",
    name: "Sophea Tan",
    gender: "Female",
    email: "sophea@gmail.com",
    age: 25,
    address: "456 Elm St",
    phoneNumber: "092 119 222",

    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: "3",
    name: "John Doe",
    gender: "Male",
    email: "john@gmail.com",
    age: 28,
    address: "789 Oak St",
    phoneNumber: "092 119 333",

    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: "4",
    name: "Jane Smith",
    gender: "Female",
    email: "jane@gmail.com",
    age: 22,
    address: "321 Pine St",
    phoneNumber: "092 119 444",

    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: "5",
    name: "Michael Johnson",
    gender: "Male",
    email: "michael@gmail.com",
    age: 35,
    address: "654 Maple St",
    phoneNumber: "092 119 555",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
];
export const categoryData: CategoryProps[] = [
  {
    id: "1",
    name: "Juice",
    image:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMCAyMXYtMmE0IDQgMCAwIDAtNC00SDhhNCA0IDAgMCAwLTQgNHYyIj48L3BhdGg+PGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0Ij48L2NpcmNsZT48L3N2Zz4=",
    description: "A refreshing juice made from the finest fruits.",
  },
  {
    id: "2",
    name: "Beer",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    description: "A passionate software engineer.",
  },
  {
    id: "2",
    name: "Cookies",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    description: "A delicious chocolate chip cookie.",
  },
  {
    id: "3",
    name: "Soap",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    description: "A software engineer with a passion for coding.",
  },
  {
    id: "4",
    name: "Whisky",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    description: "A talented graphic designer.",
  },
  {
    id: "5",
    name: "Cleanser",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    description: "A project manager with a knack for leadership.",
  },
];

export const warehouseData: WarehouseProps[] = [
  {
    id: "1",
    name: "WatPhnom",
    location:"Phnom Penh",
    description: "Central Warehouse",
  },
  {
    id: "2",
    name: "KohPich",
    location:"Phnom Penh",
    description: "Second Warehouse",
  },
  {
    id: "3",
    name: "ChroyChangvar",
    location:"Phnom Penh",
    description: "Third Warehouse",
  },
  {
    id: "4",
    name: "Takmao",
    location:"Kandal",
    description: "Fourth Warehouse",
  },
  {
    id: "5",
    name: "Tultumpung",
    location:"Phnom Penh",
    description: "Fifth Warehouse",
  },
  {
    id: "5",
    name: "Sonthormuk",
    location:"Phnom Penh",
    description: "Sixth Warehouse",
  },
];

export const UmsData: UmsProps[] = [
  {
    id: "1",
    name: "Can",
    description: "ខ្នាតទូទៅ",
  },
  {
    id: "2",
    name: "Package",
    description: "ខ្នាតទូទៅ",
  },
  {
    id: "6",
    name: "Lo",
    description: "ខ្នាតទូទៅ",
  },
  {
    id: "3",
    name: "Box",
    description: "ខ្នាតទូទៅ",
  },
  {
    id: "4",
    name: "Case",
    description: "ខ្នាតទូទៅ",
  },
  {
    id: "5",
    name: "Bag",
    description: "ខ្នាតទូទៅ",
  },
];

export const supplierData: Supplier[] = [
  {
    id: "1",
    name: "Sam Vicheka",
    gender: "Male",
    address: "123 Main St",
    phoneNumber: "092 119 111",
    description: "A Cookie supplier of goods.",
    image:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMCAyMXYtMmE0IDQgMCAwIDAtNC00SDhhNCA0IDAgMCAwLTQgNHYyIj48L3BhdGg+PGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0Ij48L2NpcmNsZT48L3N2Zz4=",
  },
  {
    id: "2",
    name: "Sophea Tan",
    gender: "Female",
    address: "456 Elm St",
    phoneNumber: "092 119 222",
    description: "A supplier of organic products.",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: "3",
    name: "Ratha Kim",
    gender: "Male",
    address: "789 Oak St",
    phoneNumber: "092 119 333",
    description: "A supplier of electronic goods.",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: "4",
    name: "Daro Chan",
    gender: "Female",
    description: "A supplier of beauty products.",
    address: "321 Pine St",
    phoneNumber: "092 119 444",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: "5",
    name: "Tep Kosal",
    gender: "Male",
    description: "A supplier of Beer goods.",
    address: "654 Maple St",
    phoneNumber: "092 119 555",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
];
export const productData:ProductResponse[]=[
  {
    id: "001",
    name: "Pepsi",
    sku: "PEP-001",
    description: "Description of Pepsi",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    warehouse: {
      id: "1",
      name: "WatPhnom"
    },
    units: [
      {
        unitId: "1",
        unitName: "Can",
        conversionToBase: 1,
        sellingPrice: 1.00,
        baseUnitId:null,
      },
      {
        unitId: "2",
        unitName: "Box",
        conversionToBase: 6,
        sellingPrice: 6.00,
        baseUnitId:"1"
      },
       {
        unitId: "3",
        unitName: "Case",
        conversionToBase: 4,
        sellingPrice: 20.00,
        baseUnitId:"2"
      },
    ],
    quantity: 1000,
    cost: 0.8,
    category: {
      id: "1",
      name: "Beer"
    },
    createdAt: new Date("2025-08-27T00:00:00Z"),
    updatedAt: new Date("2023-08-27T00:00:00Z"),
    updatedBy: "Admin",
    createdBy: "Admin",
  },
  {
    id: "0012",
    name: "Hanuman Beer",
    sku: "HNB-001",
    description: "Description of Hanuman Beer",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    warehouse: {
      id: "1",
      name: "WatPhnom"
    },
    units: [
      {
        unitId: "1",
        unitName: "Can",
        conversionToBase: 1,
        sellingPrice: 2.00,
        baseUnitId:null,
      },
      {
        unitId: "2",
        unitName: "Box",
        conversionToBase: 6,
        sellingPrice: 12.00,
        baseUnitId:"1"
      },
       {
        unitId: "3",
        unitName: "Case",
        conversionToBase: 4,
        sellingPrice: 40.00,
        baseUnitId:"2"
      },
    ],
    quantity: 1000,
    cost: 0.8,
    category: {
      id: "1",
      name: "Beer"
    },
    createdAt: new Date("2025-08-27T00:00:00Z"),
    updatedAt: new Date("2023-08-27T00:00:00Z"),
    updatedBy: "Admin",
    createdBy: "Admin",
  },
  {
    id: "003",
    name: "ABC Beer",
    sku: "ABC-001",
    description: "Description of ABC Beer",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    warehouse: {
      id: "1",
      name: "WatPhnom"
    },
    units: [
      {
        unitId: "1",
        unitName: "Can",
        conversionToBase: 1,
        sellingPrice: 1.5,
        baseUnitId:null
      },
      {
        unitId: "2",
        unitName: "Case",
        conversionToBase: 1,
        sellingPrice: 32.00,
        baseUnitId:'1'
      },
    ],
    quantity: 1000,
    cost: 1.2,
    category: {
      id: "1",
      name: "Beer"
    },
    createdAt: new Date("2025-08-27T00:00:00Z"),
    updatedAt: new Date("2023-08-27T00:00:00Z"),
    updatedBy: "Admin",
    createdBy: "Admin",
  }

]


export const quotationData=[
  {
    id: "q-1756793587315",
    customer: {
      id: "3",
      name: "John Doe",
      gender: "Male",
      email: "john@gmail.com",
      age: 28,
      address: "789 Oak St",
      phoneNumber: "092 119 333",
      image: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    products: [
      {
        product: {
          id: "0012",
          sku: "HNB-001",
          name: "Hanuman Beer"
        },
        units: [
          {
            unitId: "3",
            unitName: "Case",
            quantity: 50,
            price: 40,
            subtotal: 2000
          }
        ],
        discount: 0,
        subtotal: 2000
      }
    ],
    totalAmount: 2000,
    discount: 0,
    tax: 0,
    note: "General Customer",
    status: "PENDING",
    quoteNo: "QT-0002",
    createdAt: "2025-09-02T06:13:07.315Z",
    updatedAt: "2025-09-02T06:13:07.315Z"
  },
  {
    id: "q-1756793568418",
    customer: {
      id: "1",
      name: "Sam Toal",
      gender: "Male",
      email: "toa@gmail.com",
      age: 30,
      address: "123 Main St",
      phoneNumber: "092 119 111",
      image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMCAyMXYtMmE0IDQgMCAwIDAtNC00SDhhNCA0IDAgMCAwLTQgNHYyIj48L3BhdGg+PGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0Ij48L2NpcmNsZT48L3N2Zz4="
    },
    products: [
      {
        product: {
          id: "003",
          sku: "ABC-001",
          name: "ABC Beer"
        },
        units: [
          {
            unitId: "1",
            unitName: "Can",
            quantity: 100,
            price: 1.5,
            subtotal: 150
          }
        ],
        discount: 0,
        subtotal: 150
      },
      {
        product: {
          id: "0012",
          sku: "HNB-001",
          name: "Hanuman Beer"
        },
        units: [
          {
            unitId: "2",
            unitName: "Box",
            quantity: 100,
            price: 12,
            subtotal: 1200
          },
          {
            unitId: "3",
            unitName: "Case",
            quantity: 100,
            price: 40,
            subtotal: 4000
          }
        ],
        discount: 0,
        subtotal: 5200
      }
    ],
    totalAmount: 5350,
    discount: 0,
    tax: 0,
    note: "Dealer Customer",
    status: "PENDING",
    quoteNo: "QT-0001",
    createdAt: "2025-09-02T06:12:48.418Z",
    updatedAt: "2025-09-02T06:12:48.418Z"
  }
]


//dashboard data
export const statsData: StatItem[] = [
      {
    key: "revenue",
    title: "Revenue",
    value: 45230,
    bg: "bg-green-500",
    icon: DollarOutlined,
    trend: 5.7,
    period: "vs last week",
    format: "currency",
  },
  {
    key: "customers",
    title: "Customers",
    value: 1240,
    bg: "bg-blue-500",
    icon: UserOutlined,
    trend: 12.5,
    period: "vs last week",
    format: "number",
  },
  {
    key: "orders",
    title: "Orders",
    value: 324,
    bg: "bg-orange-500",
    icon: ShoppingCartOutlined,
    trend: 8.3,
    period: "vs last week",
    format: "number",
  },

  {
    key: "quotaion",
    title: "Quotaions",
    value: 500,
    bg: "bg-sky-500",
    icon: ContainerOutlined,
    trend: -2.1,
    period: "vs last week",
    format: "number",
  },
  {
    key: "outofstock",
    title: "Out Of Stock",
    value: 12030,
    bg: "bg-red-500",
    icon: BoxIcon,
    trend: 3.2,
    period: "vs last week",
    format: "number",
    
  },
];


export const timeRangeOptions = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];



export const dayOfWeek:string[]=["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const months:string[]=[
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ]
export const workingHours=["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"]
export const orderSeriesDaily=[
      { name: "This Day", data: [35, 45, 55, 70, 65, 80, 75, 60, 50] },
      { name: "Previous Day", data: [30, 40, 50, 60, 55, 70, 65, 55, 45] }
    ];
export const orderSeriesWeekly=[
      { name: "This Week", data: [120, 200, 150, 80, 70, 110, 130] },
      { name: "Last Week", data: [90, 170, 130, 70, 60, 100, 110] },
    ]
export const orderSerialYearly=[
      {
        name: "This Year",
        data: [
          1100, 1200, 1050, 1400, 1300, 1600, 1500, 1700, 1650, 1800, 1750,
          1900,
        ],
      },
      {
        name: "Last Year",
        data: [
          900, 1000, 950, 1200, 1100, 1300, 1250, 1400, 1350, 1500, 1450, 1600,
        ],
      },
    ]

export const revenueSeriesDaily=[
      {
        name: "Revenue",
        data: [1200, 1800, 2100, 2900, 2500, 3200, 2800, 2200, 1800],
      },
    ];
export const revenueSeriesWeekly=[
  { name: "Revenue", data: [5200, 8100, 7200, 6800, 9300, 10200, 9800] },
]
export const revenueSeriesMonthly=[
      {
        name: "Revenue",
        data: [
          45230, 48210, 50120, 53210, 56230, 59340, 61230, 64210, 67120, 70210,
          73230, 76210,
        ],
      },
    ];
export const orderStatusSeriesData=[
  {
    name: "Shipped",
    data: [4, 10, 40, 100, 30, 30, 20],
  },
  {
    name: "Cancelled",
    data: [2, 3, 4, 5, 10, 3, 6],
  },
  {
    name: "Completed",
    data: [200, 332, 400, 220, 100, 300, 60],
  },
  {
    name: "Approved",
    data: [2, 3, 4, 5, 10, 3, 6],
  },
]

export const quotationSeriesData=[
  {
    name: "New",
    data: [40, 100, 40, 120, 30, 50, 20],
  },
  {
    name: "Moved",
    data: [20, 200, 40, 50, 100, 130, 60],
  },
  {
    name: "Dropped",
    data: [10, 20, 5, 20, 10, 10, 30],
  },
]

