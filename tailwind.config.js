/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xl': '1400px',
        'lg': '1024px',
        'md': '835px',
        'sm': '660px',
      },
    },
  },
  plugins: [],
}