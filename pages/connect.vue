<template>
  <div>
    <div v-if="isWalletConnected">
      <p>Connected Account: {{ walletAddress }}</p>
      <button @click="disconnectWallet">Disconnect</button>
    </div>
    <button v-else @click="connectWallet">Connect Wallet</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ethers } from "ethers";

// States
const isWalletConnected = ref(false);
const walletAddress = ref(null);
const provider = ref(null);

// Connect wallet
const connectWallet = async () => {
  try {
    if (typeof window !== "undefined" && window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      // Set provider and account
      provider.value = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.value.getSigner();
      walletAddress.value = await signer.getAddress();
      isWalletConnected.value = true;
    } else {
      alert(
        "MetaMask is not installed or accessible. Please install it to use this feature."
      );
    }
  } catch (error) {
    console.error("Failed to connect wallet:", error);
    alert("An error occurred while connecting the wallet.");
  }
};

// Disconnect wallet
const disconnectWallet = () => {
  walletAddress.value = null;
  isWalletConnected.value = false;
  provider.value = null;
};

// Lifecycle hook to ensure this code runs in the browser
onMounted(() => {
  if (typeof window !== "undefined" && window.ethereum) {
    // Listen for account changes
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else {
        walletAddress.value = accounts[0];
      }
    });

    // Listen for network changes
    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });
  }
});
</script>
