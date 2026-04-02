/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 24px 70px rgba(56, 189, 248, 0.18)",
        "glow-soft": "0 20px 60px rgba(99, 102, 241, 0.14)",
      },
    },
  },
  plugins: [],
};
