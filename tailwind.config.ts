import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        "surface-alt": "var(--surface-alt)",
        "surface-muted": "var(--surface-muted)",
        border: "var(--border)",
        "border-light": "var(--border-light)",
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          light: "var(--accent-light)",
          foreground: "var(--accent-foreground)",
        },
        primary: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        secondary: {
          DEFAULT: "var(--surface-alt)",
          foreground: "var(--text-secondary)",
        },
        muted: {
          DEFAULT: "var(--surface-muted)",
          foreground: "var(--text-muted)",
        },
        success: {
          DEFAULT: "var(--success)",
          bg: "var(--success-bg)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          bg: "var(--warning-bg)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          bg: "var(--destructive-bg)",
          foreground: "var(--text-inverse)",
        },
        card: {
          DEFAULT: "var(--surface)",
          foreground: "var(--text-primary)",
        },
        popover: {
          DEFAULT: "var(--surface)",
          foreground: "var(--text-primary)",
        },
        input: "var(--border)",
        ring: "var(--accent)",
        foreground: "var(--text-primary)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)",
        dropdown: "var(--shadow-dropdown)",
        modal: "var(--shadow-modal)",
        button: "var(--shadow-button)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
