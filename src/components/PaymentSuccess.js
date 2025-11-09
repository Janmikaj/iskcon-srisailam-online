import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';

const PaymentSuccess = ({data}) => {
    const paymentID=data.paymentID
    const amount=data.amount/100
  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px' }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <CheckCircleIcon style={{ fontSize: '60px', color: 'green', marginBottom: '20px' }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Donation Successful
          </Typography>
          <Typography variant="body1" gutterBottom>
            Thank you for your generous donation! Your contribution has been successfully received by ISKCON Trust.
          </Typography>
          <Box mt={2}>
            <Typography variant="body2" color="textSecondary">
              Transaction ID: <strong>{paymentID}</strong>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Amount Donated: <strong>&#8377;{amount}</strong>
            </Typography>
          </Box>
          <Box mt={3} width="100%">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              component={Link}
              to="/"
            >
              Go to Homepage
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default PaymentSuccess;
