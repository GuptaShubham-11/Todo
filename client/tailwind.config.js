/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4A90E2", // Default theme color
          dark: "#2563EB",  // Dark mode variant
        },
        secondary: {
          DEFAULT: "#374151", // A rich charcoal gray for maximum contrast
          dark: "#F3F4F6",  // Off-white for dark mode
        },
      },
    },
  },
  plugins: [],
}

