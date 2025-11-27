import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../apps/**/*.{js,ts,jsx,tsx,mdx}", 
    "../../packages/design-system/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- Brand Colors ---
        brand: {
          primary: "var(--color-brand-primary)",
          secondary: "var(--color-brand-secondary)",
          accent: "var(--color-brand-accent)",
          "primary-hover": "var(--color-brand-primary-hover)",
          "secondary-hover": "var(--color-brand-secondary-hover)",
          "accent-hover": "var(--color-brand-accent-hover)",
        },

        // --- Text Colors ---
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          placeholder: "var(--color-text-placeholder)",
          "on-brand": "var(--color-text-on-brand)",
          link: "var(--color-text-link)",
          disabled: "var(--color-text-disabled)",
        },

        // --- Background Colors ---
        bg: {
          body: "var(--color-bg-body)",
          surface: "var(--color-bg-surface)",
          secondary: "var(--color-bg-secondary)",
          accent: "var(--color-bg-accent)",
          "surface-hover": "var(--color-bg-surface-hover)",
        },
        // Shortcut
        surface: "var(--color-bg-surface)",

        // --- Border Colors ---
        border: {
          primary: "var(--color-border-primary)",
          secondary: "var(--color-border-secondary)",
        },

        // --- Utility Colors ---
        utility: {
          success: "var(--color-utility-success)",
          error: "var(--color-utility-error)",
          warning: "var(--color-utility-warning)",
          info: "var(--color-utility-info)",
        },

        // --- Others ---
        heading: "var(--color-heading)",
      },

      // --- Typography ---
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        heading: ["var(--font-heading)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2x": "1.5rem",
        "3x": "1.875rem",
        "4x": "2.25rem",
        "5xl": "3rem",
      },
      lineHeight: {
        tight: "1.2",
        snug: "1.375",
        normal: "1.6",
        relaxed: "1.75",
        loose: "2",
      },

      // --- Spacing ---
      spacing: {
        '0': '0',
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '32': '8rem',
      },

      // --- Border Radius ---
      borderRadius: {
        none: "0",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        full: "9999px",
      },

      // --- Box Shadow ---
      boxShadow: {
        DEFAULT: "0 1px 2px 0 rgba(var(--shadow-color-rgb), 0.05)",
        md: "0 1px 3px 0 rgba(var(--shadow-color-rgb), 0.1), 0 1px 2px -1px rgba(var(--shadow-color-rgb), 0.1)",
        lg: "0 4px 6px -1px rgba(var(--shadow-color-rgb), 0.1), 0 2px 4px -2px rgba(var(--shadow-color-rgb), 0.1)",
        xl: "0 10px 15px -3px rgba(var(--shadow-color-rgb), 0.1), 0 4px 6px -4px rgba(var(--shadow-color-rgb), 0.1)",
        "2xl": "0 20px 25px -5px rgba(var(--shadow-color-rgb), 0.1), 0 8px 10px -6px rgba(var(--shadow-color-rgb), 0.1)",
        inner: "inset 0 2px 4px 0 rgba(var(--shadow-color-rgb), 0.05)",
      },

      // --- Z-Index ---
      zIndex: {
        '0': '0',
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
        '50': '50',
        'max': '9999',
      },
    },
  },
  plugins: [],
};

export default config;