
import {Button, Stack, Typography} from "@mui/material";

import heroImg from "@/assets/images/hero/png/original_hero_svg.png";

const HeroSection = () => {
    return (
        <Stack
            direction={{
                "xs": "column",
                "md": "row"
            }}
            spacing={4}
            justifyContent="space-between"
            // p={2}
            sx={{
                margin: "40px auto 50 auto",
                paddingY: "50px", 
                alignContent: "center",
                alignItems: "center",
                // width: "100vw",
                overflow: "hidden",
            }}
        >
            <Stack
                direction="column"
                spacing={1}
                sx={{
                    // width: ""
                    // margin: "30px auto",
                    // padding: "20px auto" 
                }}
            >
                <Typography
                    sx={{
                        fontSize: "17px",
                        fontWeight: "bold",
                        color: (theme) => theme.palette.tertiary.main,
                        textTransform: "uppercase",
                        // marginBottom: "10px",
                    }}
                >The new creative economy</Typography>
                <Stack
                    direction={{
                        "xs": "column",
                        "md": "column"
                    }}
                    sx={{
                        fontSize: "65px",
                        fontWeight: "bold",
                        // letterSpacing: "0.1rem",
                        wordSpacing: "0.5rem",
                        lineHeight: "4rem",
                        // marginTop: "10px"
                    }}
                >
                    <span
                        style={{
                            display: "inline-block", 
                        }}
                    >Share your</span>
                    <span
                        style={{
                            display: "inline-block",
                        }}
                    >creations with</span>
                    <span
                        style={{
                            display: "inline-block",
                        }}
                    >the world</span>
                </Stack>
                <Typography
                    sx={{
                        fontSize: "",
                        fontWeight: "",
                        color: "gray",
                        padding: "20px 0"
                    }}
                > Connect with other Art lovers around the world.</Typography>
                <Stack
                    direction="row"
                    spacing={3}
                    sx={{

                    }}
                >
                    <Button
                        sx={{
                            borderRadius: "37px",
                            border: "1px solid gray",
                            padding: '8px 20px',
                            color: 'black'
                        }}
                    >Discover more</Button>
                    <Button
                        // variant="contained"
                        sx={{
                            borderRadius: "37px",
                            padding: '8px 20px',
                            backgroundColor: (theme) => theme.palette.primary.main,
                            color: "white",
                        }}
                    >Create Item</Button>
                </Stack>
            </Stack>
            <Stack>
                <img 
                src={heroImg} 
                alt="Hero" 
                // width={{
                //     md: "700px",
                //     xs: "420px"
                // }}
                // height={{
                //     md: "800px",
                //     xs: "280px"
                // }}
                style={{
                    width: "650px",
                    height: "550px",
                }}
                />
            </Stack>
        </Stack>
    )
}

export default HeroSection;