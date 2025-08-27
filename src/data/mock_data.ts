import type { CategoryProps } from "@/components/pages/category/category";
import type { Customer } from "@/components/pages/customer/customer";
import type { ProductResponse } from "@/components/pages/product/product";
import type { Supplier } from "@/components/pages/supplier/supplier";
import type { UmsProps } from "@/components/pages/ums/ums";
import type { WarehouseProps } from "@/components/pages/warehouse/warehouse";

export const customerData: Customer[] = [
  {
    id: "1",
    firstname: "Tola",
    lastname: "Sam",
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
    firstname: "Sophea",
    lastname: "Tan",
    gender: "Female",
    email: "sophea@gmail.com",
    age: 25,
    address: "456 Elm St",
    phoneNumber: "092 119 222",

    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: "3",
    firstname: "John",
    lastname: "Doe",
    gender: "Male",
    email: "john@gmail.com",
    age: 28,
    address: "789 Oak St",
    phoneNumber: "092 119 333",

    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: "4",
    firstname: "Jane",
    lastname: "Smith",
    gender: "Female",
    email: "jane@gmail.com",
    age: 22,
    address: "321 Pine St",
    phoneNumber: "092 119 444",

    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: "5",
    firstname: "Michael",
    lastname: "Johnson",
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
    name: "កំប៉ុង",
    description: "ខ្នាតទូទៅ",
  },
  {
    id: "2",
    name: "កញ្ចប់",
    description: "ខ្នាតទូទៅ",
  },
  {
    id: "6",
    name: "ឡូ",
    description: "ខ្នាតទូទៅ",
  },
  {
    id: "3",
    name: "ដុំ",
    description: "ខ្នាតទូទៅ",
  },
  {
    id: "4",
    name: "កេស",
    description: "ខ្នាតទូទៅ",
  },
  {
    id: "5",
    name: "យួរ",
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
    id: "1",
    name: "Pepsi",
    description: "Description of Pepsi",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    warehouse: {
      id: "1",
      name: "WatPhnom"
    },
    units: [
      {
        unitId: "1",
        unitName: "កំប៉ុង",
        conversionToBase: 1,
        sellingPrice: 1.00,
      },
      {
        unitId: "2",
        unitName: "កេស",
        conversionToBase: 1,
        sellingPrice: 22.00,
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
    id: "2",
    name: "Hanuman Beer",
    description: "Description of Hanuman Beer",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    warehouse: {
      id: "1",
      name: "WatPhnom"
    },
    units: [
      {
        unitId: "1",
        unitName: "កំប៉ុង",
        conversionToBase: 1,
        sellingPrice: 1.00,
      },
      {
        unitId: "2",
        unitName: "កេស",
        conversionToBase: 1,
        sellingPrice: 22.00,
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
    id: "1",
    name: "ABC Beer",
    description: "Description of ABC Beer",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    warehouse: {
      id: "1",
      name: "WatPhnom"
    },
    units: [
      {
        unitId: "1",
        unitName: "កំប៉ុង",
        conversionToBase: 1,
        sellingPrice: 1.5,
      },
      {
        unitId: "2",
        unitName: "កេស",
        conversionToBase: 1,
        sellingPrice: 32.00,
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


