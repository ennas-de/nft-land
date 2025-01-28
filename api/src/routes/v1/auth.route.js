// auth.route.js
import express from "express";
import { login, RefreshAccessToken, register } from "../../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/login", login);

authRouter.post("/register", register);

authRouter.post("/refreshtoken", RefreshAccessToken);

export default authRouter;