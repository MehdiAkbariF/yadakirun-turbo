// --- تایپ‌ها برای مطابقت دقیق با پاسخ API ---

interface ApiProduct {
  productNumber: number;
  title: string;
  imageUrl: string;
}

interface ApiBasketItem {
  originalPrice: number;
  discountValue: number;
  quantity: number;
  finalPrice: number; // قیمت کل این ردیف (unitPrice * quantity)
  product: ApiProduct;
}

export interface BasketResponse {
  totalOriginalPrice: number;
  totalDiscountValue: number;
  totalFinalPrice: number;
  basketItems: ApiBasketItem[];
}

// --- تایپ برای استفاده داخلی در Store و کامپوننت‌ها (ساختار تخت و تمیز) ---

export interface BasketItem {
  productId: number;
  productName: string;
  productImage: string;
  quantity: number;
  unitPrice: number; // قیمت واحد
  totalPrice: number; // قیمت کل
  originalPrice: number; // قیمت اصلی واحد
}

// --- تایپ برای ارسال داده به API ---

export interface UpdateBasketPayload {
  productId: number;
  quantity: number;
  packageId?: number; // این فیلد را برای آینده نگه می‌داریم
}