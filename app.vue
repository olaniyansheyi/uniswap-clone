<script setup>
import { useMenuStore } from "~/stores/menu";
import { useThemeStore } from "~/stores/theme";
import { useTokenStore } from "~/stores/token";

const tokenStore = useTokenStore();

const menuStore = useMenuStore();
const themeStore = useThemeStore();
onMounted(() => {
  themeStore.initializeTheme();
});
</script>

<template>
  <div class="relative bg-bgLight">
    <NuxtLayout>
      <NuxtPage />
      <Menu v-if="menuStore.openMenu" />
      <GlobalPreference v-if="menuStore.openGlobalPreference" />
      <SearchTab v-if="menuStore.openSearch" />
      <TokensModal v-if="tokenStore.openTokensModal" />
    </NuxtLayout>
  </div>
</template>
