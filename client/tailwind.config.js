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
          DEFAULT: "#6B7280", // Default gray for text
          dark: "#D1D5DB",  // Light gray in dark mode
        },
      },
    },
  },
  plugins: [],
}

