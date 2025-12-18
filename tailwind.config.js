/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'candlelight': '#FFCE1A',
        'old-gold': '#D3B038',
        'black': '#000000',
      },
    },
  },
  plugins: [],
}

