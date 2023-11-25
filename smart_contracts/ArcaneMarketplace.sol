// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./ERC721Token.sol";

contract ArcaneMarketplace is Ownable {

    modifier onlyDAO() {
        require(isDAOMember(msg.sender), "Only DAO member can call this function");
        _;
    }

    address[] private DAOMembers;

    uint256 private productId = 1;
    Product[] private products;

    // VoterAddress => (ProductId => hasVoted)
    mapping(address => mapping(uint256 => bool)) private hasVoted;
    // ProductId => (Price => Vote number)
    mapping(uint256 => mapping(uint256 => uint256)) private votes;
    // ProductId => Price vote options
    mapping(uint256 => uint256[]) private voteOptions;

    struct Product {
        uint256 id;
        string cid;
        uint256 price;
        bool listed;
        bool votingComplete;
        uint256 maxLimit;
        uint256 numberOfVotes;
    }

    ERC721Token public arcaneNFT;

    constructor() Ownable(msg.sender) {
        DAOMembers.push(msg.sender);

        arcaneNFT = new ERC721Token("Arcane NFT", "ANFT");
        arcaneNFT.setMarketplaceContract(address(this));
    }

    function isDAOMember(address _address) private view returns (bool) {
        for (uint256 i = 0; i < DAOMembers.length; i++) {
            if (DAOMembers[i] == _address) {
                return true;
            }
        }
        return false;
    }

    function addDAOMember(address _address) external onlyOwner {
        require(!isDAOMember(_address), "Address already a DAO member");
        DAOMembers.push(_address);
    }

    function addProduct(uint256 _maxLimit, string memory _cid, uint256 proposedPrice) external onlyOwner {
        products.push(Product(
            productId,
            _cid,
            proposedPrice,
            false,
            false,
            _maxLimit,
            1
        ));

        voteOptions[productId].push(proposedPrice);
        ++votes[productId][proposedPrice];
        hasVoted[msg.sender][productId] = true;

        if(DAOMembers.length == 1){
            products[productId-1].votingComplete = true;
        }

        productId = productId + 1;
    }

    function listProduct(uint256 _id) external onlyOwner {
        require(_id > 0, "Invalid Product ID");
        require(productId > _id, "Invalid Product ID");
        require(products[_id-1].votingComplete, "Voting is still in progress");
        require(!products[_id-1].listed, "Product is already listed on the marketplace");

        uint256 winningNumberOfVote = 0;
        uint256 winningVotePrice = 0;

        for (uint256 i = 0; i < voteOptions[_id].length; i++) {
            if(votes[_id][voteOptions[_id][i]] > winningNumberOfVote){
                winningNumberOfVote = votes[_id][voteOptions[_id][i]];
                winningVotePrice = voteOptions[_id][i];
            }
        }

        products[_id-1].price = winningVotePrice;
        products[_id-1].listed = true;
    }

    function buyProduct(uint256 _id) external payable {
        require(_id > 0, "Invalid Product ID");
        require(productId > _id, "Invalid Product ID");
        require(products[_id-1].listed, "Product is not listed on the marketplace");
        require(msg.value == products[_id-1].price, "Insufficient funds");

        arcaneNFT.mint(msg.sender, _id, products[_id-1].cid);

        
    }

    function vote(uint256 _id, uint256 _votedPrice) external onlyDAO {
        require(_id > 0, "Invalid Product ID");
        require(productId > _id, "Invalid Product ID");
        require(!hasVoted[msg.sender][_id], "You have already voted");

        if(votes[_id][_votedPrice] == 0){
            voteOptions[_id].push(_votedPrice);
        }
        ++votes[_id][_votedPrice];
        ++products[_id-1].numberOfVotes;
        hasVoted[msg.sender][_id] = true;

        if(products[_id-1].numberOfVotes == DAOMembers.length){
            products[_id-1].votingComplete = true;
        }
    }

    // Returns all products in the marketplace
    function getAllProducts() external view returns(Product[] memory) {
        return products;
    }

    // Returns a product with a particular product ID
    function getProduct(uint256 _id) external view returns(Product memory) {
        require(_id > 0, "Invalid Product ID");
        require(productId > _id, "Invalid Product ID");
        return products[_id-1];
    }

    // Returns addresses of all DAO memebers
    function getDAOMembers() onlyDAO external view returns(address[] memory) {
        return DAOMembers;
    }

    // Returns if msg.sender has voted for a product price or not
    function haveIVoted(uint256 _id) external view onlyDAO returns(bool) {
        require(_id > 0, "Invalid Product ID");
        require(productId > _id, "Invalid Product ID");
        return hasVoted[msg.sender][_id];
    }

    // Returns all price options for a product
    function getAllVoteOptions(uint256 _id) external view onlyDAO returns(uint256[] memory) {
        require(_id > 0, "Invalid Product ID");
        require(productId > _id, "Invalid Product ID");
        return voteOptions[_id];
    }
    
    // Returns Number of Votes a particular Price option has got for a product
    function getVoteByOption(uint256 _id, uint256 option) external view onlyDAO returns(uint256) {
        require(_id > 0, "Invalid Product ID");
        require(productId > _id, "Invalid Product ID");
        return votes[_id][option];
    }
}