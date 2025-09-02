
export interface Customer {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface Unit {
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

export interface QuotationProduct {
  product: Product;
  units: Unit[];
  discount?: number;
  subtotal: number;
}

export type Status =
  | "PENDING"
  | "DROP"
  | "APPROVE";

export enum QuoteStatus{
  PENDING='PENDING',
  DROP='DROP',
  APPROVED='APPROVE'
}
export interface Quotation {
  id: string;
  quoteNo: string;
  customer: Customer;
  status: QuoteStatus;
  products: QuotationProduct[];
  totalAmount: number;
  discount?: number;
  tax?: number;
  note?:string;
  createdAt?: string;
  droppedBy?:string
  updatedAt?: string;
  approvedBy?: string;
  createdBy?: string;
}