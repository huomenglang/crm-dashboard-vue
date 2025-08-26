export interface Customer {
  id: string; // generated client-side
  name: string;
  gender: "Male" | "Female" | "Other";
  age: number;
  imageBase64: string; // data URL
}

export interface UpsertPayload {
  id?: string;
  name: string;
  gender?: "Male" | "Female" | "Other";
  age: number | null;
  imageBase64: string;
}

export const mockData: Customer[] = [
  {
    id: crypto.randomUUID(),
    name: "John Doe",
    gender: "Male",
    age: 28,
    imageBase64:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMCAyMXYtMmE0IDQgMCAwIDAtNC00SDhhNCA0IDAgMCAwLTQgNHYyIj48L3BhdGg+PGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0Ij48L2NpcmNsZT48L3N2Zz4=",
  },
  {
    id: crypto.randomUUID(),
    name: "Jane Smith",
    gender: "Female",
    age: 32,
    imageBase64:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMCAyMXYtMmE0IDQgMCAwIDAtNC00SDhhNCA0IDAgMCAwLTQgNHYyIj48L3BhdGg+PGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0Ij48L2NpcmNsZT48L3N2Zz4=",
  },
  {
    id: crypto.randomUUID(),
    name: "Robert Johnson",
    gender: "Male",
    age: 45,
    imageBase64:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMCAyMXYtMmE0IDQgMCAwIDAtNC00SDhhNCA0IDAgMCAwLTQgNHYyIj48L3BhdGg+PGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0Ij48L2NpcmNsZT48L3N2Zz4=",
  },
];

const KEY = "customer";
export function ensureSeed() {
  const raw = localStorage.getItem(KEY);
  if (!raw) {
    localStorage.setItem(KEY, JSON.stringify(mockData));
  }
}

export function getAll(): Customer[] {
  ensureSeed();
  const raw = localStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as Customer[]) : [];
}

export function saveAll(list: Customer[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function createOne(data: Omit<Customer, "id">): Customer {
  const all = getAll();
  const item: Customer = { id: crypto.randomUUID(), ...data };
  all.unshift(item);
  saveAll(all);
  return item;
}

export function updateOne(
  id: string,
  patch: Partial<Customer>
): Customer | null {
  const all = getAll();
  const idx = all.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  const updated = { ...all[idx], ...patch };
  all[idx] = updated;
  saveAll(all);
  return updated;
}
export function deleteOne(id: string) {
const all = getAll().filter(c => c.id !== id)
saveAll(all)
}
