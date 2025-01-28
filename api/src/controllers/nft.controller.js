import express from "express";
import asyncHandler from "express-async-handler";
import { deleteImage, getOwnedNFTs, getScannedNFTs, mintNFT, nicknameNFT, scanNFT, updateImage, uploadImage, viewNFT } from "../services/nft.service.js";
import { uploadToS3 } from "../utils/awsSDK.js";
import { uploadMiddleware } from "../middlewares/multer.middleware.js";


// owned nfts
export const GetOwnedNFTs = asyncHandler(async (req, res) => {
    try {
        const userId = req.userId;

        const response = await getOwnedNFTs(userId);

        if (typeof response == 'object') {
            return res.status(200).json({
                success: true,
                message: "Your NFTs",
                response
            });
        } else if (typeof response == 'string') {
            return res.status(400).json({
                success: false,
                message: response
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Error occured. Please try again.",
            });
        }
    } catch (error) {
        console.log(`Error ocurred while fetching user owned NFTs: ${error.message}`);
        return res.status(500).json({
          success: false,
          message: "Something else went wrong.",
        });
    }
})

// scanned nfts
export const GetScannedNFTs = asyncHandler(async (req, res) => {
    try {
        const userId = req.userId;

        const response = await getScannedNFTs(userId);

        if (typeof response == 'object') {
            return res.status(200).json({
                success: true,
                message: "Your scanned NFTs",
                response
            });
        } else if (typeof response == 'string') {
            return res.status(400).json({
                success: false,
                message: response
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Error occured. Please try again.",
              });
        }
    } catch (error) {
        console.log(`Error ocurred while fetching user's scanned NFTs: ${error.message}`);
        return res.status(500).json({
          success: false,
          message: "Something else went wrong.",
        });
    }
})

// view nft
export const ViewNFT = asyncHandler(async (req, res) => {
    try {
        const userId = req.userId;
        const nftId = req.params;

        const response = await viewNFT(userId, nftId);

        if (typeof response == 'object') {
            return res.status(200).json({
                success: true,
                message: `${response.name} NFT asset is fetched.`,
                response
            });
        } else if (typeof response == 'string') {
            return res.status(400).json({
                success: false,
                message: response
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Error occured. Please try again.",
              });
        }
    } catch (error) {
        console.log(`Error ocurred while fetching NFT details: ${error.message}`);
        return res.status(500).json({
          success: false,
          message: "Something else went wrong.",
        });
    }
})

// scan nft
export const ScanNFT = asyncHandler(async (req, res) => {
    try {
        const userId = req.userId;
        const nftId = req.params;

        const response = await scanNFT(userId, nftId);

        if (typeof response == 'object') {
            return res.status(200).json({
                success: true,
                message: `${response.name} NFT asset is fetched.`,
                response
            });
        } else if (typeof response == 'string') {
            return res.status(400).json({
                success: false,
                message: response
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Error occured. Please try again.",
              });
        }
    } catch (error) {
        console.log(`Error ocurred while fetching NFT details: ${error.message}`);
        return res.status(500).json({
          success: false,
          message: "Something else went wrong.",
        });
    }
})

// mint nft
export const MintNFT = asyncHandler(async (req, res) => {
    try {
        const userId = req.userId;
        const nftId = req.params;

        const response = await mintNFT(userId, nftId);

        if (typeof response == 'object') {
            return res.status(200).json({
                success: true,
                message: "NFT minted",
                response
            });
        } else if (typeof response == 'string') {
            return res.status(400).json({
                success: false,
                message: response
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Error occured. Please try again.",
              });
        }
    } catch (error) {
        
    }
})

// nickname nft
export const NicknameNFT = asyncHandler(async (req, res) => {
    try {
        const userId = req.userId;
        const {nftId, nickname} = req.body;

        
        if (!nftId || !nickname) return res.status(400).json({
            success: false,
            message: "Please fill all fields."
        })

        if (typeof nftId !== "string" || typeof nickname !== "string") return res.status(400).json({
            success: false,
            message: "Invalid inputs. Please try again."
        })

        const response = await nicknameNFT(userId, nftId, nickname);

        if (typeof response == 'object') {
            return res.status(200).json({
                success: true,
                message: "NFT nicknamed.",
                response
            });
        } else if (typeof response == 'string') {
            return res.status(400).json({
                success: false,
                message: response
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Error occured. Please try again.",
              });
        }
    } catch (error) {
        console.log(`Error ocurred while fetching user home: ${error.message}`);
        return res.status(500).json({
          success: false,
          message: "Something else went wrong.",
        });
    }
})

// upload image
export const UploadImage = [
    uploadMiddleware, 
    asyncHandler(async (req, res) => {
        try {
            const userId = req.userId; // Assuming userId is attached to req (could be from a middleware)
            const { name, description } = req.body;

            // Validate input
            if (!name || !description || !req.file) {
                return res.status(400).json({
                    success: false,
                    message: "Please provide all required fields, including the image file.",
                });
            }

            if (typeof name !== "string" || typeof description !== "string") {
                return res.status(400).json({
                    success: false,
                    message: "Invalid inputs. Please try again.",
                });
            }

            // send request to aws sdk for upload to AWS 
            const imageURI = await uploadToS3(req.file.buffer);

            // Call the service to save the image details in the database
            const response = await uploadImage(userId, name, description, imageURI);

            if (typeof response === 'object') {
                return res.status(200).json({
                    success: true,
                    message: "New Image uploaded successfully",
                    response,
                });
            } else if (typeof response === 'string') {
                return res.status(400).json({
                    success: false,
                    message: response,
                });
            } else {
                return res.status(500).json({
                    success: false,
                    message: "Error occurred. Please try again.",
                });
            }
        } catch (error) {
            console.error(`Error while uploading image: ${error.message}`);
            return res.status(500).json({
                success: false,
                message: "Something went wrong. Please try again later.",
            });
        }
    }),
];

// update image
export const UpdateImage = asyncHandler(async (req, res) => {
    try {
        const userId = req.userId;
        const {imageId, name, description} = req.body;

        
        if (!imageId || !name || !description) return res.status(400).json({
            success: false,
            message: "Please fill all fields."
        })

        if (typeof imageId !== "string" || typeof name !== "string" || typeof description !== "string") return res.status(400).json({
            success: false,
            message: "Invalid inputs. Please try again."
        })

        const values = {name, description};

        const response = await updateImage(userId, imageId, values);

        if (typeof response == 'object') {
            return res.status(200).json({
                success: true,
                message: "Image details updated",
                response
            });
        } else if (typeof response == 'string') {
            return res.status(400).json({
                success: false,
                message: response
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Error occured. Please try again.",
              });
        }
    } catch (error) {
        console.log(`Error ocurred while fetching user home: ${error.message}`);
        return res.status(500).json({
          success: false,
          message: "Something else went wrong.",
        });
    }
})

// delete image
export const DeleteImage = asyncHandler(async (req, res) => {
    try {
        const userId = req.userId;
        const nftId = req.params;

        // delete image from aws storage

        const response = await deleteImage(userId, nftId);

        if (typeof response == 'object') {
            return res.status(200).json({
                success: true,
                message: `${response.name} NFT asset is deleted.`,
                response
            });
        } else if (typeof response == 'string') {
            return res.status(400).json({
                success: false,
                message: response
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Error occured. Please try again.",
              });
        }
    } catch (error) {
        console.log(`Error ocurred while deleting Image: ${error.message}`);
        return res.status(500).json({
          success: false,
          message: "Something else went wrong.",
        });
    }
})

// delete all images?

// reset all scan counts
// export const ResetScanCounts = asyncHandler(async (req, res))