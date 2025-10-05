/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        welcome: "#1D3708",
        white50: "#d9ecff",
        blue: {
          50: "#839cb5",
          100: " #2d2d38",
        },
      },
    },
  },
  plugins: [],
};
