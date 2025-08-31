import axios from "axios";
import { parseCookies, setCookie, destroyCookie } from "nookies";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const cookies = parseCookies();
  const token = cookies.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log("Response error:", error.response);
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const cookies = parseCookies();
        const refreshToken = cookies.refreshToken;
        if (!refreshToken) throw new Error("No refresh token");

        // Use api.post to avoid interceptor loops, but ensure no Authorization header is set for refresh call
        const refreshResponse = await axios.post(`${API_BASE}/auth/refresh`, 
          { refreshToken }, // Send refresh token in body
          { headers: { Authorization: undefined } } // Ensure no Authorization header is sent
        );

        const { accessToken, newRefreshToken } = refreshResponse.data;

        // Update access token cookie
        setCookie(null, "accessToken", accessToken, {
          maxAge: 60 * 60,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        // Update refresh token if a new one is provided (token rotation)
        if (newRefreshToken) {
          setCookie(null, "refreshToken", newRefreshToken, {
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          });
        }

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Clear tokens if refresh fails
        destroyCookie(null, "accessToken");
        destroyCookie(null, "refreshToken");
        window.location.href = "/login"; // Redirect to login
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;