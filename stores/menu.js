import { defineStore } from "pinia";

export const useMenuStore = defineStore("menu", {
  // Data
  state: () => ({
    openMenu: false,
    openGlobalPreference: false,
    openSearch: false,
    openTokensModal: false,
    isDark: false,
  }),
  actions: {
    handleToggleMenu() {
      this.openMenu = !this.openMenu;
    },
    handleToggleGlobalPreference() {
      this.openGlobalPreference = !this.openGlobalPreference;
    },

    handleToggleOpenSearch() {
      this.openSearch = !this.openSearch;
    },
    handleToggleOpenTokensModal() {
      this.openTokensModal = !this.openTokensModal;
    },
  },
});
