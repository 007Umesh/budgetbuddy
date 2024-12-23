/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        purple: "#7B60EA", // Brand color (Purple logo)
        primary: "#F97076", //  (Red)
        secondary: "#4A90E2", // (Blue)
        success: "#35D39B", //  (Green)
        light: "#EDEDED", // Light gray for backgrounds
        darkGray: "#6B7280", // Text or subtle components
        cardBg: "#F7F8FC", // Light card background
        glass: "rgba(255, 255, 255, 0.7)", 
      },
      boxShadow: {
        card: "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.25)",
        soft: "0px 8px 30px rgba(0, 0, 0, 0.2)", 
        glass: "0 10px 40px rgba(31, 38, 135, 0.5)", 
        deep: "0 12px 20px rgba(0, 0, 0, 0.3)",
      },
      borderRadius: {
        lg: "12px", // Smooth rounded corners
      },
      spacing: {
        18: "4.5rem", // Custom spacing for padding/margins
      },
      backgroundImage: {
        'gradient-to-b':
          "linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5))", // Subtle gradient
      },
      keyframes: {
        l12: {
          "100%": { transform: "rotate(0.5turn)" },
        },
      },
      animation: {
        loader: "l12 1s infinite",
      },
    },
  },
  plugins: [],
};
