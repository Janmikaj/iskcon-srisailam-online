import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import QRImage from "../assets/qrcode.jpg";

const donations = [
  { meals: 50, amount: 1000 },
  { meals: 100, amount: 2000 },
  { meals: 250, amount: 5000 },
  { meals: 500, amount: 10000 },
];

const Donation = () => {
  const { t } = useTranslation();

  return (
    <Box p={4} sx={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#333",
          textTransform: "uppercase",
          marginBottom: "2rem",
        }}
      >
        Donate to ISKCON to Feed Poor
      </Typography>

      <Grid container spacing={4}>
        {/* Donation Options */}
        {donations.map((donation, index) => (
          <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
            <Card
              variant="outlined"
              sx={{
                borderColor: "#FF9933",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  align="center"
                  sx={{ fontWeight: "bold" }}
                >
                  Donate {donation.meals} Meals
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  sx={{ color: "#FF9933", fontWeight: "bold", mt: 1 }}
                >
                  ₹ {donation.amount.toLocaleString()}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center", marginTop: "auto" }}>
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  to="/donate"
                  sx={{
                    backgroundColor: "#FF9933",
                    color: "#fff",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#FF7F00",
                      color: "#fff",
                    },
                  }}
                >
                  {t("donateNow")}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}

        {/* Bank Transfer Details and QR Image */}
        <Grid container item xs={12} spacing={4} mt={4}>
          {/* Bank Details */}
          <Grid item xs={12} sm={12} md={12} lg={8}>
            <Card sx={{ border: "1px solid #FF9933", boxShadow: "none" }}>
              <CardContent>
                <Typography
                  variant="h6"
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    marginBottom: "1rem",
                  }}
                >
                  Donation Through Bank (NEFT/RTGS)
                </Typography>
                <Typography variant="body1">
                  <strong>Bank Name:</strong> Union Bank
                </Typography>
                <Typography variant="body1">
                  <strong>Account Name:</strong> ISKCON DORNALA
                </Typography>
                <Typography variant="body1">
                  <strong>Account Number:</strong> 309612010001416
                </Typography>
                <Typography variant="body1">
                  <strong>IFSC Code:</strong> UBIN0830968
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ color: "#FF9933" }}>
                  80G Available As Per Income Tax Act 1961 And Rules Made
                  Thereunder
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Income Tax Exemption (80G) Number: AAATI0017PF20219
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography
                  variant="h6"
                  color="error"
                  sx={{ fontWeight: "bold" }}
                >
                  80G Benefits Cannot Be Availed On Paytm Donations Except Paytm
                  UPI Transfer
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* QR Code Image */}
          <Grid item xs={12} sm={12} md={12} lg={4}>
            <Card sx={{ boxShadow: "none" }}>
              <CardMedia
                component="img"
                image={QRImage}
                alt="Donation QR Code"
                sx={{
                  height: "100%",
                  objectFit: "cover",
                  border: "1px solid #FF9933",
                }}
              />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Donation;
