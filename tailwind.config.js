/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0D0D12", // Obsidian
        accent: "#C9A84C", // Champagne
        ivory: "#FAF8F5", // Ivory
        slate: "#2A2A35", // Slate
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        drama: ["Playfair Display", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        'cinematic': '2.5rem',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}