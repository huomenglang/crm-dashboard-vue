
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



export enum orderStatus {
    PENDING='PENDING',
    CREATE = 'CREATE',
    PROCESSING = 'STOCK_VERIFIED',
    APPROVED = 'APPROVED',
    SHIPPED = 'SHIPPED',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
};

// Unit in a quotation
export interface QuotationUnit {
  unitId: string;
  unitName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  baseUnitId: string;
  baseUnitQuantity: number;
}

// Product in a quotation
export interface QuotationProduct {
  productId: string;
  productName: string;
  units: QuotationUnit[];
  subtotal: number;
}

// Full quotation
export interface Quotation {
  quotationId: string;
  customerId: string;
  quotationDate: string;
  products: QuotationProduct[];
  totalAmount: number;
  paymentMethod: "CASH" | "CARD" | "TRANSFER";
  note?: string;
  status: "DRAFT" | "SENT" | "APPROVED" | "REJECTED"; // quotation status
}

// QuotationRequest.ts
export interface QuotationItemUnitRequest {
  unitId: string;   // selected unit (e.g., bottle, box, case)
  quantity: number; // quantity in that unit
}

export interface QuotationItemRequest {
  productId: string; // reference to product
  units: QuotationItemUnitRequest[]; // multiple units selected for the same product
}

export interface QuotationRequest {
  customerId: string;
  quotationDate: string;  // ISO date string (yyyy-MM-dd)
  status: "DRAFT" | "SENT" | "APPROVED" | "REJECTED"; // default DRAFT
  items: QuotationItemRequest[]; // list of products in this quotation
  notes?: string; // optional field
}
