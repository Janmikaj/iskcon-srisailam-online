import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#ff9933',
        py: 3, // Reduced padding to decrease footer height
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}
        >
          ISKCON Srisailam
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
          <Link
            href="https://facebook.com"
            color="inherit"
            sx={{
              mx: 1,
              '&:hover': { color: '#333', transition: 'color 0.3s ease' },
            }}
          >
            <Facebook fontSize="large" />
          </Link>
          <Link
            href="https://twitter.com"
            color="inherit"
            sx={{
              mx: 1,
              '&:hover': { color: '#333', transition: 'color 0.3s ease' },
            }}
          >
            <Twitter fontSize="large" />
          </Link>
          <Link
            href="https://instagram.com"
            color="inherit"
            sx={{
              mx: 1,
              '&:hover': { color: '#333', transition: 'color 0.3s ease' },
            }}
          >
            <Instagram fontSize="large" />
          </Link>
        </Box>
        <Typography
          variant="body2"
          color="inherit"
          align="center"
          sx={{ mt: 2 }}
        >
          {'Copyright © '}
          <Link color="inherit" href="/">
            ISKCON Srisailam
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
