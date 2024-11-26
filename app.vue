<script setup lang="ts">
import { createAppKit, useAppKit } from "@reown/appkit/vue";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { mainnet, arbitrum } from "@reown/appkit/networks";

// 1. Get projectId from https://cloud.reown.com
const projectId = "0bc92a3fea81abd098d50ad833896df9";

// 2. Create your application's metadata object
const metadata = {
  name: "uniswap",
  description: "connect your wallet",
  url: "https://uniswap-clone-psi.vercel.app",
  icons: ["https://avatars.mywebsite.com/"],
};

// 3. Create a AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  networks: [mainnet, arbitrum],
  metadata,
  projectId,
  features: {
    analytics: true,
    swaps: false,
    onramp: false,
  },
});

// 4. Use modal composable
const modal = useAppKit();

const tokenStore = useTokenStore();

const menuStore = useMenuStore();
const themeStore = useThemeStore();
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
