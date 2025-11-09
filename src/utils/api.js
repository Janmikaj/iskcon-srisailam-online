// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://iskcon-srisailam-online.onrender.com",
});

export default api;
