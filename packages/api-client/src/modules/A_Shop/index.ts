// مسیر: packages/api-client/src/modules/A_Shop/index.ts

import { AxiosInstance } from 'axios';
import { ShopDTO, GetShopsParams } from './types';


export class ShopService {
  private api: AxiosInstance;

  constructor(apiInstance: AxiosInstance) {
    this.api = apiInstance;
  }

 public async getShops(params?: GetShopsParams): Promise<ShopDTO[]> {
  const response = await this.api.get('/A_Shop/GetShops', { params });

  // اصلاح کلیدی اینجاست:
  return response.data.items || [];
}
}