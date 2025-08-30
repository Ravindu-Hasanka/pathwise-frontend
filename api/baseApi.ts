import axios from "axios";
import { parseCookies, setCookie } from "nookies";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080/api";

// Axios instance
const api = axios.create({
  baseURL: API_BASE,
});

// Attach access token to every request
api.interceptors.request.use((config) => {
  const cookies = parseCookies();
  if (cookies.accessToken) {
    config.headers.Authorization = `Bearer ${cookies.accessToken}`;
  }
  return config;
});

// Auto-refresh on 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const cookies = parseCookies();
        const refreshToken = cookies.refreshToken;

        if (!refreshToken) {
          throw new Error("No refresh token found");
        }

        // Call refresh endpoint
        const res = await axios.post(`${API_BASE}/auth/refresh`, { refreshToken });
        const { accessToken } = res.data;

        // Update cookie
        setCookie(null, "accessToken", accessToken, {
          maxAge: 60 * 60, // 1 hour
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
