import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    theme: "light", // Default theme
    auto: false, // Tracks if theme is auto
  }),

  actions: {
    initializeTheme() {
      console.log("Initializing theme..."); // Debug log
      const savedTheme = localStorage.getItem("theme");

      if (savedTheme && savedTheme !== "auto") {
        this.setTheme(savedTheme); // Apply saved theme
      } else {
        this.setTheme(this.detectSystemPreference(), true); // Default to system preference
      }
    },

    detectSystemPreference() {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      return prefersDark ? "dark" : "light";
    },

    setTheme(theme, auto = false) {
      console.log(`Setting theme to: ${theme}`); // Debug log
      this.theme = theme;
      this.auto = auto;

      localStorage.setItem("theme", auto ? "auto" : theme);

      const html = document.documentElement;
      if (theme === "dark") {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }
    },

    resetToAuto() {
      console.log("Resetting to auto...");
      this.setTheme(this.detectSystemPreference(), true);
    },

    handleToggleTheme() {
      const newTheme = this.theme === "light" ? "dark" : "light";
      console.log(`Toggling theme to: ${newTheme}`); // Debug log
      this.setTheme(newTheme);
    },
  },
});
