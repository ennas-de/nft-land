import mongoose from "mongoose";

const walletSchema = new mongoose.Schema(
    {
        publicKey: {
            type: String,
            required: true
        },
        privateKey: {
            type: String,
            required: true
        },
        balance: {
            type: Number,
            required: true,
            default: 0
        },
        ownedNFTs: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'NFT',
            default: []
        },
        scannedNFTs: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'NFT',
            default: []
        },
        uploadedAssets: [{
            type: String,
            default: ""
        }],

    },
    {
        timestamps: true
    }
)

const WalletModel = mongoose.model("Wallet", walletSchema);

export default WalletModel;