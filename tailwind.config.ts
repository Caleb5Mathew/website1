import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        romantic: {
          cream: "#FFF8F5",
          blush: "#FFB6C1",
          rose: "#E75480",
          deep: "#4A1C40",
        },
      },
    },
  },
  plugins: [],
};
export default config;
