import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  Modal,
  Paper,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../utils/api";
import { QRCodeCanvas } from "qrcode.react";

const DonatePage = () => {
  const [openQR, setOpenQR] = useState(false);
  const [upiLink, setUpiLink] = useState("");
  const [payAmount, setPayAmount] = useState("");

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      wants80G: false,
      pan: "",
      amount: "",
      purpose: "",
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
          return this.parent.wants80G ? !!value : true;
        }
      ),
      amount: Yup.number()
        .typeError("Amount must be a number")
        .required("Donation amount is required")
        .min(1, "Amount must be greater than 0"),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        await api.post("/donations", values);

        // Save amount before clearing form
        setPayAmount(values.amount);

        // Create UPI link with amount
        const link = `upi://pay?pa=9032641581@hdfcbank&pn=ISKCON%20Srisailam&am=${values.amount}&cu=INR`;

        setUpiLink(link);
        setOpenQR(true);

        resetForm();
      } catch (err) {
        alert("Failed to record donation: " + err.message);
      }
    },
  });

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const eventName = params.get("event");
    if (eventName) {
      formik.setFieldValue("purpose", eventName);
    }
  }, [location]);

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          my: 4,
          p: 4,
          border: "1px solid #ddd",
          borderRadius: "12px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ mb: 4, fontWeight: "bold", color: "#333" }}
        >
          Proceed to Donation
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            {/* First Name */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>

            {/* Last Name */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>

            {/* Phone */}
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

            {/* Email */}
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

            {/* 80G Checkbox */}
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

            {/* PAN */}
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

            {/* Amount */}
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

            {/* Purpose/Activity */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="purpose"
                name="purpose"
                label="Purpose of Donation / Activity Name"
                placeholder="e.g. Kirtan Night, Temple Construction, etc."
                value={formik.values.purpose}
                onChange={formik.handleChange}
                error={formik.touched.purpose && Boolean(formik.errors.purpose)}
                helperText={formik.touched.purpose && formik.errors.purpose}
              />
            </Grid>

            {/* Donate Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                sx={{
                  mt: 3,
                  py: 1.5,
                  backgroundColor: "#FF9933",
                  fontWeight: "bold",
                  fontSize: "16px",
                  "&:hover": { backgroundColor: "#FF7F00" },
                }}
              >
                Donate Now
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      {/* QR POPUP */}
      <Modal open={openQR} onClose={() => setOpenQR(false)}>
        <Paper
          sx={{
            p: 4,
            width: 350,
            mx: "auto",
            mt: "10%",
            textAlign: "center",
            borderRadius: 3,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Scan to Pay ₹{payAmount}
          </Typography>

          {/* Auto-generated QR */}
          <QRCodeCanvas value={upiLink} size={230} />

          <Typography sx={{ mt: 2 }} color="text.secondary">
            UPI ID: 9032641581@hdfcbank
          </Typography>

          <Button
            sx={{ mt: 3 }}
            fullWidth
            variant="contained"
            onClick={() => setOpenQR(false)}
          >
            Close
          </Button>
        </Paper>
      </Modal>
    </Container>
  );
};

export default DonatePage;
