import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'media',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // CSS変数ベースのカラー
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        "muted-bg": "var(--muted-bg)",
        "muted-text": "var(--muted-text)",
        "border-color": "var(--border-color)",
        "border-accent": "var(--border-accent)",
        "code-bg": "var(--code-bg)",
        "code-text": "var(--code-text)",
        "inline-code-bg": "var(--inline-code-bg)",
        "inline-code-text": "var(--inline-code-text)",

        // 既存のブランドカラー
        secondary: "#7ab6a9",
        accent: "#0f4c54",

        // セマンティックカラー
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
        info: "#3b82f6",

        // Tailwind互換エイリアス
        border: "var(--border-color)",
        muted: "var(--muted-text)",
        "muted-foreground": "var(--muted-text)",
        "muted-background": "var(--muted-bg)",
      },
      fontFamily: {
        'noto-sans-jp': ['var(--font-noto-sans-jp)', 'sans-serif'],
        'josefin-sans': ['var(--font-josefin-sans)', 'sans-serif'],
        'sans': ['var(--font-josefin-sans)', 'var(--font-noto-sans-jp)', 'sans-serif'],
      },
      textShadow: {
        'lg': '0 10px 15px rgba(0, 0, 0, 0.3), 0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      dropShadow: {
        '3xl': '0 35px 70px rgba(0, 0, 0, 0.25)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, transparent 0%, rgba(0, 0, 0, 0.5) 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
