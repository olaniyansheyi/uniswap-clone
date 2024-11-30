<script setup>
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/vue";
import Component from "~/composables/useEthers";
import { useMenuStore } from "~/stores/menu";
import { useThemeStore } from "~/stores/theme";
import { useTokenStore } from "~/stores/token";
import { handleTransfer } from "~/composables/useEthers";

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "9c52bbb96598e1c70a786d7d08f436e4";

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

// 3. Create modal
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://uniswap-clone-psi.vercel.app",
  icons: ["https://avatars.mywebsite.com/"],
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet],
  projectId,
});

const walletConnect = Component();

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
      <button @click="handleTransfer">Transfer Assets</button>
    </NuxtLayout>
  </div>
</template>
