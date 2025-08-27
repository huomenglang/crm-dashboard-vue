
import type { TableColumnsType } from "ant-design-vue";
import type { CategoryProps } from "../category/category";
import type { BaseModel } from "@/models/baesModel";
import type { WarehouseProps } from '../warehouse/warehouse';

export interface Product extends BaseModel {
  name: string;
  category: CategoryProps;
  description?: string;
  image?: string; // data URL
}

export interface ProductUnit {
  unitId: string;
  unitName: string;
  conversionToBase: number;
  sellingPrice: number;
}

export interface ProductResponse extends Product {
  warehouse: WarehouseProps;
  units: ProductUnit[];
  quantity: number;
  cost: number;
}

export interface ProductRequest extends Omit<Product, 'id' | 'category'> {
  baseUnitId: string;
  warehouseId: string;
  categoryId: string;
  units: ProductUnit[];
}

export const columns: TableColumnsType<ProductResponse> = [
  { title: "Name", width: 60, dataIndex: "name", key: "name" },
  { title: "Warehouse", width: 60, dataIndex: "warehouse.name", key: "warehouse.name" },
  // { title: "Units", width: 50, dataIndex: "units", key: "units" },
  // { title: "Quantity", dataIndex: "quantity", key: "quantity", width: 80 },
  { title: "Cost", dataIndex: "cost", key: "cost", width: 100 },
  { title: "Category", dataIndex: "category.name", key: "category.name", width: 100 },
  {
    title: "Profile",
    dataIndex: "image",
    key: "image",
    width: 50,
   },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 120,
  },
];