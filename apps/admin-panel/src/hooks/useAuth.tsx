// مسیر: apps/admin-panel/src/hooks/useAuth.ts
"use client";

import { createContext, useContext, useState, useEffect, useMemo, ReactNode, useCallback } from 'react';
import { ApiClient } from '@monorepo/api-client';
import { SendSMSDTO, VerifyPhoneNumberRequestDto, LoginResponseDto, SendSMSResponseDto, UserProfile } from '@monorepo/api-client';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  login: (phoneNumber: string) => Promise<{ success: boolean; message?: string; pattern?: string; code?: string }>;
  verifyCode: (phoneNumber: string, code: string) => Promise<{ success: boolean; message?: string; accessToken?: string; refreshToken?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [apiClient, setApiClient] = useState<ApiClient | null>(null);

  const clearTokens = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  useEffect(() => {
    const client = ApiClient.create({
       baseURL: '/api/proxy', // <-- اینجا به API Proxy خودمان اشاره می‌کنیم
      onUnauthorized: () => {
        console.log("Unauthorized: Redirecting to login...");
        clearTokens();
        router.push('/login');
      },
    });
    setApiClient(client);

    const checkAuth = async () => {
      setLoading(true);
      try {
        // در این سناریو، ما دیگر Access Token را از localStorage نمی‌خوانیم.
        // باید با یک API Call (مثلاً /auth/me) وضعیت احراز هویت را از بک‌اند بپرسیم.
        // اگر بک‌اند endpointی مانند /auth/me دارد، از آن استفاده کنید.
        // const userInfo = await client.auth.getProfile();
        // setUser(userInfo);
        // setIsAuthenticated(true);
        
        // موقتاً فرض می‌کنیم اگر در صفحه لاگین نیستیم، لاگین هستیم.
        if (window.location.pathname !== '/login') {
            setIsAuthenticated(true);
            setUser({ id: 'dummy', name: 'Authenticated User' });
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        clearTokens();
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [clearTokens, router]);

  const login = async (phoneNumber: string) => {
    if (!apiClient) return { success: false, message: "API Client not initialized." };
    try {
      setError(null);
      const response = await apiClient.auth.requestOtp({ phoneNumber });
      console.log("Verification Code:", response.code);
      return { success: true, message: "Verification code sent.", pattern: response.pattern, code: response.code };
    } catch (err: any) {
      setError(err.message || "Login failed.");
      return { success: false, message: err.message || "Login failed." };
    }
  };

  const verifyCode = async (phoneNumber: string, code: string) => {
    if (!apiClient) return { success: false, message: "API Client not initialized." };
    try {
      setError(null);
      const response = await apiClient.auth.verifyOtp({ phoneNumber, code });
      setIsAuthenticated(true);
      setUser({ id: 'dummy', name: 'Logged In User' });
      router.push('/dashboard');
      return { success: true, accessToken: response.accessToken, refreshToken: response.refreshToken };
    } catch (err: any) {
      setError(err.message || "Verification failed.");
      return { success: false, message: err.message || "Verification failed." };
    }
  };

  const logout = async () => {
    // در اینجا، باید یک API Call به بک‌اند انجام دهید تا کوکی‌ها را پاک کند
    // await apiClient.auth.logout();
    clearTokens();
    router.push('/login');
  };

  const memoizedValue = useMemo(
    () => ({ isAuthenticated, user, loading, error, login, verifyCode, logout }),
    [isAuthenticated, user, loading, error, login, verifyCode, logout]
  );

  return (
    <AuthContext.Provider value={memoizedValue}> 
      {children}
    </AuthContext.Provider>
  );
};



export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};