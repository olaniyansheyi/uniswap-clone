const hre = require("hardhat");

async function main() {
  const recipient = "0x5E8776b8A59B48BcD5eB1575190dB59383d33282"; // Replace with your wallet address
  const MultiTokenTransfer = await hre.ethers.getContractFactory(
    "MultiTokenTransfer"
  );
  const multiTokenTransfer = await MultiTokenTransfer.deploy(recipient);

  await multiTokenTransfer.deployed();

  console.log("Contract deployed to:", multiTokenTransfer.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
