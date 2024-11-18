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
        bgLight: "#ffffff",
        primary: "#FC72FF",
        textPrimary: "#000000",
        textSecondary: "#7d7d7d",
      },
    },
  },
  plugins: [],
};
