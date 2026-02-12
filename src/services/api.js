import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // backend URL with /api
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  // Don't add auth header for register and login endpoints
  if (token && !config.url.includes('/register/') && !config.url.includes('/login/')) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default api;
