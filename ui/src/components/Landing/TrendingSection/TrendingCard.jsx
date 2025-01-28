

import {Button, Stack, Typography} from "@mui/material"

const BidCard = ({hotbid}) => {
    return (
        <Stack
            direction="column"
            spacing={2}
            justifyContent="space-between"
            sx={{
                // border: "1px solid #ddd",
                // borderRadius: "10px",
                // boxShadow: "0 4px 6px rgba(0,0,0, 0.1)",
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                textAlign: "center"
            }}
        >
            <img src={hotbid.imageURI} alt={hotbid.name}
                style={{
                    width: "270px",
                    height: "300px",
                    // border: "1px solid black",
                    borderRadius: "10px",
                    objectFit: "cover"
                }}
            />
            <hr style={{
                    height: "1px",
                    width: "270px",
                    marginTop: "12px"
                }}
            />
            
            <Stack
                direction="row"
                justifyContent="space-between"
                sx={{
                    width: "270px" 
                }}
            >
                <Stack
                    direction="column"
                    sx={{
                        fontSize: "10px"
                    }}
                >
                    <Typography
                        sx={{
                            // 
                        }}
                    >{hotbid.name}</Typography>
                    <Typography
                        sx={{
                            // 
                        }}
                    >{hotbid.description}</Typography>
                </Stack>
                <Typography
                    sx={{
                        border: "3px solid",
                        borderColor: (theme) => theme.palette.secondary.main,
                        borderRadius: "5px",
                        padding: "5px 7px",
                        alignText: "center",
                        alignConent: "center",
                        alignSelf: "center"
                    }}
                >
                    <span
                        style={{
                            // margin: "-5px -10px"
                        }}
                    >
                        {hotbid.owner}
                    </span>
                </Typography>
            </Stack>
        </Stack>
    )
}

export default BidCard;