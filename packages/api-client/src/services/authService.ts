import { LoginRequest, VerifyRequest, AuthApiResponse, VerifyApiResponse } from '../types/auth.types';


const isClient = typeof window !== 'undefined';

const BASE_URL = isClient 
  ? '/api-proxy' 
  : 'https://api-yadakirun.yadakchi.com/api';

async function authFetch<T>(endpoint: string, body: any): Promise<T> {
  try {
  
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Auth API Error (${endpoint}):`, errorText);
      throw new Error(`Authentication failed: ${response.status}`);
    }

    return await response.json() as T;
  } catch (error) {
    console.error(`Network Error at ${endpoint}:`, error);
    throw error;
  }
}

export const authService = {
  login: (phoneNumber: string): Promise<AuthApiResponse | null> => {
    return authFetch<AuthApiResponse>('/Authentication/Authentication', { 
      phoneNumber 
    } as LoginRequest);
  },

  verify: (phoneNumber: string, code: string): Promise<VerifyApiResponse | null> => {
    return authFetch<VerifyApiResponse>('/Authentication/ConfirmAuthentication', { 
      phoneNumber, 
      code 
    } as VerifyRequest);
  }
};