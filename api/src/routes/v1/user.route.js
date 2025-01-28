import express from "express";
import { DeleteUser, GetDashboard, GetProfile, UpdateUser } from "../../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/dashboard", GetDashboard);
userRouter.get("/profile", GetProfile);
userRouter.post("/update-account", UpdateUser);
userRouter.get("/delete", DeleteUser);

export default userRouter;