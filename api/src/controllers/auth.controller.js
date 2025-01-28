import express from "express";
import asyncHandler from "express-async-handler";
import { loginUser, registerUser } from "../services/auth.service.js";
import {refreshAccessToken} from "./../middlewares/auth.middleware.js";

// register
export const register = asyncHandler (async (req, res) => {
    const { firstname, lastname, age, words, digits, petname } = req.body;
  
    if (!firstname || !lastname || !age || !req.body.gender || !words || !digits || !petname) {
      return res.status(400).json({
        success: false,
        message: 'Please provide fill all fields.',
      });
    }
  
    const gender = req.body.gender.toLowerCase();

    try {
        const response = await registerUser({ firstname, lastname, age, gender, words, digits, petname })
    
        if (typeof response === 'object') return res.status(201).json({
          success: true,
          message: 'User registered successfully!',
        });
        else if (typeof response === 'string') {
          return res.status(400).json({
          success: false,
          message: response,
          });
        } else {
          return res.status(400).json({
            success: false,
            message: "Error registering new user",
            });
        }
    } catch (error) {
        console.error({error});
        return res.status(500).json({
        success: false,
        message: 'Something went wrong during registration.',
        });
    }
})

// login
export const login = asyncHandler (async (req, res) => {
    const { password } = req.body;  
  
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Please provide your login details (three words, three digits, petname)."
      });
    }
  
    try {      
      const response = await loginUser(password);
  
      if (!response || typeof response == 'string') {
        return res.status(401).json({
          success: false,
          message: response
        });
      }
  
      if (response && typeof response === 'object') return res.status(200).json({
        success: true,
        message: "Login successful",
        response
      });
  
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({
        success: false,
        message: "Something went wrong! Please try again later."
      });
    }
})

// refresh accesstoken
export const RefreshAccessToken = asyncHandler(async (req, res) => {
  try {
    const refreshToken = req.rawHeaders[1];
    console.log({refreshToken})

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Session expired! Please login.",
      });
    }
    const newAccessToken = await refreshAccessToken(refreshToken);

    if (!newAccessToken)
      return res.status(400).json({
        success: false,
        message: "Session expired! Please login.",
      });
    else if(newAccessToken
    ) {
      return res.status(200).json({
        success: false,
        message: "New access token generated",
        accessToken: newAccessToken,
      });
    }
  } catch (error) {
    console.log(
      `Error generating new refresh token: ${error.message}`
    );
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again!",
    });
  }
});