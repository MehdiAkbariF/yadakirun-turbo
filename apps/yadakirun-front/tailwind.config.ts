import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // مسیر فایل‌های شما جهت اسکن کلاس‌ها
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../apps/**/*.{js,ts,jsx,tsx,mdx}", 
  ],
  theme: {
    extend: {
      colors: {
        // --- 1. Brand Colors ---
        brand: {
          primary: "var(--color-brand-primary)",
          secondary: "var(--color-brand-secondary)",
          accent: "var(--color-brand-accent)",
        },

        // --- 2. Text Colors ---
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          placeholder: "var(--color-text-placeholder)",
          "on-brand": "var(--color-text-on-brand)",
          link: "var(--color-text-link)",
          disabled: "var(--color-text-disabled)",
        },

        // --- 3. Background Colors ---
        // ✅ این بخش کلاس bg-bg-secondary را می‌سازد
        bg: {
          body: "var(--color-bg-body)",
          surface: "var(--color-bg-surface)",
          secondary: "var(--color-bg-secondary)", // کلاس: bg-bg-secondary
          accent: "var(--color-bg-accent)",
          "surface-hover": "var(--color-bg-surface-hover)",
        },
        // برای دسترسی مستقیم (مثلاً bg-surface)
        surface: "var(--color-bg-surface)",

        // --- 4. Border Colors ---
        border: {
          primary: "var(--color-border-primary)",
          secondary: "var(--color-border-secondary)",
        },

        // --- 5. Utility Colors ---
        utility: {
          success: "var(--color-utility-success)",
          error: "var(--color-utility-error)",
          warning: "var(--color-utility-warning)",
          info: "var(--color-utility-info)",
        },
      },

      // --- Border Radius ---
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        full: "9999px",
      },

      // --- Box Shadow ---
      boxShadow: {
        md: "0 1px 3px 0 rgba(var(--shadow-color-rgb), 0.1), 0 1px 2px -1px rgba(var(--shadow-color-rgb), 0.1)",
        lg: "0 4px 6px -1px rgba(var(--shadow-color-rgb), 0.1), 0 2px 4px -2px rgba(var(--shadow-color-rgb), 0.1)",
        xl: "0 10px 15px -3px rgba(var(--shadow-color-rgb), 0.1), 0 4px 6px -4px rgba(var(--shadow-color-rgb), 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;