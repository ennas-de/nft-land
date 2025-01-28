import NFTModel from "../models/nft.model.js";
import UserModel from "../models/user.model.js";
import WalletModel from "../models/wallet.model.js";
import { MINTING_FEE, NICKNAMING_FEE, REWARD_AMOUNT } from "../constants/platformConstants.js";
import { getUserBalance, mintUserNFT, resetAllNRC } from "../smart-contract/blockchain.js";
import { transactionPool } from "../global/actions.global.js";


// get owned NFTs
export const getOwnedNFTs = async (userId) => {
    try {
        const nfts = await NFTModel.find({creator: userId})
            .populate(
                "users",
                "fullName gender age profilePic"
            ); // addresses?
            console.log({nfts})

        if (nfts.length <= 0) return "No uploads yet.";

        const {
            __v,
            ...others
        } = nfts._doc;
    
        return others
    } catch (error) {
        return error.message;
    }
}

// get scanned NFTs 
export const getScannedNFTs = async (userId) => {
    try {
        const nfts = await NFTModel.find({users: userId})
            .populate(
                "users",
                "fullName gender age profilePic"
            ); // addresses?
            console.log({nfts})

        if (nfts.length <= 0) return "You have not scanned any asset yet.";

        const {
            __v,
            ...others
        } = nfts._doc;
    
        return others
    } catch (error) {
        return error.message;
    }
}

// view nft
export const viewNFT = async (userId, nftId) => {
    try {
        let nft = await NFTModel.findOne({
            _id: nftId,
            creator: userId,
        }).populate(
            "users",
            "fullName gender age profilePic"
        );

        if (!nft) await NFTModel.findOne({
            _id: nftId,
            users: userId,
        }).populate(
            "users",
            "fullName gender age profilePic"
        );

        if (!nft) return "Asset not found."
        else {     
            if (!nft) return "Asset not found.";

            const {
                __v,
                ...others
            } = nft._doc;
        
            return others;
        }
    } catch (error) {
        return error.message
    }
}

// scan nft
export const scanNFT = async (userId, nftId) => {
    try {
        const user = await UserModel.findById({_id: userId});
        const wallet = await WalletModel.findById({_id: user.wallet});
        const nft = await NFTModel.findOne({
            _id: nftId,
        }).populate(
            "users",
            "fullName gender age profilePic"
        )

        if (!nft) return "Asset not found."
        else {     
            if (!nft.isMinted) return "Asset not found.";

            if (user.scanCount < 5) {
                user.scanCount = user.scanCount + 1;
                await user.save();

                await NFTModel.findByIdAndUpdate(
                    {_id: nftId},
                    {$push: {users: userId}},
                    {new: true}
                )
                await WalletModel.findByIdAndDelete(
                    {_id: user.wallet},
                    {$push: {scannedNFTs: nftId}},
                    {new: true}
                )

                // reward user
                wallet.balance = wallet.balance + REWARD_AMOUNT;
                await wallet.save();

                try {
                    // get user balance from the blockchain (needed in order to keep the balance updated with that of the blockchain)
                    const onchainBalance = await getUserBalance(wallet.publicKey);
                    const balanceDifference = wallet.balance - onchainBalance;

                    if (balanceDifference < 0) {
                        // send a charge user call to the contract
                        await transactionPool.addTxToPool(wallet.publicKey, "reward", Math.abs(balanceDifference));
                    } else if (balanceDifference >= 0) {
                        // send a reward user call to the contract
                        await transactionPool.addTxToPool(wallet.publicKey, "charge", balanceDifference);
                    } else {
                        return "Error occurred. Please try again."
                    }

                    // mint nft
                    const scannedNFT = await scanNFT(
                        wallet.publicKey,
                        user.scanCount,
                        nftId
                    );

                    if (scannedNFT) {
                        const {
                            __v,
                            // scanCount,
                            ...others
                        } = scannedNFT._doc;
                    
                        return others;
                    } else return "Error occured during scanning. Please try again."
                } catch (error) {
                    return error.message
                }

            } else return "You have reached the limit of allowed scans a day. Try again tomorrow."
        }
    } catch (error) {
        return error.message
    }
}

// mint nft
export const mintNFT = async (userId, nftId) => {
    try {
        const user = await UserModel.findById({_id: userId});
        const wallet = await WalletModel.findById({_id: user.wallet});
        const image = await NFTModel.findOne({
        _id: nftId,
        creator: userId,
        });

        if (wallet.balance < 5) return "Insufficient balance for transaction.";

        if (!image) return "Asset not found.";
        if (image.isMinted) return "NFT already minted.";

        // charge user
        wallet.balance = wallet.balance - MINTING_FEE;
        await wallet.save();

        try {
            // get user balance from the blockchain (needed in order to keep the balance updated with that of the blockchain)
            const onchainBalance = await getUserBalance(wallet.publicKey);
            const balanceDifference = wallet.balance - onchainBalance;
            if (balanceDifference < 0) {
                // send a charge user call to the contract
                await transactionPool.addTxToPool(wallet.publicKey, "reward", Math.abs(balanceDifference));
            } else if (balanceDifference >= 0) {
                // send a reward user call to the contract
                await transactionPool.addTxToPool(wallet.publicKey, "charge", balanceDifference);
            } else {
                return "Error occurred. Please try again."
            }

            // mint nft
            const mintedNFT = await mintUserNFT(
                wallet.publicKey,
                image.name,
                image.description,
                image.imageURI,
                image._id
            );

            if (mintedNFT) {
                // update user owned nfts list
                await WalletModel.findByIdAndDelete(
                    {_id: user.wallet},
                    {$push: {ownedNFTs: nftId}},
                    {new: true}
                )

                image.isMinted = true;
                image.mintedOn = new Date();

                const NFT = await image.save();

                if (NFT) {
                    const {
                        __v,
                        ...others
                    } = NFT._doc;
                
                    return others
                } else return "Error occured while saving minted nft to database";
            } else return "NFT not minted. Error occured"

        } catch (error) {
            return error.message;
        }
    } catch (error) {
        return error.message;
    }
}

// nickname nft
export const nicknameNFT = async (userId, nftId, nickname) => {
    try {
        const user = await UserModel.findOne({_id: userId});
        const wallet = await WalletModel.findById({_id: user.wallet});
        const nft = await NFTModel.findById({
            _id: nftId,
        });

        if (!nft) return "Asset not found";
        else {
            if (nft.isNicknamed) return "Asset already nicknamed";

            if (wallet.balance >= NICKNAMING_FEE) {
                wallet.balance = wallet.balance + NICKNAMING_FEE;
                await wallet.save();

                nft.nickname = nickname;
                const nicknamedNFT = await nicknameNFT(wallet.publicKey, nftId, nickname);
                
                if (nicknamedNFT) {
                    const savedNFT = await nft.save();
    
                    if (savedNFT) {
                        const {
                            __v,
                            ...others
                        } = savedNFT._doc;
                    
                        return others
                    } else return "Error occured while giving nickname to NFT";
                }
            }
        }
    } catch (error) {
        return error.message;
    }
}

// upload image
export const uploadImage = async (userId, name, description, imageURI) => {
    try {
        const newImage = await NFTModel.create({
            name,
            description,
            imageURI,
            creator: userId
        });

        if (newImage) {
            const { __v, ...others } = newImage._doc;
            return others;
        } else {
            return "Error occurred while uploading new asset";
        }
    } catch (error) {
        return error.message;
    }
};

// update image
export const updateImage = async (userId, imageId, values) => {
    try {
        const image = await NFTModel.findById({
            _id: imageId,
            creator: userId,
            isMinted: false
        });

        if (!image) return "Asset not found!";
        else {
            // image.name = name;

            const savedImage = await NFTModel.findByIdAndUpdate(
                {_id: imageId},
                values,
                { new: true}
            );
        
            if (savedImage) {
                const {
                    __v,
                    ...others
                } = savedImage._doc;
            
                return others
            }
            else return "Error durring Image update";
        }

    } catch (error) {
        return error.message;
    }
}

// delete image
export const deleteImage = async (userId, imageId) => {
    try {
        const image = await NFTModel.findOne({
            _id: imageId,
            creator: userId,
            isMinted: false
        });

        if (!image) return "Asset not found!";
    
        await NFTModel.findByIdAndDelete({
            _id: imageId
        });

        const deletedImage = await NFTModel.findByIdAndDelete({_id: imageId});
    
        if (deletedImage) return {
            image: deletedImage,
            deleted: true
        };
        else return "Error occured. Asset not deleted.";
    } catch (error) {
        return error.message;
    }
}

// delete all images?

// reset all scan counts
export const resetScanCounts = async () => {
    try {
        const users = await UserModel.find();

        users.map(async (user) => {
            if (user.scanCount > 0) {
                user.scanCount = 0;
                await user.save();
            }
        })
    } catch (error) {
        console.log("resetting error:", error.message);
    }
}

// reset all account token balances
export const resetTokenBalancess = async () => {
    try {
        const wallets = await WalletModel.find();

        wallets.map(async (wallet) => {
            if (wallet.balance > 0) {
                wallet.balance = 0;
                await wallet.save();
            }
        })

        // send reset call to blockchain
        await resetAllNRC();
    } catch (error) {
        console.log("resetting error:", error.message);
    }
}

