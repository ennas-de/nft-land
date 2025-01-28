// import {Request, Response, NextFunction} from 'express';
import jwt, { decode } from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModel from '../models/user.model.js';
import { generateAccessToken, generateRefreshToken } from '../utils/token.util.js';

dotenv.config();

// verify access token (log in)
export const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(400).json({
                success: false,
                message: "Invalid token format. Please log in."
            });
        }        

        const accessToken = authHeader && authHeader.split(" ")[1];

        if (!accessToken) return res.status(400).json({
            success: false,
            message: "Unauthorized! Please log in."
        })

        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN || "");

        // console.log("DECODED:", {decoded});

        if (typeof decoded === 'object' && decoded.userId) {
            const user = await UserModel.findById(decoded.userId);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found!",
                });
            }
            if (user) req.userId = decoded.userId;
            
            next();
        } else if (typeof decoded === 'string') {
            return res.status(400).json({
                success: false,
                message: "Unauthorized! Please log in."
            })
        }

    } catch (error) {
        console.error("Auth middleware error: ", {error});
        return res.status(500).json({
            success: false,
            message: "Something went wrong! Please try again."
        })
    }
}

// verify refresh token 
export const refreshAccessToken = async (refreshToken) => {
    try {
        if (!refreshToken) {
            console.log("Refresh Token absent")
            return false;
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);

        if (!decoded.userId || typeof decode === 'string') {
            console.log("decoded error:", decoded)
            return false;}

        else if (typeof decoded === 'object' && decoded.userId) {
            await generateRefreshToken(decoded.userId);
            const newAccessToken = await generateAccessToken(decoded.userId);

            return newAccessToken;
        } else return false;
    } catch (error) {
        console.log("Error on RefreshToken middleware:", {error});
        return false;
    }
}