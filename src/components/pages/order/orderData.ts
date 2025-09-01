import type { Customer, Order, Product } from "./order";


import type { OrderProduct, OrderUnit } from './order'
import { productData } from "@/data/mock_data";

export const mockCustomer: Customer = {
  customerId: 'CUST-001',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  address: '123 Main St, Anytown, USA'
}

export const mockProducts: Product[] = [
  {
    productId: "001",
    name: "Pepsi",
    sku: "PEP-001",
  },
  {
    productId: "0012",
    name: "Hanuman Beer",
    sku: "HNB-001",
  },
  {
    productId: "003",
    name: "ABC Beer",
    sku: "ABC-001",
  }
]

export const mockOrderUnits: OrderUnit[] = [
  {
    unitId: '1',
    unitName: 'Can',
    quantity: 2,
    price: 1,
    baseUnitId: '',
    baseUnitQuantity: 1,
    subtotal: 2.00
  },
  {
    unitId: '3',
    unitName: 'Case',
    quantity: 10,
    price: 6.0,
    baseUnitId: 'UNIT-001',
    baseUnitQuantity: 6,
    subtotal: 60.00
  }
]

export const mockOrderProducts: OrderProduct[] = [
  {
    product: mockProducts[0],
    units: mockOrderUnits,
    discount: 10,
    subtotal: 23.38
  },
  {
    product: mockProducts[1],
    units: [mockOrderUnits[0]],
    discount:0,
    subtotal: 24.99
  }
]

export const mockOrders: Order[] = [
  {
    orderId: 'ORDER-001',
    orderNo: 'INV-2023-001',
    customer: mockCustomer,
    status: 'CREATED',
    products: mockOrderProducts,
    totalAmount: 48.37,
    discount: 5,
    tax: 2.42,
    createdAt: '2023-05-15T10:30:00Z',
    updatedAt: '2023-05-15T10:30:00Z',
    createdBy: 'user123'
  },
  {
    orderId: 'ORDER-002',
    orderNo: 'INV-2023-002',
    customer: {
      customerId: 'CUST-002',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1 (555) 987-6543',
      address: '456 Oak Ave, Somewhere, USA'
    },
    status: 'APPROVED',
    products: [
      {
        product: mockProducts[2],
        units: [mockOrderUnits[0]],
        subtotal: 35.96
      }
    ],
    totalAmount: 35.96,
    createdAt: '2023-05-16T14:45:00Z',
    updatedAt: '2023-05-16T15:30:00Z',
    verifiedBy:"user777",
    createdBy: 'user456',
    approvedBy: 'admin001'
  },
  {
    orderId: 'ORDER-003',
    orderNo: 'INV-2023-003',
    customer: {
      customerId: 'CUST-003',
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      phone: '+1 (555) 456-7890',
      address: '789 Pine Rd, Nowhere, USA'
    },
    status: 'SHIPPED',
    products: mockOrderProducts,
    totalAmount: 48.37,
    discount: 5,
    tax: 2.42,
    createdAt: '2023-05-14T09:15:00Z',
    updatedAt: '2023-05-17T11:20:00Z',
    createdBy: 'user789',
    verifiedBy:"user777",
    approvedBy: 'admin001',
    shippedBy: 'shipper002'
  },
  {
    orderId: 'ORDER-004',
    orderNo: 'INV-2023-004',
    customer: mockCustomer,
    status: 'COMPLETED',
    products: [mockOrderProducts[0]],
    totalAmount: 23.38,
    discount: 10,
    tax: 1.17,
    createdAt: '2023-05-10T08:00:00Z',
    updatedAt: '2023-05-18T16:45:00Z',
    createdBy: 'user123',
    approvedBy: 'admin001',
    shippedBy: 'shipper002',
    completedBy: 'admin001'
  },
  {
    orderId: 'ORDER-005',
    orderNo: 'INV-2023-005',
    customer: {
      customerId: 'CUST-004',
      name: 'Alice Williams',
      email: 'alice.williams@example.com',
      phone: '+1 (555) 321-6547',
      address: '321 Elm St, Anywhere, USA'
    },
    status: 'CANCELLED',
    products: mockOrderProducts,
    totalAmount: 48.37,
    discount: 5,
    tax: 2.42,
    createdAt: '2023-05-17T13:20:00Z',
    updatedAt: '2023-05-17T14:05:00Z',
    createdBy: 'user456',
    cancelledBy: 'user456'
  },
  {
    orderId: 'ORDER-006',
    orderNo: 'INV-2023-006',
    customer: {
      customerId: 'CUST-005',
      name: 'Charlie Brown',
      email: 'charlie.brown@example.com',
      phone: '+1 (555) 654-9870',
      address: '654 Maple Dr, Elsewhere, USA'
    },
    status: 'STOCK_VERIFIED',
    products: [mockOrderProducts[1]],
    totalAmount: 24.99,
    createdAt: '2023-05-18T10:00:00Z',
    updatedAt: '2023-05-18T11:30:00Z',
    verifiedBy:'user777',
    createdBy: 'user123'
  }
]