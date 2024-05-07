/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    darkMode: "selector",
    colors: {
      inherit: colors.inherit,
      transparent: colors.transparent,
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,
      red: colors.red,
    },
    fontFamily: {
      poppins: ["Poppins", "system-ui"],
    },
    fontSize: {
      10: "10px",
      ...defaultTheme.fontSize,
    },
    extend: {
      spacing: {
        50: "50px",
        100: "100px",
        450: "450px",
      },
    },
  },
  plugins: [],
};
