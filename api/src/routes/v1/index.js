import express from "express";
import authRouter from "./auth.route.js";
import userRouter from "./user.route.js";
import nftRouter from "./nft.route.js";
import { authenticate } from "../../middlewares/auth.middleware.js";


const v1Router = express.Router();

v1Router.use('/auth', authRouter);
v1Router.use('/user', authenticate, userRouter);
v1Router.use('/nft', authenticate, nftRouter);

export default v1Router;