
// Basic Unit in an Order
export interface OrderUnitRequest {
  unitId: string;   // e.g. "UNIT-BOX", "UNIT-BOTTLE"
  quantity: number; // quantity of that unit
}

// Product with Multiple Units
export interface OrderProductRequest {
  productId: string;            // e.g. "PROD-001"
  units: OrderUnitRequest[];    // list of selected units
}

// Final Order Payload
export interface OrderRequest {
  customerId: string;                  // e.g. "CUST-001"
  orderDate: string;                   // e.g. "2025-08-28"
  products: OrderProductRequest[];     // multiple products
  note?: string;                       // optional remarks
}

// Unit in an order response
export interface OrderUnitResponse {
  unitId: string;           // e.g., "UNIT-BOX"
  unitName: string;         // e.g., "Box"
  quantity: number;         // how many units ordered
  unitPrice: number;        // price per unit
  subtotal: number;         // unitPrice * quantity
  baseUnitId: string;       // e.g., "UNIT-BOTTLE"
  baseUnitQuantity: number; // quantity in base unit (e.g., 2 Box = 20 Bottles)
}

// Product in an order response
export interface OrderProductResponse {
  productId: string;             // e.g., "PROD-001"
  productName: string;           // e.g., "Coca Cola"
  units: OrderUnitResponse[];    // all selected units for this product
  subtotal: number;              // sum of all units subtotal
}

// Full order response
export interface OrderResponse {
  orderId: string;                     // e.g., "ORD-1001"
  customerId: string;                  // e.g., "CUST-001"
  orderDate: string;                   // e.g., "2025-08-28"
  products: OrderProductResponse[];    // products in the order
  totalAmount: number;                 // sum of all product subtotals
  paymentMethod: string;               // e.g., "CASH"
  note?: string;                       // optional remark
}


// --------------------------new test ui----------------------------
// types.ts
export interface OrderUnit {
  unitId: string;
  unitName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface OrderProduct {
  productId: string;
  sku: string;
  productName: string;
  units: OrderUnit[];
  discount?: number; // %
  tax?: number; // %
  subtotal: number;
}

export type OrderStatus =
  | "CREATED"
  | "STOCK_VERIFIED"
  | "APPROVED"
  | "SHIPPED"
  | "COMPLETED"
  | "CANCELLED";

export interface Order {
  orderId: string;
  orderNo: string;
  customerName: string;
  createdAt: string;
  status: OrderStatus;
  products: OrderProduct[];
  totalAmount: number;
  discount?: number;
  tax?: number;
  approvedBy?: string;
  shippedBy?: string;
  completedBy?: string;
  cancelledBy?: string;
}
