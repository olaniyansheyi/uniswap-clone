<template>
  <div class="relative bg-bgLight">
    <NuxtLayout>
      <NuxtPage />
      <Menu v-if="menuStore.openMenu" />
      <GlobalPreference v-if="menuStore.openGlobalPreference" />
      <SearchTab v-if="menuStore.openSearch" />
      <TokensModal v-if="menuStore.openTokensModal" />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useMenuStore } from "~/stores/menu";
import { useThemeStore } from "~/stores/theme";

const menuStore = useMenuStore();
const themeStore = useThemeStore();
onMounted(() => {
  themeStore.initializeTheme();
});
</script>
