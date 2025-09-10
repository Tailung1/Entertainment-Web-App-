/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./frontend/src/**/*.{js,ts,jsx,tsx}", // Looks for JS, TS, JSX, and TSX files inside 'frontend/src/'
    "./index.html", // Looks for index.html inside the 'frontend' folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
