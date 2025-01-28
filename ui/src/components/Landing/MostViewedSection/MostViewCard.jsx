import {Box, Card, Grid2, ImageList, ImageListItem, Stack, Typography} from "@mui/material";

const MostViewCard = ({creator}) => {
    return (
        <Stack
            direction="column"
            spacing={1}
            justifyContent="space-between"
            sx={{
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                textAlign: "center",
                backgroundColor: (theme) => theme.palette.primary.contrastText,
                borderRadius: "5px",
                padding: "10px",
                width: "268px",
                heigth: "300px",
            }}
        >
            {/* images stack */}
            <Grid2
                size={12}
                sx={{
                    marginBottom: "0"
                }}
            >
                <img src={creator.assets[0].imageURI} 
                    alt={creator.assets[0].name} 
                    style={{
                        width: "100%",
                        height: "90px",
                        borderRadius: "5px",
                        objectFit: "cover"
                    }}
                />
            </Grid2>
            
            {
                creator.assets.length >= 7 ? (
                    <Stack
                        direction="column"
                        sx={{

                        }}
                    >
                        <Grid2 size={12} container spacing={1}>
                            <Grid2 size={4}>
                                <img src={creator.assets[1].imageURI} 
                                    alt={creator.assets[1].name} 
                                    style={{
                                        width: "100%",
                                        height: "80px",
                                        borderRadius: "5px",
                                        objectFit: "cover"
                                    }}
                                />
                            </Grid2>
                            <Grid2 size={4}>
                                <img src={creator.assets[2].imageURI} 
                                    alt={creator.assets[2].name} 
                                    style={{
                                        width: "100%",
                                        height: "80px",
                                        borderRadius: "5px",
                                        objectFit: "cover"
                                    }}
                                />
                            </Grid2>
                            <Grid2 size={4}>
                                <img src={creator.assets[3].imageURI} 
                                    alt={creator.assets[3].name} 
                                    style={{
                                        width: "100%",
                                        height: "80px",
                                        borderRadius: "5px",
                                        objectFit: "cover"
                                    }}
                                />
                            </Grid2>
                        </Grid2>
                        <Grid2 size={12} container spacing={1}>
                            <Grid2 size={4}>
                                <img src={creator.assets[4].imageURI} 
                                    alt={creator.assets[4].name} 
                                    style={{
                                        width: "100%",
                                        height: "80px",
                                        borderRadius: "5px",
                                        objectFit: "cover"
                                    }}
                                />
                            </Grid2>
                            <Grid2 size={4}>
                                <img src={creator.assets[5].imageURI} 
                                    alt={creator.assets[5].name} 
                                    style={{
                                        width: "100%",
                                        height: "80px",
                                        borderRadius: "5px",
                                        objectFit: "cover"
                                    }}
                                />
                            </Grid2>
                            <Grid2 size={4}>
                                <img src={creator.assets[6].imageURI} 
                                    alt={creator.assets[6].name} 
                                    style={{
                                        width: "100%",
                                        height: "80px",
                                        borderRadius: "5px",
                                        objectFit: "cover"
                                    }}
                                />
                            </Grid2>
                        </Grid2>

                        
                    </Stack>
                ) : ( 
                    <ImageList variant="masonry" cols={3} gap={8}
                        sx={{
                            // padding: "10px"
                        }}
                    >
                        {creator.assets.map((asset, index) => (
                            <ImageListItem key={index}>
                            {/* <img
                                srcSet={`${creator.assets[0].imgeURI}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                src={`${creator.assets[0].imgeURI}?w=248&fit=crop&auto=format`}
                                alt={asset.title}
                                style={{
                                    // width: "248px",
                                    // heigth: ""
                                }}
                                loading="lazy"
                            /> */}
                            <img src={asset.imgeURI} 
                                    alt={asset.imgeURI} 
                                    style={{
                                        width: "100%",
                                        height: "80px",
                                        borderRadius: "5px",
                                        objectFit: "cover"
                                    }}
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                )
            }
                            
            {/* Bottom Text */}
            <Stack
                direction="column"
                sx={{
                    alignContent: "start",
                    alignItems: "start",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "15px",
                        fontWeight: "bold",
                        textTransform: "capitalize",
                        marginBottom: "5px",
                    }}
                >{creator.owner}</Typography>
                <Box
                    sx={{
                        fontWeight: "light",
                        border: "1px solid gray",
                        // borderColor: (theme) => theme.palette.tertiary.main,
                        borderRadius: "5px",
                        padding: "5px",
                    }}
                >
                    <Typography>{creator.assets.length} ITEMS</Typography>
                </Box>
            </Stack>
        </Stack>
    )
}

export default MostViewCard;