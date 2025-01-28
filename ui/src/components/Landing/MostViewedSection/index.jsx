import cn from "classnames";
import {useEffect, useRef, useState} from "react";
import { Box, Button, Stack, Typography, styled } from "@mui/material"; 
import ArrowButtons from "@/components/Globals/Arrows";
import RightArrowIcon from "@/components/Globals/Arrows/Right";
import LeftArrowIcon from "@/components/Globals/Arrows/Left";

import MostViewCard from "./MostViewCard";

import BackgroundImg from "@/assets/images/landing/hot-collections/index.png";

const mostViewed = [
    {
        owner: "ennas",
        assets: [
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2F9f168ef0-9f3a-11ef-b5a0-93db72e2be98-WhatsApp-Image-2024-11-07-at-17.18.08.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2F0217b230-fa39-11ec-b458-99bc1b8dd3ef-cash-VIXSWhHc8uM-unsplash.jpg&w=3840&q=60"
            },            
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2F9f168ef0-9f3a-11ef-b5a0-93db72e2be98-WhatsApp-Image-2024-11-07-at-17.18.08.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2F0217b230-fa39-11ec-b458-99bc1b8dd3ef-cash-VIXSWhHc8uM-unsplash.jpg&w=3840&q=60"
            },            
        ]
    },
    {
        owner: "clarke",
        assets: [
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2F0217b230-fa39-11ec-b458-99bc1b8dd3ef-cash-VIXSWhHc8uM-unsplash.jpg&w=3840&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2F9f168ef0-9f3a-11ef-b5a0-93db72e2be98-WhatsApp-Image-2024-11-07-at-17.18.08.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2F0217b230-fa39-11ec-b458-99bc1b8dd3ef-cash-VIXSWhHc8uM-unsplash.jpg&w=3840&q=60"
            },            
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2F9f168ef0-9f3a-11ef-b5a0-93db72e2be98-WhatsApp-Image-2024-11-07-at-17.18.08.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2F0217b230-fa39-11ec-b458-99bc1b8dd3ef-cash-VIXSWhHc8uM-unsplash.jpg&w=3840&q=60"
            },            
        ]
    },
    {
        owner: "Zaid",
        assets: [
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2F9f168ef0-9f3a-11ef-b5a0-93db72e2be98-WhatsApp-Image-2024-11-07-at-17.18.08.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2F0217b230-fa39-11ec-b458-99bc1b8dd3ef-cash-VIXSWhHc8uM-unsplash.jpg&w=3840&q=60"
            },            
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2F9f168ef0-9f3a-11ef-b5a0-93db72e2be98-WhatsApp-Image-2024-11-07-at-17.18.08.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2F0217b230-fa39-11ec-b458-99bc1b8dd3ef-cash-VIXSWhHc8uM-unsplash.jpg&w=3840&q=60"
            },            
        ]
    },
    {
        owner: "Nick",
        assets: [
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2F0217b230-fa39-11ec-b458-99bc1b8dd3ef-cash-VIXSWhHc8uM-unsplash.jpg&w=3840&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2F9f168ef0-9f3a-11ef-b5a0-93db72e2be98-WhatsApp-Image-2024-11-07-at-17.18.08.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2F0217b230-fa39-11ec-b458-99bc1b8dd3ef-cash-VIXSWhHc8uM-unsplash.jpg&w=3840&q=60"
            },            
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2F9f168ef0-9f3a-11ef-b5a0-93db72e2be98-WhatsApp-Image-2024-11-07-at-17.18.08.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2F0217b230-fa39-11ec-b458-99bc1b8dd3ef-cash-VIXSWhHc8uM-unsplash.jpg&w=3840&q=60"
            },            
        ]
    },
    {
        owner: "Pablo",
        assets: [
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2F9f168ef0-9f3a-11ef-b5a0-93db72e2be98-WhatsApp-Image-2024-11-07-at-17.18.08.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2F0217b230-fa39-11ec-b458-99bc1b8dd3ef-cash-VIXSWhHc8uM-unsplash.jpg&w=3840&q=60"
            },            
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2F9f168ef0-9f3a-11ef-b5a0-93db72e2be98-WhatsApp-Image-2024-11-07-at-17.18.08.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2F0217b230-fa39-11ec-b458-99bc1b8dd3ef-cash-VIXSWhHc8uM-unsplash.jpg&w=3840&q=60"
            },            
        ]
    },
    {
        owner: "clarke",
        assets: [
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2F9f168ef0-9f3a-11ef-b5a0-93db72e2be98-WhatsApp-Image-2024-11-07-at-17.18.08.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2F0217b230-fa39-11ec-b458-99bc1b8dd3ef-cash-VIXSWhHc8uM-unsplash.jpg&w=3840&q=60"
            },            
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2F9f168ef0-9f3a-11ef-b5a0-93db72e2be98-WhatsApp-Image-2024-11-07-at-17.18.08.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2F0217b230-fa39-11ec-b458-99bc1b8dd3ef-cash-VIXSWhHc8uM-unsplash.jpg&w=3840&q=60"
            },            
        ]
    },
    {
        owner: "ennas",
        assets: [
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2F0217b230-fa39-11ec-b458-99bc1b8dd3ef-cash-VIXSWhHc8uM-unsplash.jpg&w=3840&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2F9f168ef0-9f3a-11ef-b5a0-93db72e2be98-WhatsApp-Image-2024-11-07-at-17.18.08.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2F0217b230-fa39-11ec-b458-99bc1b8dd3ef-cash-VIXSWhHc8uM-unsplash.jpg&w=3840&q=60"
            },            
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2F9f168ef0-9f3a-11ef-b5a0-93db72e2be98-WhatsApp-Image-2024-11-07-at-17.18.08.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2F0217b230-fa39-11ec-b458-99bc1b8dd3ef-cash-VIXSWhHc8uM-unsplash.jpg&w=3840&q=60"
            },            
        ]
    },
    {
        owner: "ennas",
        assets: [
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2F0217b230-fa39-11ec-b458-99bc1b8dd3ef-cash-VIXSWhHc8uM-unsplash.jpg&w=3840&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2F9f168ef0-9f3a-11ef-b5a0-93db72e2be98-WhatsApp-Image-2024-11-07-at-17.18.08.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60"
            },
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2F0217b230-fa39-11ec-b458-99bc1b8dd3ef-cash-VIXSWhHc8uM-unsplash.jpg&w=3840&q=60"
            },            
            {
                name: "laptop",
                imageURI: "https://cosmic-nextjs-marketplace.vercel.app/_next/image?url=https%3A%2F%2Fimgix.cosmicjs.com%2Fcf9a5040-b2bb-11ef-bee4-3bb1d3c55332-f8a7c88364f0090734bfd8cd673899c9.jpeg&w=2048&q=60"
            },         
        ]
    },
    
]

const MostViewedSection = () => {
    const sliderRef = useRef(null);

    const scrollSlider = (direction) => {
        const container = sliderRef.current;
        const scrollAmount = container.offsetWidth;
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
                // height: "",
                backgroundImage: `url(${BackgroundImg})`,
                backgroundRepeact: "no-repeat",
                backgroundSize: "cover",
                padding: "50px 0",
                marginLeft: "calc(-50vw + 50%)",
                marginRight: "calc(-50vw + 50%)",
                overflow: "hidden"
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
                        marginBottom: "70px",
                        alignContents: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "45px",
                            fontWeight: "bold",
                            lineHeight: "3rem",
                            textAlign: "left"
                        }}
                    >
                        Popular Creators
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{}}
                    >
                        <ArrowButtons
                            onClick={() => scrollSlider("left")}
                            sx={{
                            }}
                        >
                            <LeftArrowIcon />
                        </ArrowButtons>
                        <ArrowButtons
                            onClick={() => scrollSlider("right")}
                            sx={{}}
                        >
                            <RightArrowIcon />
                        </ArrowButtons>
                    </Stack>
                </Stack>
                <Box
                    ref={sliderRef}
                    sx={{
                        display: "flex",
                        overflow: "scroll",
                        scrollBehavior: "smooth",
                        gap: 3,
                        paddingBottom: "10px",
                        "::-webkit-scrollbar": {display: "none"}
                    }}
                >
                    {
                        mostViewed.length > 0 ? (
                            mostViewed.map((creator, index) => 
                                <Box
                                    key={index}
                                    sx={{
                                        flex: "0 0 calc(25% - 16px",
                                        flexGrow: "1",
                                        flexShrink: "1",
                                    }}
                                >
                                    <MostViewCard creator={creator} />
                                </Box>
                            ) 
                        ) : (
                            <Typography>No Popular Creator at the moment.</Typography>
                        )
                    }
                </Box>
            </Stack>
        </Box>
    )
}

export default MostViewedSection;