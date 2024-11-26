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
  url:
    process.env.NODE_ENV === "production"
      ? "https://my-awesome-app.vercel.app"
      : "http://localhost:3000",
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

<!-- <script setup lang="ts">
import "~/init";
import { useMenuStore } from "~/stores/menu";
import { useThemeStore } from "~/stores/theme";
import { useTokenStore } from "~/stores/token";

import { createAppKit } from "@reown/appkit/vue";
import {
  mainnet,
  arbitrum,
  base,
  scroll,
  polygon,
} from "@reown/appkit/networks";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { useAppKit } from "@reown/appkit/vue";

// 1. Get projectId from https://cloud.reown.com
const projectId = "0bc92a3fea81abd098d50ad833896df9";

// 2. Create a metadata object
const metadata = {
  name: "uniswap",
  description: "connect your wallet",
  url: "http://localhost:3000", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// 3. Set the networks
const networks: [AppKitNetwork, ...AppKitNetwork[]] = [mainnet, polygon, base];

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
});

// 5. Create the modal
const modal = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true,
    swaps: false,
    onramp: false,
  },
});

const tokenStore = useTokenStore();

const menuStore = useMenuStore();
const themeStore = useThemeStore();
onMounted(() => {
  themeStore.initializeTheme();
  const appKit = useAppKit();

  console.log(appKit);
});
</script> -->
