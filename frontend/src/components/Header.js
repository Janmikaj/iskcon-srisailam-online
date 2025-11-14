import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/logoiskcon.png";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setRole("");
    navigate("/login");
    // ✅ Trigger header re-render
    window.dispatchEvent(new Event("storage"));
  };

  // ✅ Automatically sync login/logout changes & navigation
  useEffect(() => {
    const updateAuthState = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
      setRole(localStorage.getItem("role") || "");
    };

    updateAuthState(); // Run once on mount
    window.addEventListener("storage", updateAuthState);

    // Run on every route change (so header updates instantly after login)
    updateAuthState();

    return () => {
      window.removeEventListener("storage", updateAuthState);
    };
  }, [location]);

  // ✅ Main navigation links
  const menuItems = [
    { text: "Home", link: "/home" },
    { text: "Activities", link: "/activities" },
    { text: "Donate", link: "/donate" },
    { text: "Contact", link: "/contact" },
  ];

  // ✅ Add Admin Panel link if logged in as admin
  if (isLoggedIn && role === "admin") {
    menuItems.push({ text: "Admin Panel", link: "/admin/dashboard" });
  }

  return (
    <>
      {/* ✅ Fixed Header */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#ffffff",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          {/* Left: Logo + Title */}
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Link
              to="/home"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                color: "inherit",
              }}
            >
              <img
                src={Logo}
                alt="ISKCON Logo"
                style={{ height: 50, marginRight: 10 }}
              />
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: "bold", letterSpacing: 1, color: "#333" }}
              >
                ISKCON Srisailam
              </Typography>
            </Link>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
            {menuItems.map((item, index) => (
              <Button
                key={index}
                color="inherit"
                component={Link}
                to={item.link}
                sx={{
                  marginX: 1,
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  color: "#333",
                  "&:hover": {
                    backgroundColor: "#f9fafb",
                    color: "#f57c00",
                  },
                }}
              >
                {item.text}
              </Button>
            ))}

            {isLoggedIn ? (
              <Button
                onClick={handleLogout}
                sx={{
                  marginX: 1,
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  color: "white",
                  backgroundColor: "#f57c00",
                  "&:hover": { backgroundColor: "#ef6c00" },
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                component={Link}
                to="/login"
                sx={{
                  marginX: 1,
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  color: "white",
                  backgroundColor: "#8e24aa",
                  "&:hover": { backgroundColor: "#6a1b9a" },
                }}
              >
                Login
              </Button>
            )}
          </Box>

          {/* Mobile Menu Icon */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton color="inherit" edge="start" onClick={toggleDrawer(true)}>
              <MenuIcon sx={{ color: "#333" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ✅ Spacer so content isn’t hidden behind header */}
      <Toolbar />

      {/* Drawer for Mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            backgroundColor: "#fff",
            height: "100%",
            display: "flex",
            flexDirection: "column",
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
                  marginY: 0.5,
                  borderRadius: 1,
                  "&:hover": { backgroundColor: "#f9fafb" },
                }}
              >
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                />
              </ListItem>
            ))}

            <ListItem
              button
              onClick={isLoggedIn ? handleLogout : () => navigate("/login")}
              sx={{
                marginY: 0.5,
                borderRadius: 1,
                "&:hover": { backgroundColor: "#f9fafb" },
              }}
            >
              <ListItemText
                primary={isLoggedIn ? "Logout" : "Login"}
                primaryTypographyProps={{
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
