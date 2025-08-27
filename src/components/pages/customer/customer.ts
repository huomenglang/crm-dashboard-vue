

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

