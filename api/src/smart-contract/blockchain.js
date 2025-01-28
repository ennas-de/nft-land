import dotenv from "dotenv";
// blockchain integration
import hre from "hardhat";
import {ethers} from "ethers";
import NRContractABI from "./../smart-contract/NRContractABI.json" with {type: 'json'};
import NRNFTContractABI from "./../smart-contract/NRNFTContractABI.json" with {type: 'json'};

const NR_CONTRACT_ADDRESS       = process.env.NR_CONTRACT_ADDRESS;
const NR_NFT_CONTRACT_ADDRESS   = process.env.NR_NFT_CONTRACT_ADDRESS;
const MAINNET_URL               = process.env.MAINNET_URL;
const TESTNET_URL               = process.env.BC_URL;
const PRIVATE_KEY               = process.env.PRIVATE_KEY;

const provider  = new ethers.providers.JsonRpcProvider(TESTNET_URL);
const signer    = new hre.ethers.Wallet(PRIVATE_KEY, provider);

const NR_CONTRACT       = new hre.ethers.Contract(NR_CONTRACT_ADDRESS, NRContractABI.abi, signer);
const NR_NFT_CONTRACT   = new hre.ethers.Contract(NR_NFT_CONTRACT_ADDRESS, NRNFTContractABI.abi, signer);


// ==========================
//     PLATFORM & TOKENS
// ==========================

// register user (public key)
export const registerUserWallet = async (wallet) => {
    try {
        await NR_CONTRACT.register(wallet);
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}

// user balance (public key)
export const getUserBalance = async (wallet) => {
    try {
        const balance = await NR_CONTRACT.userBalance(wallet);

        return balance;
    } catch (error) {
        console.log(error)
        return false;
    }
}

// reward user (public key, amount)

// pay with nrc (public key, amount)

// batch transactions ([{
//                      public key, 
//                      action (reward | burn),
//                      amount
//                    }])
export const batchTx = async (transactions) => {
    try {
        await NR_CONTRACT.batchTransactions(transactions);
        return true
    } catch (error) {
        console.log(error)
        return false;
    }
}
// reset all nrc
export const resetAllNRC = async () => {
    try {
        await NR_CONTRACT.resetAllNRC();
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}

// ==========================
//             NFT
// ==========================
// mint nft (
//              wallet,
//              name,
//              description,
//              imageURI,
//              imageId  
//          )
export const mintUserNFT = async (address, name, description, imageURI, imageId) => {
    try {
        await NR_NFT_CONTRACT.mintNFT(address, name, description, imageURI, imageId);
        return true;
    } catch (error) {
        
    }
}

// scan coaster (wallet, scan number, coasterId)
export const scanNFT = async (user, scanCount, coasterId) => {
    try {
        await NR_NFT_CONTRACT.scanNFT(user, scanCount, coasterId);
        return true;
    } catch (error) {
        return error.message;
    }
}

// nickname nft (wallet, nftId, nickname)
export const nicknameNFT = async (_user, _assetId, _nickname) => {
    try {
        await NR_NFT_CONTRACT.nicknameNFT(_user, _assetId, _nickname);
        return true;
    } catch (error) {
        
    }
}

// batch NFT transactions ([{
//                      public key, 
//                      action (reward | burn),
//                      amount
//                    }])
export const batchNFTTx = async (transactions) => {
    try {
        await NR_NFT_CONTRACT.batchTransactions(transactions);
        return true
    } catch (error) {
        console.log(error)
        return false;
    }
}
// get nft (wallet, coasterId)

// get nfts (wallet)