// utils/authCookies.ts
import { setCookie, destroyCookie, parseCookies } from "nookies";
import { jwtDecode } from "jwt-decode";

export const setAuthCookies = (accessToken: string, refreshToken: string) => {
  setCookie(null, "accessToken", accessToken, {
    maxAge: 60 * 60, // 1 hour
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
