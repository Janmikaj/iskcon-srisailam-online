// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL !== undefined 
    ? process.env.REACT_APP_API_BASE_URL 
    : "http://localhost:5001", // Fallback for local dev
});


export default api;

