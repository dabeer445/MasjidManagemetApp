import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#e6f1ff',
          100: '#cce4ff',
          200: '#99c8ff',
          300: '#66adff',
          400: '#3391ff',
          500: '#0076ff',
          600: '#005ecc',
          700: '#004799',
          800: '#002f66',
          900: '#001833',
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};