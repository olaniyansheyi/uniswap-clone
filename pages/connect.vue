<template>
  <div>
    <div v-if="isWalletConnected">
      <p>Connected Account: {{ walletAddress }}</p>
      <button @click="disconnectWallet">Disconnect</button>
    </div>
    <div v-else>
      <button @click="connectMetaMask">Connect MetaMask</button>
      <button @click="connectWalletConnect">Connect WalletConnect</button>
    </div>
  </div>
</template>

<script setup>
import "~/init";
import { ref, onMounted } from "vue";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";

const isWalletConnected = ref(false);
const walletAddress = ref(null);
const provider = ref(null);
const walletType = ref(null);

const connectMetaMask = async () => {
  try {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      provider.value = new ethers.providers.Web3Provider(window.ethereum);
      walletAddress.value = accounts[0];
      isWalletConnected.value = true;
      walletType.value = "MetaMask";
    } else {
      alert("MetaMask is not installed.");
    }
  } catch (error) {
    console.error("MetaMask error:", error);
  }
};

const connectWalletConnect = async () => {
  try {
    const walletConnectProvider = new WalletConnectProvider({
      rpc: {
        1: "https://mainnet.infura.io/v3/ab206da481434c9294c2a1bbb08ba349",
      },
      bridge: "https://bridge.walletconnect.org",
      qrcode: true,
    });
    await walletConnectProvider.enable();
    provider.value = new ethers.providers.Web3Provider(walletConnectProvider);
    walletAddress.value = await provider.value.getSigner().getAddress();
    isWalletConnected.value = true;
    walletType.value = "WalletConnect";

    walletConnectProvider.on("disconnect", () => disconnectWallet());
  } catch (error) {
    console.error("WalletConnect error:", error);
  }
};

const disconnectWallet = () => {
  if (
    walletType.value === "WalletConnect" &&
    provider.value?.provider?.disconnect
  ) {
    provider.value.provider.disconnect();
  }
  walletAddress.value = null;
  isWalletConnected.value = false;
  walletType.value = null;
};

onMounted(() => {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      walletAddress.value = accounts[0] || null;
    });
    window.ethereum.on("chainChanged", () => window.location.reload());
  }
});
</script>
