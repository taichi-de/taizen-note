/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      gray: "#d9d9d9",
      main: "#F6F5F5",
      secondary: "#D3E0EA",
      third: "#1687A7",
      fourth: "#276678",
      title: "#3f3f3f",
      sub: "#7f7f7f",
      content: "#4f4f4f",
      pink: "#EA1179",
      yellow: "#FFA41B",
      blue: "#00A8CC",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/typography"),
  ],
};
