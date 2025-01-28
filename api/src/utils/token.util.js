import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { getProfile, updateUser } from '../services/user.service.js';

dotenv.config();

// generate access token
export const generateAccessToken = async (userId) => jwt.sign({userId}, process.env.ACCESS_TOKEN, { expiresIn: "7d" });

// generate refresh token
export const generateRefreshToken = async (userId) => {
    // console.log(userId)
    try {
        const refreshToken = jwt.sign(
            {userId},
            process.env.REFRESH_TOKEN,
            {
                expiresIn: "30d"
            }
        )

        const user = await getProfile(userId);

        if (!user) return false;

        // set expiration time for refresh token in db
        const expiryTime = new Date();
        expiryTime.setDate(expiryTime.getDate() + 30); // 30 days later

        // update user's refreshtoken in the db
        user.refreshToken = refreshToken;
        user.refreshTokenExpiresAt = expiryTime; 

        const updatedUser = await updateUser(user._id, user);

        if (updatedUser) return updatedUser.refreshToken;
    } catch (error) {
        console.log(`Error generating refresh token: ${error}`);
        return error.message;
    }
}