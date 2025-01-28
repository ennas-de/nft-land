
import cn from "classnames";
import {useEffect, useRef, useState} from "react";
import { Box, Button, Stack, Typography, styled } from "@mui/material"; // 
import {LeftArrowIcon, RightArrowIcon} from "@/components/Globals/Arrows";

import BidCard from "./BidCard";

const hotBids = [
    {
        name: "laptop",
        imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60",
        description: "1 Items",
        owner: "$7"
    },
    {
        name: "laptop",
        imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60",
        description: "1 Items",
        owner: "$7"
    },
    {
        name: "laptop",
        imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60",
        description: "1 Items",
        owner: "$7"
    },
    {
        name: "meme",
        imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2F9f168ef0-9f3a-11ef-b5a0-93db72e2be98-WhatsApp-Image-2024-11-07-at-17.18.08.jpeg&w=2048&q=60",
        description: "1 Items",
        owner: "$10"
    },
    {
        name: "laptop",
        imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60",
        description: "1 Items",
        owner: "$7"
    },
    {
        name: "laptop",
        imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60",
        description: "1 Items",
        owner: "$7"
    },
    {
        name: "laptop",
        imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60",
        description: "1 Items",
        owner: "$7"
    },
    {
        name: "meme",
        imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2F9f168ef0-9f3a-11ef-b5a0-93db72e2be98-WhatsApp-Image-2024-11-07-at-17.18.08.jpeg&w=2048&q=60",
        description: "1 Items",
        owner: "$10"
    },
    {
        name: "laptop",
        imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60",
        description: "1 Items",
        owner: "$7"
    },
    {
        name: "laptop",
        imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60",
        description: "1 Items",
        owner: "$7"
    },
    {
        name: "laptop",
        imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60",
        description: "1 Items",
        owner: "$7"
    },
    {
        name: "meme",
        imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2F9f168ef0-9f3a-11ef-b5a0-93db72e2be98-WhatsApp-Image-2024-11-07-at-17.18.08.jpeg&w=2048&q=60",
        description: "1 Items",
        owner: "$10"
    },
    {
        name: "laptop",
        imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60",
        description: "1 Items",
        owner: "$7"
    },
    {
        name: "laptop",
        imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60",
        description: "1 Items",
        owner: "$7"
    },
    {
        name: "laptop",
        imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60",
        description: "1 Items",
        owner: "$7"
    },
    {
        name: "meme",
        imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2F9f168ef0-9f3a-11ef-b5a0-93db72e2be98-WhatsApp-Image-2024-11-07-at-17.18.08.jpeg&w=2048&q=60",
        description: "1 Items",
        owner: "$10"
    },
    
]

const BidsButton = styled('div')(({ theme }) => ({
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
  

const HotBidSection = () => {
    const sliderRef = useRef(null);
  
    const scrollSlider = (direction) => {
      const container = sliderRef.current;
      const scrollAmount = container.offsetWidth; // Scroll by the container's width
      if (direction === "left") {
        container.scrollLeft -= scrollAmount;
      } else {
        container.scrollLeft += scrollAmount;
      }
    };
  
    return (
      <Box
        sx={{
          width: "100vw",
          backgroundColor: "#FCFCFD",
          padding: "50px 0",
          marginLeft: "calc(-50vw + 50%)",
          marginRight: "calc(-50vw + 50%)",
        }}
      >
        <Stack
          direction="column"
          sx={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 20px",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              marginBottom: "50px",
              alignContents: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "25px",
                fontWeight: "bold",
                lineHeight: "3rem",
                textAlign: "left"
              }}
            >
              Hot Bids
            </Typography>
            <Stack 
                direction="row" 
                spacing={2}
                sx={{
                }}
                
            >
              <BidsButton
                className="slider-arrow"
                onClick={() => scrollSlider("left")}
                sx={{
                }}
              >
                <LeftArrowIcon />
              </BidsButton>
              <BidsButton
                onClick={() => scrollSlider("right")}
                sx={{
                }}
              >
                <RightArrowIcon />
              </BidsButton>
            </Stack>
          </Stack>
  
          {/* Slider Section */}
          <Box
            ref={sliderRef}
            sx={{
              display: "flex",
              overflowX: "scroll",
              scrollBehavior: "smooth",
              gap: 3,
              paddingBottom: "10px",
              "::-webkit-scrollbar": { display: "none" }, // Hides scrollbar
            }}
          >
            {hotBids.length > 0 ? (
              hotBids.map((hotbid, index) => (
                <Box
                  key={index}
                  sx={{
                    flex: "0 0 calc(25% - 8px)", // Adjusting for 4 items in view
                    // flex: "0 0 calc(25% - 16px)", // Adjusting for 4 items in view
                    // width: "calc(25%)",
                    maxWidth: "calc(25% - 16px)",
                  }}
                >
                  <BidCard hotbid={hotbid} />
                </Box>
              ))
            ) : (
              <Typography>No Trending Artworks at the moment.</Typography>
            )}
          </Box>
        </Stack>
      </Box>
    );
  };

export default HotBidSection;