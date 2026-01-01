export interface LoginRequest {
  phoneNumber: string;
}

export interface VerifyRequest {
  phoneNumber: string;
  code: string;
}


export interface AuthApiResponse {
  value: string; 
  statusCode: number;
  formatters: any[];
  contentTypes: any[];
  declaredType: any;
}



export interface VerifyApiResponse {
  token: string;
  refreshToken?: string;
  user?: {
    id: number;
    name: string;
    phoneNumber: string;
  };
  
  value?: string;
  statusCode?: number;
}