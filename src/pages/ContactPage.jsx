import React from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import WelcomeImage from '../assets/topimage.jpg'; // reuse same hero image as HomePage

const ContactPage = () => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t('required')),
      email: Yup.string().email(t('invalidEmail')).required(t('required')),
      message: Yup.string().required(t('required')),
    }),
    onSubmit: (values) => {
      console.log('Form submitted:', values);
      alert(t('messageSent'));
    },
  });

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '60vh',
          backgroundImage: `url(${WelcomeImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.35)', // lighter overlay for better visibility
          },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 'bold',
              textShadow: '2px 2px 8px rgba(0,0,0,0.6)',
            }}
          >
            {t('contact Us') || 'Contact Us'}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mt: 1,
              fontWeight: 500,
              textShadow: '1px 1px 6px rgba(0,0,0,0.7)',
            }}
          >
            {t('get In Touch') || 'We’d love to hear from you!'}
          </Typography>
        </Box>
      </Box>

      {/* Contact Info and Form Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Contact Info */}
          <Grid item xs={12} md={5}>
            <Card sx={{ height: '100%', boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {t('contactInformation') || 'Contact Information'}
                </Typography>
                <Typography sx={{ lineHeight: 1.8 }}>
                  ISKCON Srisailam <br />
                  123 Temple Street <br />
                  Srisailam, Andhra Pradesh 518101 <br />
                  India
                </Typography>
                <Typography sx={{ mt: 3 }}>
                  📞 <strong>{t('phone') || 'Phone'}:</strong> +91 1234567890 <br />
                  ✉️ <strong>{t('email') || 'Email'}:</strong> info@iskconsrisailam.org
                </Typography>
                <Typography sx={{ mt: 3 }}>
                  ⏰ <strong>{t('timings') || 'Temple Timings'}:</strong> <br />
                  5:00 AM – 9:00 PM (All days)
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {t('sendMessage') || 'Send a Message'}
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label={t('name')}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label={t('email')}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    id="message"
                    name="message"
                    label={t('message')}
                    multiline
                    rows={4}
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    error={formik.touched.message && Boolean(formik.errors.message)}
                    helperText={formik.touched.message && formik.errors.message}
                    margin="normal"
                  />
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                    sx={{ mt: 2 }}
                  >
                    {t('sendMessage') || 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Google Map */}
        <Box
          sx={{
            mt: 6,
            height: '400px',
            width: '100%',
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: 3,
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3848.5518557763726!2d78.86843731484096!3d15.314699989340878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb5e9a0d4d2e1a7%3A0x9f1d9a0d9f9a9a9a!2sSri%20Bhramaramba%20Mallikarjuna%20Swamy%20Temple!5e0!3m2!1sen!2sin!4v1627984762111!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="ISKCON Srisailam Location"
          ></iframe>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactPage;
