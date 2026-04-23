import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { spiritualImages } from "../utils/images";

// ✅ Local images
import WelcomeImage from "../assets/topimage.jpg";

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const response = await api.get("/events");
        const allEvents = response.data;
        
        const today = new Date().toISOString().split("T")[0];
        
        const upcoming = allEvents
          .filter(event => event.date >= today)
          .sort((a, b) => a.date.localeCompare(b.date))
          .slice(0, 5);
          
        setEvents(upcoming);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingEvents();
  }, []);

  return (
    <Box sx={{ backgroundColor: "#fff" }}>
      
      {/* 🌄 Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: "100vh",
          backgroundImage: `url(${WelcomeImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.55)",
          },
        }}
      >
        <Box sx={{ position: "relative", mt: 20 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ letterSpacing: 2, textTransform: "uppercase" }}
          >
            Welcome to
          </Typography>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: "bold",
              letterSpacing: 1,
              color: "#fff",
              textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
            }}
          >
            ISKCON Srisailam
          </Typography>
          <Button
            variant="contained"
            color="warning"
            component={Link}
            to="/donate"
            sx={{
              mt: 4,
              px: 4,
              py: 1,
              fontWeight: "bold",
              borderRadius: "25px",
              backgroundColor: "#f57c00",
              "&:hover": { backgroundColor: "#ef6c00" },
            }}
          >
            Support Our Mission
          </Button>
        </Box>
      </Box>

      {/* 🎉 Events Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            mb: 5,
            fontWeight: "bold",
            color: "#333",
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          Upcoming Events
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
            <CircularProgress color="warning" />
          </Box>
        ) : events.length === 0 ? (
          <Typography align="center" color="text.secondary">
            No upcoming events at the moment. Stay tuned!
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {events.map((event, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: 4,
                    borderRadius: 3,
                    overflow: "hidden",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: 8,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={event.imageUrl || spiritualImages[index % spiritualImages.length]}
                    alt={event.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "#f57c00" }}
                    >
                      {event.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1, mb: 1 }}
                    >
                      {event.description?.length > 120 
                        ? `${event.description.substring(0, 120)}...` 
                        : event.description}
                    </Typography>
                    <Typography variant="subtitle2" color="text.primary">
                      📅 {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        backgroundColor: "#f57c00",
                        color: "#fff",
                        borderRadius: "25px",
                        "&:hover": { backgroundColor: "#ef6c00" },
                      }}
                      component={Link}
                      to="/activities"
                    >
                      View Details
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* ✨ Footer */}
      <Box
        sx={{
          backgroundColor: "#f9f9f9",
          py: 3,
          textAlign: "center",
          borderTop: "1px solid #eee",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} ISKCON Srisailam. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
