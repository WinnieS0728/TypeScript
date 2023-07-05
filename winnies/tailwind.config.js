/** @type {import('tailwindcss').Config} */

import flagger from "tailwind-flagger";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  mode: "jit",
  purge: {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
  },
  theme: {
    extend: {},
  },
  plugins: [
    flagger
  ],
};
