/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'parallax': 'url(./src/assets/freepikAurora1.jpg)',
        'parallax1': 'url(./src/assets/webPic1.png)',
      },
    },
  },
  plugins: [],
}