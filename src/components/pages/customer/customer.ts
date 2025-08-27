import type { TableColumnsType } from "ant-design-vue";


export interface Customer {
  id: string; // generated client-side
  firstname: string;
  lastname: string;
  gender: "Male" | "Female" | "Other";
  email: string;
  phoneNumber: string;
  address?: string;
  age: number;
  image: string; // data URL
}

export const columns: TableColumnsType<Customer> = [
  { title: "First Name", width: 60, dataIndex: "firstname", key: "firstname" },
  { title: "Last Name", width: 60, dataIndex: "lastname", key: "lastname" },
  { title: "Gender", width: 50, dataIndex: "gender", key: "gender" },
  { title: "Age", dataIndex: "age", key: "age", width: 80 },
  { title: "Email", dataIndex: "email", key: "email", width: 100 },
  { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber", width: 100 },
  { title: "Address", dataIndex: "address", key: "address", width: 100 },
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