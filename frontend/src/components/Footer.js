import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#ff9933',
        py: 3,
        color: 'white',
        mt: 'auto'
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
          <Link href="https://facebook.com" color="inherit" sx={{ mx: 1 }}>
            <Facebook fontSize="large" />
          </Link>
          <Link href="https://twitter.com" color="inherit" sx={{ mx: 1 }}>
            <Twitter fontSize="large" />
          </Link>
          <Link href="https://instagram.com" color="inherit" sx={{ mx: 1 }}>
            <Instagram fontSize="large" />
          </Link>
        </Box>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Copyright © <Link color="inherit">ISKCON Srisailam</Link> {new Date().getFullYear()}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
