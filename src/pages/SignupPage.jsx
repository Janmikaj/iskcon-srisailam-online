import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [form, setForm] = useState({ username: "", password: "", role: "user" });
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
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-64">
        <input type="text" name="username" placeholder="Username" onChange={handleChange} className="border p-2 rounded" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-2 rounded" />
        <select name="role" onChange={handleChange} className="border p-2 rounded">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Signup</button>
      </form>
      <p className="mt-3 text-sm text-gray-600">{message}</p>
    </div>
  );
}
