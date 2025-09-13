// مسیر: packages/api-client/src/index.ts

import setupAxios, { ApiConfig } from './core/api'; // setupAxios را به صورت default import می‌کنیم
import { AxiosInstance } from 'axios';

// ایمپورت سرویس‌های مختلف
import { AuthService } from './core/auth';
import { ShopService } from './modules/A_Shop';

export class ApiClient {
  public auth: AuthService;
  public shop: ShopService;
  // ... سایر سرویس‌ها (بعداً اضافه می‌کنیم)

  private constructor(axiosInstance: AxiosInstance) {
    this.auth = new AuthService(axiosInstance);
    this.shop = new ShopService(axiosInstance);
    // ... نمونه‌سازی سایر سرویس‌ها
  }

  public static create(config: ApiConfig): ApiClient {
    const axiosInstance = setupAxios(config);
    return new ApiClient(axiosInstance);
  }
}

// Export کردن تایپ‌ها برای استفاده آسان
export * from './types/auth';
export * from './types/common';
export * from './modules/A_Shop/types';