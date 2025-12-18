"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { setAuthToken } from '@monorepo/api-client/src/utils/authToken';

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

const STATIC_TOKEN = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIxNDdhZGM4NS00NmEzLTRiNzEtYWEzZi01MWExMjliZmY4NTgiLCJuYmYiOjE3NjQyNDM3NTksImV4cCI6MTc3NDI0MzY1OSwiaXNzIjoiWWFkYWtjaGkiLCJhdWQiOiJmcm9udC5sb3R0ZXN0LmlyIn0.5rS-qOsJjOUfURTzoymhuSwbi9tKQ1kSJ_U4IgcbxqExr75ec9Z5b7i9Hk7aL8geAR1Y0WbePb5vQNMlbSCfuQ";
const AUTH_TOKEN_KEY = 'authToken'; // یک کلید ثابت برای localStorage

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // در ابتدا لودینگ است تا وضعیت از localStorage خوانده شود

  // ✅ 3. چک کردن localStorage در اولین بارگذاری
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);

      if (storedToken) {
        // اگر توکنی پیدا شد، وضعیت لاگین را بازیابی کن
        setToken(storedToken);
        setUser({ id: '147ad...', name: 'کاربر بازگشتی' }); // کاربر شبیه‌سازی شده
        setAuthToken(storedToken); // توکن را برای api-client هم تنظیم کن
      }
    } catch (error) {
      console.error("Failed to read auth token from localStorage", error);
    } finally {
      // چه توکن پیدا شد چه نشد، لودینگ اولیه تمام شده است
      setIsLoading(false);
    }
  }, []);

  const login = () => {
    // ✅ 1. ذخیره توکن در localStorage
    localStorage.setItem(AUTH_TOKEN_KEY, STATIC_TOKEN);
    
    setToken(STATIC_TOKEN);
    setUser({ id: '147ad...', name: 'کاربر تست' });
    setAuthToken(STATIC_TOKEN);
  };

  const logout = () => {
    // ✅ 2. حذف توکن از localStorage
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

  // تا زمانی که در حال چک کردن localStorage هستیم، چیزی رندر نمی‌کنیم تا از پرش UI جلوگیری شود
  if (isLoading) {
    return null; // یا یک کامپوننت لودینگ تمام صفحه
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};