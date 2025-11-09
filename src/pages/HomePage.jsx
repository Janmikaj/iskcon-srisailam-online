import React from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// ✅ Local images
import WelcomeImage from "../assets/topimage.jpg";
import BhaktiRetreat from "../assets/bhakti_retreat.jpg";
import KartikDeepotsava from "../assets/kartik_deepotsava.jpg";
import GitaJayanti from "../assets/gita_jayanti.jpg";
import VaikunthaEkadashi from "../assets/vaikuntha_ekadashi.jpg";
import NewYearKirtan from "../assets/newyear_kirtan.jpg";

const HomePage = () => {
  const { t } = useTranslation();

  // ✅ Upcoming events (Nov–Dec 2025)
  const events = [
    {
      title: "Bhakti Retreat 2025",
      description:
        "A spiritual retreat focused on meditation, chanting, and self-realization through the teachings of Lord Krishna.",
      date: "10 Nov 2025 - 12 Nov 2025",
      image: BhaktiRetreat,
    },
    {
      title: "Kartik Deepotsava",
      description:
        "Join the festival of lights dedicated to Lord Damodara, with thousands of lamps lit and devotional songs throughout the night.",
      date: "13 Nov 2025 - 30 Nov 2025",
      image: KartikDeepotsava,
    },
    {
      title: "Gita Jayanti Festival",
      description:
        "Celebrate the day when Lord Krishna revealed the Bhagavad Gita to Arjuna with recitations, kirtans, and talks on its timeless wisdom.",
      date: "11 Dec 2025",
      image: GitaJayanti,
    },
    {
      title: "Vaikuntha Ekadashi Celebration",
      description:
        "Join the special Ekadashi vrata with early morning darshan, kirtans, and the symbolic opening of Vaikuntha Dwara at the temple.",
      date: "26 Dec 2025",
      image: VaikunthaEkadashi,
    },
    {
      title: "New Year Kirtan Night",
      description:
        "Welcome the new year with blissful kirtans, bhajans, and prasadam, immersing in devotion and gratitude for the year ahead.",
      date: "31 Dec 2025",
      image: NewYearKirtan,
    },
  ];

  return (
    <Box>
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
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
          },
        }}
      >
        <Box sx={{ position: "relative", textAlign: "center", mt: 20 }}>
          <Typography variant="h6" gutterBottom>
            Welcome to
          </Typography>
          <Typography variant="h2" component="h1" sx={{ fontWeight: "bold" }}>
            ISKCON Srisailam
          </Typography>
        </Box>
      </Box>

      {/* 🎉 Events Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ mb: 4, fontWeight: "bold" }}
        >
          Upcoming Events (Nov–Dec 2025)
        </Typography>

        <Grid container spacing={3}>
          {events.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  boxShadow: 4,
                  borderRadius: 3,
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "scale(1.03)" },
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={event.image}
                  alt={event.title}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {event.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1, mb: 1 }}
                  >
                    {event.description}
                  </Typography>
                  <Typography variant="subtitle2" color="primary">
                    {event.date}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ mt: 2 }}
                    component={Link}
                    to="/donate"
                  >
                    Donate
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
