import React from 'react';
import { styled } from '@mui/material';
 
  
const ArrowButtons = styled('div')(({ theme }) => ({
  color: "gray", // Default text color
  border: "none", // No border by default
  // backgroundColor: "transparent", // Transparent background
  // borderRadius: "50%", // Ensure circular shape
  width: "36px", // Explicitly set equal width and height
  height: "36px", 
  display: "flex", // Center content
  alignItems: "center", // Center content vertically
  justifyContent: "center", // Center content horizontally
  

  "&:hover": {
    border: "1px solid gray", // Border on hover
    backgroundColor: "transparent", // Ensure no background on hover
    borderRadius: "50%",
    transition: "border 0.3s ease-in-out", // Smooth transition for border
  },
}));

export default ArrowButtons;