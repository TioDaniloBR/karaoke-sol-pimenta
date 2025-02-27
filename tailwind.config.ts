import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Saira Extra Condensed",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },

      colors: {
        primary: "#FFFF15",
        secondary: "#00FFFF",
        body: "rgb(3 7 18 / var(--tw-bg-opacity, 1))",
      },
      boxShadow: {
        blurred: "0px 0px 5px 2px rgba(255,255,21,0.75)",
      },
    },
  },
  plugins: [],
} satisfies Config;
