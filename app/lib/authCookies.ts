// utils/authCookies.ts
import { setCookie, destroyCookie, parseCookies } from "nookies";
import { jwtDecode } from "jwt-decode";

export const setAuthCookies = (accessToken: string, refreshToken: string) => {
  setCookie(null, "accessToken", accessToken, {
    maxAge: 60 * 60 * 2, // 1 hour
    path: "/", // available everywhere
    secure: process.env.NODE_ENV === "production", 
    sameSite: "strict",
  });

  setCookie(null, "refreshToken", refreshToken, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};

export const clearAuthCookies = () => {
  destroyCookie(null, "accessToken");
  destroyCookie(null, "refreshToken");
};

export const getAuthCookies = () => {
  return parseCookies();
};

interface DecodedToken {
  sub: string;   // subject (user email)
  role: string;  // custom claim
  name: string;  // custom claim
  exp: number;   // expiration
  iat: number;   // issued at
  userId: number; // custom claim
  email: string; // custom claim
}

export function getUserFromToken(token: string): DecodedToken | null {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}

export function getUserIdFromToken(): number | null {
    const cookies = parseCookies();
    const token = cookies.accessToken;
    if (!token) return null;
    const decoded = getUserFromToken(token);
    if (!decoded) return null;
    console.log("Decoded token:", decoded);
    if (decoded.userId) return decoded.userId;
    return null;
}

export function getUserRoleFromToken(): string | null {
    const cookies = parseCookies();
    const token = cookies.accessToken;
    if (!token) return null;
    const decoded = getUserFromToken(token);
    if (!decoded) return null;
    return decoded.role;
}

export function getUserNameFromToken(): string | null {
    const cookies = parseCookies();
    const token = cookies.accessToken;
    if (!token) return null;
    const decoded = getUserFromToken(token);
    if (!decoded) return null;
    return decoded.name;
}

export function getEmailFromToken(): string | null {
    const cookies = parseCookies();
    const token = cookies.accessToken;
    if (!token) return null;
    const decoded = getUserFromToken(token);
    if (!decoded) return null;
    return decoded.email;
}
