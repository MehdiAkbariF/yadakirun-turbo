"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { userService } from "@monorepo/api-client/src/services/userService";

// ✅ تایپ نقش کاربر
interface UserRole {
  id: string;
  name: string;
}

// ✅ آپدیت اینترفیس User
interface User {
  id: string;
  name: string;
  phoneNumber?: string;
  roles?: UserRole[]; // اضافه شد
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

const USER_DATA_KEY = "userData";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        // 1. اول سعی می‌کنیم از لوکال استوریج بخونیم (برای سرعت)
        const storedUser = localStorage.getItem(USER_DATA_KEY);
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        // 2. سپس از API وضعیت واقعی را می‌گیریم (چون نقش ممکن است تغییر کرده باشد)
        // این کار در پس‌زمینه انجام می‌شود تا UI بلاک نشود
        const remoteUser = await userService.getCurrentUser();
        if (remoteUser) {
           const userData: User = {
             id: remoteUser.id,
             name: remoteUser.name || "کاربر",
             phoneNumber: remoteUser.phoneNumber,
             roles: remoteUser.roles // نقش‌ها را ذخیره می‌کنیم
           };
           setUser(userData);
           localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
        }
      } catch (error) {
        console.error("Failed to check auth status", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserStatus();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  };

  const logout = () => {
    localStorage.removeItem(USER_DATA_KEY);
    setUser(null);
    // اینجا می‌توانید متد logout سرویس را هم صدا بزنید تا کوکی پاک شود
  };

  const value = {
    isAuthenticated: !!user,
    user,
    isLoading,
    login,
    logout,
  };

  if (isLoading) {
    // بهتر است در زمان لودینگ اولیه چیزی رندر نکنیم یا اسکلتون نشان دهیم
    // اما برای جلوگیری از پرش، فعلا null برمی‌گردانیم
    return null; 
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