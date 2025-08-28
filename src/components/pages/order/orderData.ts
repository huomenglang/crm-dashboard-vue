// sampleOrders.ts

import type { Order } from "./order";

export const sampleOrders: Order[] = [
  {
    orderId: "1",
    orderNo: "ORD-1001",
    customerName: "Alice Johnson",
    createdAt: "2025-08-10",
    status: "CREATED",
    products: [
      {
        productId: "p1",
        sku: "SKU-123",
        productName: "Coca Cola",
        units: [
          { unitId: "u1", unitName: "Can", quantity: 12, price: 0.5, subtotal: 6 },
          { unitId: "u2", unitName: "Case", quantity: 2, price: 10, subtotal: 20 },
        ],
        discount: 5,
        tax: 10,
        subtotal: 24,
      },
    ],
    totalAmount: 26.4,
  },
  {
    orderId: "2",
    orderNo: "ORD-1002",
    customerName: "Bob Smith",
    createdAt: "2025-08-09",
    status: "STOCK_VERIFIED",
    products: [
      {
        productId: "p2",
        sku: "SKU-456",
        productName: "Pepsi",
        units: [
          { unitId: "u3", unitName: "Bottle", quantity: 24, price: 1.2, subtotal: 28.8 },
        ],
        tax: 10,
        subtotal: 28.8,
      },
      {
        productId: "p3",
        sku: "SKU-789",
        productName: "Sprite",
        units: [
          { unitId: "u4", unitName: "Big Case", quantity: 1, price: 15, subtotal: 15 },
        ],
        subtotal: 15,
      },
    ],
    totalAmount: 48.18,
    approvedBy: "Manager Tom",
  },

];
