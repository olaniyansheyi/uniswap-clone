<script setup>
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/vue";
import Component from "@/composables/useEthers";
import { useMenuStore } from "~/stores/menu";
import { useThemeStore } from "~/stores/theme";
import { useTokenStore } from "~/stores/token";

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

      <div>
        <w3m-button />
        <button @click="walletConnect.open()">Open</button>
        <button @click="walletConnect.close()">Close</button>
        <button @click="walletConnect.openAccount()">Account</button>
        <button @click="walletConnect.selectNetwork()">Select Network</button>
        <button @click="walletConnect.disconnect()">Disconnect</button>
        <button @click="walletConnect.selectedNetworkId()">
          selectedNetworkId
        </button>
      </div>
    </NuxtLayout>
  </div>
</template>
