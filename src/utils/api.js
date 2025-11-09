import axios from "axios";

const api = axios.create({
  baseURL: "https://iskcon-srisailam-online.onrender.com", // Your backend
});

export default api;
