import express from "express";
import asyncHandler from "express-async-handler";
import { deleteUser, getDashboard, getProfile, updateUser } from "../services/user.service.js";


// get dashboard (wallet and activities)
export const GetDashboard = asyncHandler(async (req, res) => {
    try {
        const userId = req.userId;

        const response = await getDashboard(userId);

        if (typeof response == 'object') {
            return res.status(200).json({
                success: true,
                message: "User Dashboard",
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
        console.log(`Error ocurred while fetching user dashboard: ${error.message}`);
        return res.status(500).json({
          success: false,
          message: "Something else went wrong.",
        });
    }
})

// get profile
export const GetProfile = asyncHandler(async (req, res) => {
    try {
        const userId = req.userId;

        const response = await getProfile(userId);

        if (typeof response == 'object') {
            return res.status(200).json({
                success: true,
                message: "User Profile",
                response
            });
        } else if (typeof response == 'string') {
            return res.status(400).json({
                success: false,
                message: response
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Error occured. Please try again.",
              });
        }
    } catch (error) {
        console.log(`Error ocurred while fetching user profile: ${error.message}`);
        return res.status(500).json({
          success: false,
          message: "Something else went wrong.",
        });
    }
})

// update profile
export const UpdateUser = asyncHandler(async (req, res) => {
    try {
        const userId = req.userId;
        const values = req.body;

        const response = await updateUser(userId, values);

        if (typeof response == 'object') {
            return res.status(200).json({
                success: true,
                message: "User details updated",
                response
            });
        } else if (typeof response == 'string') {
            return res.status(400).json({
                success: false,
                message: response
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Error occured. Please try again.",
              });
        }
    } catch (error) {
        console.log(`Error ocurred while updating user profile: ${error.message}`);
        return res.status(500).json({
          success: false,
          message: "Something else went wrong.",
        });
    }
})

// delete user
export const DeleteUser = asyncHandler(async (req, res) => {
    try {
        const userId = req.userId;

        const response = await deleteUser(userId);

        if (typeof response == 'object') {
            return res.status(200).json({
                success: true,
                message: "User account deleted",
                response
            });
        } else if (typeof response == 'string') {
            return res.status(400).json({
                success: false,
                message: response
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Error occured. Please try again.",
              });
        }
    } catch (error) {
        console.log(`Error ocurred while deleting user account: ${error.message}`);
        return res.status(500).json({
          success: false,
          message: "Something else went wrong.",
        });
    }
})