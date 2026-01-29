import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#07090f",
        foreground: "#ffffff",

        primary: {
          DEFAULT: "#7c7cff", // royal purple
          glow: "#4fd1c5",    // teal glow
        },
      },
      boxShadow: {
        glow: "0 0 30px rgba(124,124,255,0.5)",
        strong: "0 0 60px rgba(79,209,197,0.6)",
      },
      backdropBlur: {
        xl: "24px",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(124,124,255,0.4)",
          },
          "50%": {
            boxShadow: "0 0 45px rgba(79,209,197,0.7)",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
