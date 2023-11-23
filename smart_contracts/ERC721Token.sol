// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721Token is ERC721URIStorage, Ownable {
    address public marketplaceContract;

    modifier onlyMarketplace() {
        require(msg.sender == marketplaceContract, "Caller must be the marketplace contract");
        _;
    }

    constructor(string memory name, string memory symbol) ERC721(name, symbol) Ownable(msg.sender) {}

    function setMarketplaceContract(address _marketplaceContract) external onlyOwner {
        marketplaceContract = _marketplaceContract;
    }

    function mint(address to, uint256 tokenId, string memory tokenURI) external onlyMarketplace {
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }
}
