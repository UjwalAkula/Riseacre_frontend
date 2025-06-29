/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This line tells Tailwind to look inside your src folder for JS, TS, JSX, and TSX files.
  ],
  theme: {
    extend: {
      colors: {
        primary: '#055CB4', // You can name it anything, like 'primary'
      },
      // You can define custom colors, fonts, spacing, etc. here
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'], // Add Roboto to your font family
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'), // Add the line-clamp plugin here
  ],
}