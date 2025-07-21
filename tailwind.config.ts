import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#1e646e",
        secondary: "#7ab6a9",
      },
      fontFamily: {
        'noto-sans-jp': ['var(--font-noto-sans-jp)', 'sans-serif'],
        'josefin-sans': ['var(--font-josefin-sans)', 'sans-serif'],
        'sans': ['var(--font-josefin-sans)', 'var(--font-noto-sans-jp)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
