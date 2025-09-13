// مسیر: packages/api-client/src/types/auth.ts

export interface SendSMSDTO {
  phoneNumber: string;
}

export interface SendSMSResponseDto {
  pattern?: string;
  receptor?: string;
  code?: string;
}

export interface VerifyPhoneNumberRequestDto {
  phoneNumber: string;
  code: string;
}

export interface LoginResponseDto {
  message?: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  // ...
}