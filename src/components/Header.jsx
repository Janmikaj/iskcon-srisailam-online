import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from '../assets/logoiskcon.png'; // Adjust path if needed

const Header = () => {
  const { t, i18n } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  // Main menu links (for header)
  const menuItems = [
    { text: t('home'), link: '/home' },
    { text: t('activities'), link: '/activities' },
    { text: t('donate'), link: '/donate' },
    { text: t('contact'), link: '/contact' },
  ];

  // Add Admin page if role is admin
  if (role === 'admin') {
    menuItems.push({ text: 'Admin', link: '/admin' });
  }

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#ffffff',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Toolbar>
        {/* Left side: Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Link
            to="/home"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              color: 'inherit',
            }}
          >
            <img src={Logo} alt="ISKCON Logo" style={{ height: 50, marginRight: 10 }} />
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: 'bold', letterSpacing: 1 }}
            >
              ISKCON Srisailam
            </Typography>
          </Link>
        </Box>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          {menuItems.map((item, index) => (
            <Button
              key={index}
              color="inherit"
              component={Link}
              to={item.link}
              sx={{
                marginX: 1,
                textTransform: 'uppercase',
                fontWeight: 'bold',
                '&:hover': { backgroundColor: '#dee0de' },
              }}
            >
              {item.text}
            </Button>
          ))}
          {token ? (
            <Button
              color="error"
              onClick={handleLogout}
              sx={{
                marginX: 1,
                textTransform: 'uppercase',
                fontWeight: 'bold',
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              color="inherit"
              component={Link}
              to="/login"
              sx={{
                marginX: 1,
                textTransform: 'uppercase',
                fontWeight: 'bold',
                '&:hover': { backgroundColor: '#dee0de' },
              }}
            >
              Login
            </Button>
          )}
        </Box>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton color="inherit" edge="start" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Drawer for Mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            backgroundColor: '#f9f9f9',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {menuItems.map((item, index) => (
              <ListItem
                button
                key={index}
                component={Link}
                to={item.link}
                sx={{
                  marginY: 1,
                  borderRadius: 1,
                  '&:hover': { backgroundColor: '#dee0de' },
                }}
              >
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                />
              </ListItem>
            ))}
            <ListItem
              button
              onClick={token ? handleLogout : () => navigate('/login')}
              sx={{
                marginY: 1,
                borderRadius: 1,
                '&:hover': { backgroundColor: '#dee0de' },
              }}
            >
              <ListItemText
                primary={token ? 'Logout' : 'Login'}
                primaryTypographyProps={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;
