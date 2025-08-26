import type { CategoryProps } from "../category/category";

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

export const customerData: Customer[] = [
  {
    id: "1",
    firstname: "Tola",
    lastname: "Sam",
    gender: "Male",
    email: "toa@gmail.com",
    age: 30,
    address: "123 Main St",
    phoneNumber: "092 119 111",
    image:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMCAyMXYtMmE0IDQgMCAwIDAtNC00SDhhNCA0IDAgMCAwLTQgNHYyIj48L3BhdGg+PGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0Ij48L2NpcmNsZT48L3N2Zz4=",
  },
  {
    id: "2",
    firstname: "Sophea",
    lastname: "Tan",
    gender: "Female",
    email: "sophea@gmail.com",
    age: 25,
    address: "456 Elm St",
    phoneNumber: "092 119 222",

    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: "3",
    firstname: "John",
    lastname: "Doe",
    gender: "Male",
    email: "john@gmail.com",
    age: 28,
    address: "789 Oak St",
    phoneNumber: "092 119 333",

    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: "4",
    firstname: "Jane",
    lastname: "Smith",
    gender: "Female",
    email: "jane@gmail.com",
    age: 22,
    address: "321 Pine St",
    phoneNumber: "092 119 444",

    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: "5",
    firstname: "Michael",
    lastname: "Johnson",
    gender: "Male",
    email: "michael@gmail.com",
    age: 35,
    address: "654 Maple St",
    phoneNumber: "092 119 555",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
];
export const categoryData: CategoryProps[] = [
  {
    id: "1",
    name: "Juice",
    image:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMCAyMXYtMmE0IDQgMCAwIDAtNC00SDhhNCA0IDAgMCAwLTQgNHYyIj48L3BhdGg+PGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0Ij48L2NpcmNsZT48L3N2Zz4=",
    description: "A refreshing juice made from the finest fruits.",
  },
  {
    id: "2",
    name: "Beer",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    description: "A passionate software engineer.",
  },
  {
    id: "2",
    name: "Cookies",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    description: "A delicious chocolate chip cookie.",
  },
  {
    id: "3",
    name: "Soap",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    description: "A software engineer with a passion for coding.",
  },
  {
    id: "4",
    name: "Whisky",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    description: "A talented graphic designer.",
  },
  {
    id: "5",
    name: "Cleanser",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    description: "A project manager with a knack for leadership.",
  },
];
const getDataByKey = (key: string) => {
  if (key === "customer") return customerData;
  if (key === "category") return categoryData;
};

const KEY = "customer";
export function ensureSeed(key?: string) {
  console.log("Ensuring seed data...", key);
  const raw = localStorage.getItem(key || KEY);
  if (!raw) {
    localStorage.setItem(key || KEY, JSON.stringify(getDataByKey(key || KEY)));
  }
}

export function getAll(key?: string): any[] {
  console.log("Getting all data...", key);
  if (!key) key = KEY;
  ensureSeed(key);
  const raw = localStorage.getItem(key || KEY);
  return raw ? (JSON.parse(raw) as any[]) : [];
}

export function saveAll(list: any[], key?: string) {
  if (!key) key = KEY;
  localStorage.setItem(key || KEY, JSON.stringify(list));
}

export function createOne(data: Omit<any, "id">, key?: string): any {
  if (!key) key = KEY;
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
