import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        informatics: {
          50: "#eef6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8"
        },
        physics: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e"
        }
      },
      boxShadow: {
        soft: "0 10px 30px -15px rgba(15, 23, 42, 0.3)",
        glow: "0 10px 25px -10px rgba(59, 130, 246, 0.55)"
      },
      keyframes: {
        fadeSlide: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        pulseBar: {
          "0%": { width: "100%" },
          "100%": { width: "0%" }
        },
        shake: {
          "0%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-6px)" },
          "40%": { transform: "translateX(6px)" },
          "60%": { transform: "translateX(-4px)" },
          "80%": { transform: "translateX(4px)" },
          "100%": { transform: "translateX(0)" }
        }
      },
      animation: {
        fadeSlide: "fadeSlide 0.6s ease-out",
        shake: "shake 0.4s ease-in-out"
      }
    }
  },
  plugins: []
};

export default config;
