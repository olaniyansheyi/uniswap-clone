<template>
  <div class="relative">
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

const menuStore = useMenuStore();
</script>
