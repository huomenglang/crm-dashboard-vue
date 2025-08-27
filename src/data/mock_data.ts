import type { CategoryProps } from "@/components/pages/category/category";
import type { Customer } from "@/components/pages/customer/customer";
import type { UmsProps } from "@/components/pages/ums/ums";

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

export const UmsData: UmsProps[] = [
  {
    id: "1",
    name: "កំប៉ុង",
    description: "ខ្នាតទូទៅ",
  },
  {
    id: "2",
    name: "កញ្ចប់",
    description: "ខ្នាតទូទៅ",
  },
  {
    id: "2",
    name: "ឡូ",
    description: "ខ្នាតទូទៅ",
  },
  {
    id: "3",
    name: "ដុំ",
    description: "ខ្នាតទូទៅ",
  },
  {
    id: "4",
    name: "កេស",
    description: "ខ្នាតទូទៅ",
  },
  {
    id: "5",
    name: "យួរ",
    description: "ខ្នាតទូទៅ",
  },
];
