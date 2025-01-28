import NFTModel from "../models/nft.model.js";
import UserModel from "../models/user.model.js";
import WalletModel from "../models/wallet.model.js";


// get dashboard (wallet and activities)
export const getDashboard = async (userId) => {
    try {
        const user = await UserModel.findOne({_id: userId})
            .populate(
                "wallet",
                "publicKey balance ownedNFTs scannedNFTs uploadedAssets"
            );
            console.log({user})

        if (!user) return "Account not found.";

        const {
            password,
            refreshTokenExpiresAt,
            createdAt,
            updatedAt,
            loginDetail,
            __v,
            ...others
        } = user._doc;
    
        return others
    } catch (error) {
        return error.message;
    }
}

// get profile 
export const getProfile = async (userId) => {
    try {
        const user = await UserModel.findOne({_id: userId});

        if (!user) return "Account not found.";
    
        const {
            password,
            refreshTokenExpiresAt,
            createdAt,
            updatedAt,
            loginDetail,
            __v,
            ...others
        } = user._doc;
    
        return others;
    } catch (error) {
        return error.message;
    }
}

// update user
export const updateUser = async (userId, values) => {
    try {
        const user = await UserModel.findById({_id: userId});

        if (!user) return "Account not found!";
    
        const updatedUser = await UserModel.findByIdAndUpdate(
            {_id: userId},
            values,
            { new: true}
        );
    
        if (updatedUser) return updatedUser;
        else return "Error durring account update";
    } catch (error) {
        return error.message;
    }
}

// delete user
export const deleteUser = async (userId) => {
    try {
        const user = await UserModel.findById({_id: userId});

        if (!user) return "Account not found!";
    
        // delete all user activities
        // delete all user owned nfts
        await NFTModel.deleteMany({
            creator: userId
        });
        await WalletModel.deleteOne({
            _id: user.wallet
        });
        // remove user records from scanned nfts?

        const deletedUser = await UserModel.findByIdAndDelete({_id: userId});
    
        if (deletedUser) return {
            user: deletedUser,
            deleted: true
        };
        else return "Error durring account update";
    } catch (error) {
        return error.message;
    }
}
