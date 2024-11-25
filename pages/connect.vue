<template>
  <div v-if="isWagmiReady">
    <div v-if="isConnected">
      <p>Connected Account: {{ accountData?.address }}</p>
      <button @click="disconnectWallet">Disconnect</button>
    </div>
    <button v-else @click="connectWallet">Connect Wallet</button>
  </div>
  <p v-else>Loading Wagmi...</p>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAccount, useConnect, useDisconnect } from "@wagmi/vue";

// States
const isWagmiReady = ref(false);
const { isConnected, data: accountData } = useAccount(); // Call useAccount outside of onMounted
const { connect, connectors } = useConnect();
const { disconnect } = useDisconnect();

// Initialize Wagmi state on mounted (no need to call useAccount in onMounted)
onMounted(() => {
  // Check if the Wagmi plugin is ready
  isWagmiReady.value = true;
});

// Connect wallet
const connectWallet = async () => {
  const connector = connectors.value.find((c) => c.id === "walletConnect");
  if (connector) {
    try {
      await connect(connector);
    } catch (error) {
      console.error("Failed to connect:", error);
    }
  }
};

// Disconnect wallet
const disconnectWallet = () => {
  disconnect();
};
</script>
