import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logoiskcon.png";

export default function SignupPage() {
  const [form, setForm] = useState({ email: "", password: "", role: "user" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/signup", form);
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Signup failed");
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
          Create Account
        </h2>

        <p style={{ color: "#666", marginBottom: "25px", fontSize: "0.95rem" }}>
          Join the ISKCON Srisailam community
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
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
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "0.95rem",
            }}
          />

          <select
            name="role"
            onChange={handleChange}
            value={form.role}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "0.95rem",
            }}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

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
            Sign Up
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "15px",
              color: message.includes("failed") ? "red" : "green",
              fontSize: "0.9rem",
            }}
          >
            {message}
          </p>
        )}

        <p style={{ marginTop: "20px", fontSize: "0.9rem", color: "#555" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#f57c00",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
