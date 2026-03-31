import axios from "axios";


const raw = import.meta.env.VITE_API_URL;
const baseURL =
  typeof raw === "string" ? raw.trim().replace(/\/$/, "") : "";

const api = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 45_000,
});

export default api;
