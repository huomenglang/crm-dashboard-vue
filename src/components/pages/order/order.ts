import type { BaseModel } from "@/models/baesModel";

// Product with Multiple Units
export interface OrderProductRequest {
  productId: string;            // e.g. "PROD-001"
  units: OrderUnit[];    // list of selected units
}

// Final Order Payload
export interface OrderRequest extends Omit<BaseModel,'id'>{
  customerId: string;                  // e.g. "CUST-001"              
  products: OrderProductRequest[];     // multiple products
  note?: string;    
  status:OrderStatus;
                 
}

// --------------------------new test ui----------------------------
// types.ts
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
}

export interface OrderUnit {
  unitId: string;
  unitName: string;
  quantity: number;
  price: number;
  baseUnitId: string;
  baseUnitQuantity: number;
  subtotal: number;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
}

export interface OrderProduct {
  product: Product;
  units: OrderUnit[];
  discount?: number;
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
  customer: Customer;
  status: OrderStatus;
  products: OrderProduct[];
  totalAmount: number;
  discount?: number;
  tax?: number;
  createdAt: string;
  updatedAt: string;
  approvedBy?: string;
  verifiedBy?:string;
  shippedBy?: string;
  completedBy?: string;
  cancelledBy?: string;
  createdBy?: string;
}