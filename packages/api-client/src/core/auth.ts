// مسیر: packages/api-client/src/core/auth.ts

import { AxiosInstance } from 'axios';
import { SendSMSDTO, SendSMSResponseDto, VerifyPhoneNumberRequestDto, LoginResponseDto } from '../types/auth';

export class AuthService {
  private api: AxiosInstance;

  constructor(apiInstance: AxiosInstance) {
    this.api = apiInstance;
  }

  public async requestOtp(dto: SendSMSDTO): Promise<SendSMSResponseDto> {
    // هدر 'X-Client-Type' را به درخواست اضافه می‌کنیم
    const response = await this.api.post<SendSMSResponseDto>('/Admin/A_User/Authentication', dto, {
      headers: {
        'X-Client-Type': 'web'
      }
    });
    return response.data;
  }

  public async verifyOtp(dto: VerifyPhoneNumberRequestDto): Promise<LoginResponseDto> {
    // هدر 'X-Client-Type' را به درخواست اضافه می‌کنیم
    const response = await this.api.post<LoginResponseDto>('/Admin/A_User/ConfirmAuthentication', dto, {
      headers: {
        'X-Client-Type': 'web'
      }
    });
    return response.data;
  }
}