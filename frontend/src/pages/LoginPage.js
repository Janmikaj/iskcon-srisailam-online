import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logoiskcon.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, role } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      setMessage("✅ Login successful!");
      setTimeout(() => {
        if (role === "admin") navigate("/admin/dashboard");
        else navigate("/home");
      }, 700);
    } catch (err) {
      setMessage("❌ Invalid credentials. Please try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f9fafb, #e0f7fa)",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          padding: "40px 50px",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        {/* ✅ Logo */}
        <img
          src={Logo}
          alt="ISKCON Logo"
          style={{ height: 70, marginBottom: 15 }}
        />

        <h2
          style={{
            fontSize: "1.8rem",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "10px",
          }}
        >
          Login
        </h2>

        <p style={{ color: "#666", marginBottom: "25px", fontSize: "0.95rem" }}>
          Access your ISKCON Srisailam account
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "0.95rem",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "0.95rem",
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#f57c00",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "12px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#ef6c00")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#f57c00")}
          >
            Login
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "15px",
              color: message.includes("✅") ? "green" : "red",
              fontSize: "0.9rem",
            }}
          >
            {message}
          </p>
        )}

        <p style={{ marginTop: "20px", fontSize: "0.9rem", color: "#555" }}>
          Don’t have an account?{" "}
          <Link
            to="/signup"
            style={{
              color: "#f57c00",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
