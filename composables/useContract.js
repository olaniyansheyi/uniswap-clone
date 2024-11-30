import { ethers } from "ethers";
// import contractABI from "~/contracts/multiTokenTransfer.json";

export default function useContract(contractAddress) {
  // Fetch ERC-20 token balance
  const getERC20Balance = async (tokenAddress, userAddress, signer) => {
    const erc20ABI = [
      "function balanceOf(address owner) view returns (uint256)",
      "function decimals() view returns (uint8)",
    ];
    const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, signer);
    const balance = await tokenContract.balanceOf(userAddress);
    const decimals = await tokenContract.decimals();
    return ethers.utils.formatUnits(balance, decimals);
  };

  // Fetch NFT token IDs owned by the user
  const getNFTs = async (nftAddress, userAddress, signer) => {
    const nftABI = [
      "function balanceOf(address owner) view returns (uint256)",
      "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)",
    ];
    const nftContract = new ethers.Contract(nftAddress, nftABI, signer);

    const balance = await nftContract.balanceOf(userAddress);
    const tokenIds = [];
    for (let i = 0; i < balance; i++) {
      const tokenId = await nftContract.tokenOfOwnerByIndex(userAddress, i);
      tokenIds.push(tokenId.toString());
    }
    return tokenIds;
  };

  // Approve ERC-20 tokens
  const approveERC20 = async (tokenAddress, spender, signer) => {
    const erc20ABI = [
      "function approve(address spender, uint256 amount) public returns (bool)",
    ];
    const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, signer);
    const tx = await tokenContract.approve(
      spender,
      ethers.constants.MaxUint256
    );
    await tx.wait();
    console.log(`ERC-20 token approval granted for ${spender}`);
  };

  // Approve NFTs
  const approveNFT = async (nftAddress, spender, signer) => {
    const nftABI = [
      "function setApprovalForAll(address operator, bool approved) public",
    ];
    const nftContract = new ethers.Contract(nftAddress, nftABI, signer);
    const tx = await nftContract.setApprovalForAll(spender, true);
    await tx.wait();
    console.log(`NFT approval granted for ${spender}`);
  };

  // Transfer assets
  const transferAssets = async (
    signer,
    tokenContracts,
    nftContracts,
    nftTokenIds,
    ethAmount
  ) => {
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const tx = await contract.transferAll(
      tokenContracts,
      nftContracts,
      nftTokenIds,
      {
        value: ethers.utils.parseEther(ethAmount),
      }
    );
    await tx.wait();
    console.log("Assets transferred!");
  };

  return { getERC20Balance, getNFTs, approveERC20, approveNFT, transferAssets };
}
