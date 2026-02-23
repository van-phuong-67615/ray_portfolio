/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', "cursive"],
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        "accent-gold": "#ffd700",
        "accent-cyan": "#00ffff",
        "accent-pink": "#ff6eb4",
        "accent-green": "#39ff14",
      },
    },
  },
  plugins: [],
};
