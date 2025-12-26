"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { setAuthToken } from "@monorepo/api-client/src/utils/authToken";
import { jwtDecode } from "jwt-decode"; // ← درست: named import

interface JwtClaims {
  UserId: string;
  name?: string;
  // بقیه فیلدها اگر لازم بود
}

interface User {
  id: string;
  name: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

const STATIC_TOKEN =
  "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIxNDdhZGM4NS00NmEzLTRiNzEtYWEzZi01MWExMjliZmY4NTgiLCJuYmYiOjE3NjY2NzA3MjYsImV4cCI6MTc3NjY3MDYyNiwiaXNzIjoiWWFkYWtjaGkiLCJhdWQiOiJmcm9udC5sb3R0ZXN0LmlyIn0.Ee9Lv9BwkAKsFxdOuapdvqE2VETKsVMNWw_nDXVHoC1-PGxAGAQcFGhPoBuTAgx0j4UVmfj0lOpnqT4R017IfQ";

const AUTH_TOKEN_KEY = "authToken";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // تابع استخراج userId کامل از توکن
  const decodeToken = (jwtToken: string): User | null => {
    try {
      const decoded: JwtClaims = jwtDecode<JwtClaims>(jwtToken); // ← با generic برای تایپ‌سیفتی
      return {
        id: decoded.UserId, // کامل: "147adc85-46a3-4b71-aa3f-51a129bff858"
        name: decoded.name || "کاربر",
      };
    } catch (error) {
      console.error("Failed to decode JWT token", error);
      return null;
    }
  };

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
      if (storedToken) {
        const decodedUser = decodeToken(storedToken);
        if (decodedUser) {
          setUser(decodedUser);
          setToken(storedToken);
          setAuthToken(storedToken);
        }
      }
    } catch (error) {
      console.error("Failed to read auth token from localStorage", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = () => {
    localStorage.setItem(AUTH_TOKEN_KEY, STATIC_TOKEN);

    const decodedUser = decodeToken(STATIC_TOKEN);
    if (decodedUser) {
      setUser(decodedUser);
    }
    setToken(STATIC_TOKEN);
    setAuthToken(STATIC_TOKEN);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setToken(null);
    setUser(null);
    setAuthToken(null);
  };

  const value = {
    isAuthenticated: !!token,
    user,
    token,
    isLoading,
    login,
    logout,
  };

  if (isLoading) {
    return null; // یا لودینگ
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
