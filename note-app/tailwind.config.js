/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // For all your React components
    "./public/index.html", // If you want to scan for classes in public/index.html
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};