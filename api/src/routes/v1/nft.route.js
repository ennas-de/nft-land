import express from "express";
import { DeleteImage, GetOwnedNFTs, GetScannedNFTs, MintNFT, NicknameNFT, UpdateImage, UploadImage, ViewNFT } from "../../controllers/nft.controller.js";

const nftRouter = express.Router();

nftRouter.get("/owned", GetOwnedNFTs);
nftRouter.get("/scanned", GetScannedNFTs);
nftRouter.post("/view/:nftId", ViewNFT);
nftRouter.get("/mint/:nftId", MintNFT);
nftRouter.post("/nickname", NicknameNFT);
nftRouter.post("/image/upload", UploadImage);
nftRouter.post("/image/update", UpdateImage);
nftRouter.delete("/delete/:nftId", DeleteImage);

export default nftRouter;