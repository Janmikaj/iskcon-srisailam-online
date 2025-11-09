import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
  Divider,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import upiqr from "../assets/upiqr.jpg"; // ✅ Ensure this image exists

const DonatePage = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      wants80G: false,
      pan: "",
      amount: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Enter a valid 10-digit phone number")
        .required("Phone number is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      pan: Yup.string().test(
        "pan-required",
        "PAN is required for 80G benefits",
        function (value) {
          const { wants80G } = this.parent;
          if (wants80G) {
            return !!value;
          }
          return true;
        }
      ),
      amount: Yup.number()
        .typeError("Amount must be a number")
        .required("Donation amount is required")
        .min(1, "Amount must be greater than 0"),
    }),
    onSubmit: (values) => {
      setDonationAmount(values.amount);
      setShowAlert(true);
      alert(`🙏 Thank you for donating ₹${values.amount}! Hare Krishna!`);
    },
  });

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          my: 4,
          p: 4,
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mb: 4, fontWeight: "bold", color: "#333" }}
        >
          Proceed to Donation
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="phone"
                name="phone"
                label="Phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    id="wants80G"
                    name="wants80G"
                    checked={formik.values.wants80G}
                    onChange={formik.handleChange}
                  />
                }
                label="Do you want 80G Benefits?"
              />
            </Grid>

            {formik.values.wants80G && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="pan"
                  name="pan"
                  label="PAN"
                  value={formik.values.pan}
                  onChange={formik.handleChange}
                  error={formik.touched.pan && Boolean(formik.errors.pan)}
                  helperText={formik.touched.pan && formik.errors.pan}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1" gutterBottom>
                Enter Donation Amount:
              </Typography>
              <TextField
                fullWidth
                id="amount"
                name="amount"
                label="Amount (₹)"
                type="number"
                value={formik.values.amount}
                onChange={formik.handleChange}
                error={formik.touched.amount && Boolean(formik.errors.amount)}
                helperText={formik.touched.amount && formik.errors.amount}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                sx={{
                  mt: 3,
                  py: 1.5,
                  backgroundColor: "#FF9933",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#FF7F00",
                  },
                }}
              >
                Donate Now
              </Button>
            </Grid>
          </Grid>
        </form>

        {showAlert && (
          <Alert severity="success" sx={{ mt: 3 }}>
            🎉 Thank you for donating ₹{donationAmount}! Hare Krishna 🙏
          </Alert>
        )}

        {/* ✅ QR Code Section */}
        <Box sx={{ mt: 5, textAlign: "center" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Or Scan this QR to Donate
          </Typography>
          <img
            src={upiqr}
            alt="UPI QR Code"
            style={{
              width: "250px",
              height: "250px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
          <Typography variant="body2" sx={{ mt: 2 }} color="text.secondary">
            <strong>UPI ID:</strong> 9032641581@hdfc
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default DonatePage;
