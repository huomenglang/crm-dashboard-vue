import type { TableColumnsType } from "ant-design-vue";


export interface Supplier {
  id: string; // generated client-side
  name: string;
  gender: "Male" | "Female" | "Other";
  phoneNumber: string;
  address?: string;
  description?: string;
  image: string; // data URL
}

export const columns: TableColumnsType<Supplier> = [
  { title: "Name", width: 60, dataIndex: "name", key: "name" },
  { title: "Gender", width: 50, dataIndex: "gender", key: "gender" },
  { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber", width: 100 },
  { title: "Address", dataIndex: "address", key: "address", width: 100 },
  { title: "Description", dataIndex: "description", key: "description", width: 100 },
  { title: "Profile", dataIndex: "image", key: "image", width: 50 },
   
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 120,
  },
];