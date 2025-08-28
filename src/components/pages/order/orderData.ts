import type { Customer, Order, Product } from "./order";


import type { OrderProduct, OrderUnit } from './order'

export const mockCustomer: Customer = {
  customerId: 'CUST-001',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  address: '123 Main St, Anytown, USA'
}

export const mockProducts: Product[] = [
  {
    productId: 'PROD-001',
    sku: 'SKU-001',
    name: 'Premium Coffee Beans'
  },
  {
    productId: 'PROD-002',
    sku: 'SKU-002',
    name: 'Tea Selection Box'
  },
  {
    productId: 'PROD-003',
    sku: 'SKU-003',
    name: 'Ceramic Coffee Mug'
  }
]

export const mockOrderUnits: OrderUnit[] = [
  {
    unitId: 'UNIT-001',
    unitName: 'Bag',
    quantity: 2,
    price: 12.99,
    baseUnitId: 'UNIT-BAG',
    baseUnitQuantity: 2,
    subtotal: 25.98
  },
  {
    unitId: 'UNIT-002',
    unitName: 'Box',
    quantity: 1,
    price: 24.99,
    baseUnitId: 'UNIT-BOX',
    baseUnitQuantity: 1,
    subtotal: 24.99
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
    units: [mockOrderUnits[1]],
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
        units: [{
          unitId: 'UNIT-003',
          unitName: 'Piece',
          quantity: 4,
          price: 8.99,
          baseUnitId: 'UNIT-PIECE',
          baseUnitQuantity: 4,
          subtotal: 35.96
        }],
        subtotal: 35.96
      }
    ],
    totalAmount: 35.96,
    createdAt: '2023-05-16T14:45:00Z',
    updatedAt: '2023-05-16T15:30:00Z',
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
    createdBy: 'user123'
  }
]