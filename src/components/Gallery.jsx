import React from "react";
import { Typography, Box, Card, CardMedia, CardActionArea } from "@mui/material";
import donation from "../assets/DONATION.jpg";

// Images array
const images = [
    { src: donation, alt: "Event 1" },
    { src: donation, alt: "Event 2" },
    { src: donation, alt: "Event 3" },
    { src: donation, alt: "Event 4" },
    { src: donation, alt: "Event 5" },
];

const Gallery = () => {
    return (
        <Box sx={{ padding: "3rem 2rem", backgroundColor: "#fefefe" }}>
            <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{
                    fontWeight: "bold",
                    marginBottom: "1.5rem",
                    color: "#333",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                }}
            >
                Social Media Gallery
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    overflowX: "auto",
                    gap: 2,
                    paddingBottom: "1rem",
                    scrollbarWidth: "thin", // For Firefox
                    "&::-webkit-scrollbar": {
                        height: "8px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#ccc",
                        borderRadius: "4px",
                    },
                }}
            >
                {images.map((image, index) => (
                    <Card
                        key={index}
                        sx={{
                            minWidth: 250,
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                            transition: "transform 0.3s, box-shadow 0.3s",
                            "&:hover": {
                                transform: "scale(1.05)",
                                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                            },
                        }}
                    >
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="200"
                                image={image.src}
                                alt={image.alt}
                                sx={{
                                    objectFit: "cover",
                                    borderRadius: "4px",
                                }}
                            />
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default Gallery;
