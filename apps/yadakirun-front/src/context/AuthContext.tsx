"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// ❌ ایمپورت‌های مربوط به توکن و دیکد کردن حذف شدند

interface User {
  id: string;
  name: string;
  phoneNumber?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  // متد login حالا اطلاعات کاربر را می‌گیرد (چون توکنی برای دیکد کردن نداریم)
  login: (userData: User) => void;
  logout: () => void;
}

const USER_DATA_KEY = "userData"; // فقط اطلاعات پروفایل را نگه می‌داریم (نه توکن)

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // در شروع برنامه، چک می‌کنیم آیا دیتای کاربر در لوکال استوریج هست؟
    // نکته: چون توکن در کوکی HttpOnly است، ما به آن دسترسی نداریم.
    // بهترین راه این است که یک ریکوئست به اندپوینت /api/User/Me بزنیم تا وضعیت لاگین چک شود.
    // فعلاً برای حفظ ظاهر لاگین، اطلاعات کاربر (بدون توکن) را از حافظه می‌خوانیم.
    try {
      const storedUser = localStorage.getItem(USER_DATA_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to read user data from localStorage", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (userData: User) => {
    // ذخیره اطلاعات کاربر در استیت و حافظه
    setUser(userData);
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    
    // نکته: کوکی احراز هویت توسط بک‌اند ست شده است و ما کاری با آن نداریم
  };

  const logout = () => {
    // پاک کردن اطلاعات کاربر از فرانت
    localStorage.removeItem(USER_DATA_KEY);
    setUser(null);
    
    // نکته: برای حذف کوکی HttpOnly باید یک درخواست به اندپوینت LogOut بک‌اند ارسال کنید
    // مثلا: authService.logout();
  };

  const value = {
    isAuthenticated: !!user,
    user,
    isLoading,
    login,
    logout,
  };

  if (isLoading) {
    return null; // یا یک کامپوننت لودینگ ساده
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