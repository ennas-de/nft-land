// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

interface INRCoin {
    function userBalance(address user) external view returns (uint256);
    function rewardUser(address _user, uint256 _amount) external;
    function chargeUser(address _user, uint256 _amount) external;
}

contract NextRoundNFT is ERC721, ERC721URIStorage, ReentrancyGuard, Ownable(msg.sender) {
    // address private _owner;
    INRCoin public NRCoin;

    // NFT constants
    uint256 public constant DailyScanLimit = 5; // Number of scans per day
    uint256 public constant NRCPricePerNicknaming = 1; // Number of scans per day // removed the fractionability of the amount
    uint256 public constant NRCReward = 1; // * (10 ** 18); // reward coin amount // removed the fractionability of the amount
    uint256 public constant NRCPricePerMint = 5; // * (10 ** 18); // price for minting // removed the fractionability of the amount

    uint256 private _nftIdCounter = 0;

    // struct of coaster details
    struct Coaster {
        string id;
        string name;
        string description;
        string assetURI;
        address owner;
        string nickname;
        address namerAccount;
        address[] scannersAccount;
    }

    address[] public registeredUserAddresses; // keeps track of registered wallets
    mapping(string => Coaster) private coasters; // keep record of coasters
    // mapping for users NFT details
    mapping(address => mapping(string => bool)) public ownedCoasters;
    mapping(address => mapping(string => bool)) public scannedCoasters;

    // events
    event UserRegistered(address indexed _user);
    event NFTMinted(address indexed _user, string _assetId);
    event CoasterScanned(address indexed _user, string _coasterId);
    event CoasterNamed(address indexed _namerAccount, string _assetId, string _nickname);

    /**
    * Constructor for the NextRound NFT Smart Contract
    * @param _NRCoin The contract address for the NR Platform (Coin) contract
     */
    constructor(address _NRCoin) ERC721("NextRound NFT", "NRNFT") {
        // _owner = msg.sender;
        NRCoin = INRCoin(_NRCoin);
    }

    // ===================
    //      MODIFIER 
    // ===================

    // modifier onlyOwner() {
    //     require(msg.sender == _owner, "Only the contract owner can call this function.");
    //     _;
    // }

    // Override functions to resolve multiple inheritance issues
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId) public view virtual override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    // ===================
    //     NFT ACTIONS 
    // ===================

    /**
    * @dev Mint an NFT asset
    * @param _user wallet address of user who is scanning
    * @param _assetId ID of the asset to mint
    * @param _name Name of the asset to mint
    * @param _description Description of the asset to mint
    * @param _assetURI Location resource (image url) of the asset to mint
     */
    function mintNFT(
        address _user, 
        string calldata _name, 
        string calldata _description, 
        string calldata _assetURI, 
        string calldata _assetId
    ) external onlyOwner nonReentrant {
        require(bytes(coasters[_assetId].id).length == 0, "Coaster already exist.");
        require(NRCoin.userBalance(_user) >= NRCPricePerMint, "Insufficient balance.");

        _nftIdCounter++; // increment nft counter

        // Mint NFT
        uint256 nftId = _nftIdCounter;
        _safeMint(_user, nftId);
        _setTokenURI(nftId, _assetURI);

        // id, owner, name, description, nickname, namer, scanners[]
        coasters[_assetId] = Coaster({
            id: _assetId,
            owner: _user,
            name: _name,
            assetURI: _assetURI,
            description: _description,
            nickname: "",
            namerAccount: address(0),
            scannersAccount: new address[](0) 
        });

        // pay with NR coin -> ayWithNRC, 
        // NRCoin.payWithNRC(_user, NRCPricePerMint);

        ownedCoasters[_user][_assetId] = true;

        emit NFTMinted(_user, _assetId);
    }

    /**
    * @dev Record a scan and reward a user
    * @param _user wallet address of user who is scanning
    * @param _scanCount total scans for the user (resets daily)
    * @param _coasterId ID of the coaster asset to scan
     */
    function scanCoaster(address _user, uint256 _scanCount, string calldata _coasterId) external onlyOwner nonReentrant {
        require(!scannedCoasters[_user][_coasterId], "Coaster already scanned.");
        require(!ownedCoasters[_user][_coasterId], "You can not scan your own Coaster.");
        require(NRCoin.userBalance(_user) >= 0, "Invalid user account.");
        require(_scanCount <= DailyScanLimit, "You have reached your daily limit of scans. Try again tomorrow.");

        scannedCoasters[_user][_coasterId] = true;

        coasters[_coasterId].scannersAccount.push(_user);

        // get NR coin reward -> rewardUser 
        // NRCoin.rewardUser(_user);

        emit CoasterScanned(_user, _coasterId);
    }

    /**
    * @dev Nickname NFT by first scanner
    * @param _user Wallet address of first scanner
    * @param _assetId ID of the NFT asset to name
    * @param _nickname Nick name to give NFT
     */
    function nicknameNFT(
        address _user, 
        string calldata _assetId, 
        string calldata _nickname
    ) external onlyOwner nonReentrant {
        require(NRCoin.userBalance(_user) >= NRCPricePerNicknaming, "Insufficient balance.");

        Coaster storage coaster = coasters[_assetId];
        require(bytes(coaster.nickname).length == 0, "Asset already named");
        require(coaster.owner != address(0), "Coaster does not exist.");

        coaster.nickname = _nickname;
        coaster.namerAccount = _user;

        // // pay with NR coin -> ayWithNRC, 
        // NRCoin.chargeUser(_user, NRCPricePerNicknaming);

        emit CoasterNamed(_user, _assetId, _nickname);
    }

    /**
    * @dev Get NFT detail
    * @param _user Wallet of user
    * @param _coasterId Coaster ID to fetch by user
     */
    function getNFT(address _user, string memory _coasterId) external view onlyOwner returns (Coaster memory) {
        require(ownedCoasters[_user][_coasterId] || scannedCoasters[_user][_coasterId], "Coaster asset not found in your collection.");

        Coaster memory _coaster = coasters[_coasterId];

        return _coaster;
    }
}