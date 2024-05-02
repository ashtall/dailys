/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      gridTemplateRows: {
        'auto-grid-rows': '75px 5px auto',
        'auto-2': '10% auto'
      },
      gridTemplateColumns: {
        'auto-grid-cols': '40% 5px auto',
      }
    },
    colors: {
      'true-black': '#000000',
      'black': '#1C1C1C',
      'yellow': '#E2E200',
      'purple': '#4c1d95',
      'light-purple': '#7c3aed',
      'white': "#FFFFFF"
    }
  },
  plugins: [require("tailwindcss-text-border"),require('tailwind-scrollbar'),],
};
