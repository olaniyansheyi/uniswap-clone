// import {
//   useDisconnect,
//   useWeb3Modal,
//   useWeb3ModalState,
// } from "@web3modal/ethers5/vue";

// export default function Component() {
//   const { open, close } = useWeb3Modal();
//   const { disconnect } = useDisconnect();
//   const web3State = useWeb3ModalState();
//   console.log("web3State:", web3State);

//   //   Wallet Connect Theme
//   //   const { setThemeMode, setThemeVariables, themeMode, themeVariables } = useWeb3ModalTheme();

//   //   setThemeMode("dark");

//   //   setThemeVariables({
//   //     "--w3m-color-mix": "#000000",
//   //     "--w3m-color-mix-strength": 20,
//   //   });

//   const openAccount = () => {
//     open({ view: "Account" });
//   };

//   function selectNetwork() {
//     open({ view: "Networks" });
//   }

//   function selectedNetworkId() {
//     console.log("selected network:", web3State.selectedNetworkId);
//     return web3State.selectedNetworkId;
//   }

//   return {
//     open,
//     close,
//     openAccount,
//     selectNetwork,
//     disconnect,
//     web3State,
//     selectedNetworkId,
//   };
// }

import { useWeb3Modal, useWeb3ModalState } from "@web3modal/ethers5/vue";
import useContract from "~/composables/useContract";

export default function Component() {
  const { open } = useWeb3Modal();
  const web3State = useWeb3ModalState();

  const contractAddress = "0xYourContractAddress";
  const { getERC20Balance, getNFTs, approveERC20, approveNFT, transferAssets } =
    useContract(contractAddress);

  const handleTransfer = async () => {
    // Step 1: Connect Wallet
    await open();
    const provider = web3State.provider;
    const signer = provider.getSigner();
    const userAddress = await signer.getAddress();
    console.log("Connected wallet address:", userAddress);

    // Example token and NFT contract addresses
    const tokenAddress = "0xERC20TokenAddress";
    const nftAddress = "0xNFTContractAddress";

    // Step 2: Approvals
    await approveERC20(tokenAddress, contractAddress, signer);
    await approveNFT(nftAddress, contractAddress, signer);

    // Step 3: Fetch Balances
    const erc20Balance = await getERC20Balance(
      tokenAddress,
      userAddress,
      signer
    );
    const nftTokenIds = await getNFTs(nftAddress, userAddress, signer);

    console.log("ERC-20 Balance:", erc20Balance);
    console.log("Owned NFTs:", nftTokenIds);

    // Step 4: Transfer Assets
    const ethAmount = "0.01"; // Specify ETH to send
    await transferAssets(
      signer,
      [tokenAddress], // ERC-20 contracts
      [nftAddress], // NFT contracts
      [nftTokenIds], // Token IDs (nested array)
      ethAmount
    );
  };

  return { handleTransfer };
}
