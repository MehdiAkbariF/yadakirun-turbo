// مسیر: packages/api-client/src/modules/A_Shop/types.ts

import { PaginationParams } from '../../types/common';

// تعریف تایپ برای آبجکت Creator
export interface CreatorDTO {
  id: string;
  userName?: string | null;
  name?: string | null; // <-- این همان name داخل creator است
  lastName?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
}

// تعریف تایپ برای ShopDTO بر اساس ساختار واقعی
export interface ShopDTO {
  id: string;
  registrationStepDoneStatus?: string | null;
  shopCode?: string | null;
  isLegalPerson?: boolean;
  nationalCode?: string | null;
  email?: string | null;
  birthDate?: string | null; // format: date-time
  name?: string | null; // <-- نام صاحب فروشگاه در سطح ShopDTO
  lastname?: string | null;
  phoneNumber?: string | null;
  bankAccounts?: any[]; // بسته به ساختار واقعی، تایپ دقیق‌تر بدهید
  isActive?: boolean;
  educationType?: string | null;
  naturalPersonEconomicCode?: string | null;
  organizationName?: string | null;
  organizationType?: string | null;
  organizationEconomicCode?: string | null;
  organizationNationalCode?: string | null;
  organizationRegisterationCode?: string | null;
  description?: string | null;
  website?: string | null;
  isLocalSale?: boolean;
  isOnlineSale?: boolean;
  cover?: string | null; // URL تصویر
  shopVideo?: any | null; // تایپ دقیق‌تر
  isAdvertised?: boolean;
  useDefaultCurrencyConversionSource?: boolean;
  averageRate?: number;
  rates?: number;
  likes?: number;
  views?: number;
  seoInformationId?: string | null;
  descriptionOfAnswer?: string | null;
  status?: string | null; // تایپ enum واقعی را جایگزین کنید
  needsRecharge?: boolean;
  registrationStatus?: string | null; // تایپ enum واقعی را جایگزین کنید
  sellerLicenseContract?: string | null;
  sellerLicenseContractNumber?: string | null;
  isLicenseContractAcceptedBySeller?: boolean;
  sellerLicenseContractAcceptedDate?: string | null; // format: date-time
  sellerLicenseContractExpireDate?: string | null; // format: date-time
  hasShopCarsAndParts?: boolean | null;
  logo?: string | null; // URL لوگو
  shopTitle?: string | null; // <-- عنوان فروشگاه
  tell?: string | null;
  businessLicense?: string | null; // URL سند
  nationalCard?: string | null; // URL سند
  behindNationalCard?: string | null; // URL سند
  isLogoConfirmed?: boolean | null;
  isShopTitleConfirmed?: boolean | null;
  isTellConfirmed?: boolean | null;
  isBusinessLicenseConfirmed?: boolean | null;
  isNationalCardConfirmed?: boolean | null;
  isBehindNationalCardConfirmed?: boolean | null;
  logoInputValidationGuidelineId?: string | null;
  shopTitleInputValidationGuidelineId?: string | null;
  businessLicenseInputValidationGuidelineId?: string | null;
  nationalCardInputValidationGuidelineId?: string | null;
  behindNationalCardInputValidationGuidelineId?: string | null;
  logoInputValidationGuideline?: any | null; // تایپ دقیق‌تر
  shopTitleInputValidationGuideline?: any | null;
  businessLicenseInputValidationGuideline?: any | null;
  nationalCardInputValidationGuideline?: any | null;
  behindNationalCardInputValidationGuideline?: any | null;
  sellerPerformanceReport?: any | null;
  seoInformation?: any | null;
  shopLocations?: any[];
  shopProducts?: any[];
  shopViews?: any[];
  shopRatings?: any[];
  shopComments?: any[];
  badges?: any[];
  shopCurrencies?: any[];
  shopAdvertisementes?: any | null;
  cars?: any[];
  parts?: any[];
  sellerCategories?: any[];
  ip?: string | null;
  creatorId?: string | null;
  updaterId?: string | null;
  createDate?: string; // format: date-time
  isDeleted?: boolean;
  updateDate?: string | null; // format: date-time
  removeDate?: string | null; // format: date-time
  creator?: CreatorDTO | null; // <-- آبجکت Creator
  updater?: any | null; // تایپ دقیق‌تر
}

export interface GetShopsParams extends PaginationParams {
  // ...
}