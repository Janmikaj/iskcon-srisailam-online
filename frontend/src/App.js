import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import HomePage from "./pages/HomePage";
import ActivitiesPage from "./pages/ActivitiesPage";
import DonatePage from "./pages/DonatePage";
import ContactPage from "./pages/ContactPage";
import TransactionsPage from "./pages/TransactionsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AdminPage from "./pages/AdminPage";

// Utils
import ProtectedRoute from "./utils/ProtectedRoute";

const theme = createTheme({
  palette: {
    primary: { main: "#FF9933" },
    secondary: { main: "#138808" },
    background: { default: "#FFFFFF" },
  },
  typography: { fontFamily: "'Poppins', sans-serif" },
});

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* 👇 Sticky Bottom Layout Wrapper */}
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Header />

          {/* 👇 Main content grows and pushes footer down */}
          <div style={{ flex: 1 }}>
            <Routes>
              {/* Smart Redirect */}
              <Route
                path="/"
                element={
                  token ? (
                    role === "admin" ? (
                      <Navigate to="/admin/dashboard" replace />
                    ) : (
                      <Navigate to="/home" replace />
                    )
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />

              {/* Public */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Protected */}
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/activities"
                element={
                  <ProtectedRoute>
                    <ActivitiesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/donate"
                element={
                  <ProtectedRoute>
                    <DonatePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/contact"
                element={
                  <ProtectedRoute>
                    <ContactPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/transactions"
                element={
                  <ProtectedRoute>
                    <TransactionsPage />
                  </ProtectedRoute>
                }
              />

              {/* Admin */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminPage />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>

          {/* 👇 Footer stays at bottom */}
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
