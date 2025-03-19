/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure Tailwind scans all your files
  ],
  theme: {
    extend: {
      animation: {
        "color-cycle": "color-cycle 3s infinite",
        pulse: "pulse 1.5s infinite",
      },
      keyframes: {
        "color-cycle": {
          "0%": { color: "#ff0000" },
          "8%": { color: "#ff7f00" },
          "16%": { color: "#ffff00" },
          "25%": { color: "#7fff00" },
          "33%": { color: "#00ff00" },
          "41%": { color: "#00ff7f" },
          "50%": { color: "#00ffff" },
          "58%": { color: "#007fff" },
          "66%": { color: "#0000ff" },
          "75%": { color: "#7f00ff" },
          "83%": { color: "#ff00ff" },
          "100%": { color: "#ff007f" },
        },
        pulse: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.5)", opacity: "0.5" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};