import { KEY } from "./Key";
import { categoryData, customerData, productData, supplierData, UmsData, warehouseData } from "./mock_data";

const getDataByKey = (key: string) => {
  if (key === KEY.CUSTOMER) return customerData;
  if (key === KEY.CATEGORY) return categoryData;
  if (key === KEY.UNIT) return UmsData;
  if (key === KEY.SUPPLIER) return supplierData;
  if (key === KEY.WAREHOUSE) return warehouseData;
  if (key === KEY.PRODUCT) return productData;
  if (key=== KEY.QUOTATION) return []
};

const DEFAULT_KEY = KEY.CUSTOMER;
export function ensureSeed(key?: string) {
  console.log("Ensuring seed data...", key);
  const raw = localStorage.getItem(key || DEFAULT_KEY);
  if (!raw) {
    localStorage.setItem(key || DEFAULT_KEY, JSON.stringify(getDataByKey(key || DEFAULT_KEY)));
  }
}

export function getAll(key?: string): any[] {
  console.log("Getting all data...", key);
  if (!key) key = KEY.CUSTOMER;
  ensureSeed(key);
  const raw = localStorage.getItem(key || KEY.CUSTOMER);
  return raw ? (JSON.parse(raw) as any[]) : [];
}

export function saveAll(list: any[], key?: string) {
  if (!key) key = KEY.CUSTOMER;
  localStorage.setItem(key || KEY.CUSTOMER, JSON.stringify(list));
}

export function createOne(data: Omit<any, "id">, key?: string): any {
  if (!key) key = KEY.CUSTOMER;
  const all = getAll(key);
  const item: any = { id: crypto.randomUUID(), ...data };
  all.unshift(item);
  saveAll(all, key);
  return item;
}

export function updateOne(id: string, patch: any, key?: string): any | null {
  const all = getAll(key);
  const idx = all.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  const updated = { ...all[idx], ...patch };
  all[idx] = updated;
  saveAll(all, key);
  return updated;
}
export function deleteOne(id: string, key?: string) {
  const all = getAll(key).filter((c) => c.id !== id);
  saveAll(all, key);
}
