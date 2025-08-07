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
        // ブランドカラー
        primary: "#1e646e",
        secondary: "#7ab6a9",
        accent: "#0f4c54", // primary/90相当
        
        // セマンティックカラー
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
        info: "#3b82f6",
        
        // ニュートラルカラー（Gray系統一）
        foreground: "#111827",        // gray-900相当
        "muted-foreground": "#4b5563", // gray-600相当  
        muted: "#6b7280",             // gray-500相当
        border: "#e5e7eb",            // gray-200相当
        background: "#ffffff",
        "muted-background": "#f9fafb", // gray-50相当
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
