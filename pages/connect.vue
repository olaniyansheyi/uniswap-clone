<template>
  <div>
    <!-- Show the Connect button if the wallet is not connected -->
    <button v-if="!isConnected" @click="connectWallet">
      Connect Wallet (MetaMask)
    </button>

    <!-- Show the Disconnect button and wallet info if the wallet is connected -->
    <div v-else>
      <p>Connected Address: {{ walletAddress }}</p>
      <p>Balance: {{ balance }} ETH</p>
      <button @click="disconnectWallet">Disconnect</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ethers } from "ethers";

// States
const isConnected = ref(false);
const walletAddress = ref("");
const balance = ref("");
let provider = null; // Hold the provider globally for reset

// Function to connect the wallet
const connectWallet = async () => {
  try {
    if (window.ethereum) {
      console.log("MetaMask detected");

      // Create a Web3Provider using the window.ethereum object
      provider = new ethers.providers.Web3Provider(window.ethereum);

      // Request account access from MetaMask
      await provider.send("eth_requestAccounts", []); // Request accounts from the wallet

      // Get the signer (the wallet) from the provider
      const signer = provider.getSigner();

      // Get the wallet address and set it in the state
      walletAddress.value = await signer.getAddress();
      isConnected.value = true;

      // Get the wallet's balance (in wei) and convert it to ETH
      const balanceWei = await signer.getBalance();
      balance.value = ethers.utils.formatEther(balanceWei); // Convert balance from wei to ETH
    } else {
      alert("MetaMask is not installed. Please install MetaMask.");
    }
  } catch (error) {
    console.error("Failed to connect wallet:", error);
    alert("Error connecting to wallet.");
  }
};

// Function to disconnect the wallet (reset the state)
const disconnectWallet = () => {
  isConnected.value = false;
  walletAddress.value = "";
  balance.value = "";
  provider = null; // Reset the provider reference to simulate disconnect
};
</script>
