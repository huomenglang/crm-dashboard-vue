/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
       fontFamily: {
        kantumruy: ["Roboto","Kantumruy","cursive", "sans-serif"],
        Roboto:["Roboto", "sans-serif"]
      },
      colors: {
        "regal-blue": "#243c5a",
        background: "rgb(235,235,235)",
        telegram: "var(--tg-theme-bg-color)",
        "red-btn": "#E94560",
        "red-ring": "#F67280",
        "blue-btn": "#1597BB",
        "blue-ring": "#51C4D3",
        "gray-color": "#8C9AA7",
        "border-color": "#C6CED6",
        "blue-color": "#59A3E8",
        "black-color": "#1D1A1A",
        "red-color": "#FF7777",
        "light-gray": "#C6CED6",
        "light-blue": "#F7FBFF",
        "bg-card": "rgb(245, 245, 247)",
        "text-note": "#8E959C",
        "light-blue-dark": "rgba(246, 251, 255,0.1)",
        "light-dark": "rgba(246, 251, 255,0.5)",
      },
    },
  },
  plugins: [],
  important: true,
};
