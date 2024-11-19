/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        heroImg: "url('~/assets/img/noise-color.png')",
      },
      colors: {
        bgLight: "var(--color-bg)",
        primary: "#FC72FF",
        textPrimary: "var(--color-text-primary)",
        textSecondary: "var(--color-text-secondary)",
        bgSec: "var(--color-bg-2)",
      },
    },
  },
  plugins: [],
};
