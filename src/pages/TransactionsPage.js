import React from "react";
import { Formik, Field, Form } from "formik";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  FormHelperText,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import * as Yup from "yup";

const formatDate = (date) => {
  if (!date) return "";
  const formatted = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
  return formatted.replace(",", "").replace(/\//g, "-");
};

const validationSchema = Yup.object({
  passkey: Yup.string().required("Passkey cannot be empty."),
  startDate: Yup.date().required("Start date is required."),
  endDate: Yup.date()
    .required("End date is required.")
    .test(
      "end-date-greater-than-start",
      "End date must be greater than start date",
      function (value) {
        const { startDate } = this.parent;
        return !startDate || value > startDate;
      }
    ),
});

const TransactionsPage = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Formik
        initialValues={{
          passkey: "",
          startDate: null,
          endDate: null,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Passkey:", values.passkey);
          console.log("Start:", formatDate(values.startDate));
          console.log("End:", formatDate(values.endDate));
        }}
      >
        {({ setFieldValue, values, errors, touched }) => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
              backgroundColor: "#f4f7fc",
              padding: 2,
            }}
          >
            <Grid
              container
              spacing={3}
              justifyContent="center"
              alignItems="center"
              sx={{
                backgroundColor: "white",
                padding: 4,
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                maxWidth: "500px",
                width: "100%",
              }}
            >
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom align="center">
                  Please enter your passkey and select the dates to view your
                  transactions
                </Typography>
              </Grid>

              <Form style={{ width: "100%" }}>
                <Field
                  name="passkey"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Passkey"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      error={touched.passkey && Boolean(errors.passkey)}
                      helperText={touched.passkey && errors.passkey}
                      sx={{ marginBottom: 2 }}
                    />
                  )}
                />

                <Field
                  name="startDate"
                  render={() => (
                    <div style={{ position: "relative" }}>
                      <DateTimePicker
                        label="Start Date"
                        value={values.startDate}
                        onChange={(date) => setFieldValue("startDate", date)}
                        renderInput={(props) => <TextField {...props} fullWidth />}
                        disableFuture
                        margin="normal"
                      />
                      {touched.startDate && errors.startDate && (
                        <FormHelperText error>{errors.startDate}</FormHelperText>
                      )}
                    </div>
                  )}
                />

                <Field
                  name="endDate"
                  render={() => (
                    <div style={{ position: "relative" }}>
                      <DateTimePicker
                        label="End Date"
                        value={values.endDate}
                        onChange={(date) => setFieldValue("endDate", date)}
                        renderInput={(props) => <TextField {...props} fullWidth />}
                        disableFuture
                        margin="normal"
                      />
                      {touched.endDate && errors.endDate && (
                        <FormHelperText error>{errors.endDate}</FormHelperText>
                      )}
                    </div>
                  )}
                />

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                  sx={{
                    marginTop: "16px",
                    padding: "10px",
                    fontWeight: "bold",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  Submit
                </Button>
              </Form>
            </Grid>
          </Box>
        )}
      </Formik>
    </LocalizationProvider>
  );
};

export default TransactionsPage;
