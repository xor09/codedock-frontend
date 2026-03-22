import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,      // all requests automatically start with /api
  timeout: 10000,       // optional timeout
});

// Optional: Add global interceptors
api.interceptors.response.use(
  (res) => res,
  (err) => {
    return Promise.reject(err?.response?.data || err);
  }
);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})
