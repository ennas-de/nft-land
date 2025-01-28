import mongoose from "mongoose";

const nftSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, trim: true},
        description: {type: String, required: true, trim: true},
        nickname: {type: String, trim: true},
        imageURI: {type: String, required: true, trim: true},
        creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
        users: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'User',
            default: []
        },
        isNicknamed: {
            type: Boolean,
            default: false
        },
        isMinted: {
            type: Boolean,
            default: false
        },
        mintedOn: {
            type: Date,
        }
    },
    {
        timestamps: true
    }
)

const NFTModel = mongoose.model('NFT', nftSchema);

export default NFTModel;
