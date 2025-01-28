// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract NextRound is ERC20, ERC20Burnable, Ownable(msg.sender), ReentrancyGuard {
    // Platform constants
    uint256 public constant TOTAL_SUPPLY = 1_00_000_000_000* (10 ** 18); // no fractionability of the tokens
    // uint256 public constant NRCReward = 1; // * (10 ** 18); // reward coin amount // removed the fractionability of the amount
    // uint256 public constant NRCPricePerMint = 5; // * (10 ** 18); // price for minting // removed the fractionability of the amount

    // mapping for registered user details
    mapping(address => bool) public registeredUsers;
    // struct for batch transactions
    struct BatchTx {
        address wallet;
        string action;
        uint256 amount;
    } 
    // enum for batch transaction actions
    enum BatchTxActions {Reward, Charge}

    address[] public registeredUserAddresses; // keeps track of registered wallets

    // events
    event UserRegistered(address indexed _user);
    event UserRewarded(address indexed _user, uint256 _amount);
    event NRCPayment(address indexed _user, uint256 _amount);
    event BatchTransaction(string _message, uint256 _txCount);
    event AccountReset(string _message);

    /**
    * Constructor for the Next Round Platform Smart Contract
     */
    constructor() ERC20("NextRound Coin", "NRC") {
        _mint(msg.sender, TOTAL_SUPPLY);
    }

    // ==========================
    //        MODIFIERS
    // ==========================

    /**
    * @dev Ensures only registered users can interact with the contract
    */
    modifier onlyRegistered(address _user) {
        require(registeredUsers[_user], "This user is not registered on our platform yet.");
        _;
    }

    // ===========================
    //    PLATFORM-WIDE ACTIONS 
    // ===========================

    /**
    * @dev Register a new user
    * @param _user Wallet address of the new user
    */
    function register(address _user) external onlyOwner {
        require(!registeredUsers[_user], "Account already registered.");

        registeredUsers[_user] = true;

        registeredUserAddresses.push(_user);

        emit UserRegistered(_user);
    }
    
    // ===========================
    //    TOKEN-BASED ACTIONS 
    // ===========================

    /**
    * @dev Balance of user
    * @param _user wallet address of user 
     */
    function userBalance(address _user) external view onlyRegistered(_user) returns (uint256 _balance)  {
        return balanceOf(_user);
    }

    /**
    * @dev Reward a user
    * @param _user Wallet address of user to reward
    * @param _amount Amount of tokens to send to wallet address of user
     */
    function rewardUser(address _user, uint256 _amount) public onlyRegistered(_user) onlyOwner nonReentrant {
        require(balanceOf(owner()) >= _amount, "Insufficient balance to reward your actions.");
        require(_user != address(0), "Invalid user address.");

        _transfer(owner(), _user, _amount * (10 ** 18));

        emit UserRewarded(_user, _amount * (10 ** 18));
    }
    
    /**
    * @dev Payment of activities with NRC
    * @param _user Wallet address of user performing the action
    * @param _amount Amount of NRC the user is paying with
     */
    function chargeUser(address _user, uint256 _amount) public onlyOwner onlyRegistered(_user) nonReentrant {
        require(balanceOf(_user) >= _amount, "Insufficient balance.");

        _transfer(_user, owner(), _amount * (10 ** 18));

        emit NRCPayment(_user, _amount * (10 ** 18));
    } 

    /**
    * @dev Batch several users transactions
    * @param _transactions Transactions to batch process
    */
    function batchTransactions(BatchTx[] calldata _transactions) external onlyOwner nonReentrant {
        uint256 _txCount = _transactions.length;
        uint i = 0;

        for (i; i < _txCount; i++) {
            BatchTx calldata _tx = _transactions[i];

            if (keccak256(abi.encodePacked(_tx.action)) == keccak256(abi.encodePacked("reward"))) {
                rewardUser(_tx.wallet, _tx.amount);
            }
            if (keccak256(abi.encodePacked(_tx.action)) == keccak256(abi.encodePacked("charge"))) {
                chargeUser(_tx.wallet, _tx.amount);
            }
        }

        string memory _message = "Batch Transactions fulfilled.";
        emit BatchTransaction(_message, _txCount);
    }

    /**
    * @dev Monthly reset of NRC (Burn all existing Coins)
     */
    function resetAllNRC() external onlyOwner {
        uint256 balance;

        for (uint256 i = 0; i < registeredUserAddresses.length; i++) {
            address _user = registeredUserAddresses[i];

            balance = balanceOf(_user);

            if (balance > 0) {
                 _transfer(_user, owner(), balance);
                 _burn(_user, balance);
            }
        }

        string memory _message = "All tokens have been reset.";
        emit AccountReset(_message); 
    }

}