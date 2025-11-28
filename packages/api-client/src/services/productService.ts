import { ProductPageData } from '../types/product.types';

const BASE_URL = "https://api-yadakirun.yadakchi.com/api";

export const productService = {
  getProductDetails: async (productId: string | number): Promise<ProductPageData | null> => {
    try {
      const response = await fetch(`${BASE_URL}/Front/ProductPage?ProductId=${productId}`, {
        // برای صفحه محصول، کش کوتاه‌مدت یا عدم کش بهتر است تا قیمت و موجودی دقیق باشد
        cache: "no-store", 
      });

      if (!response.ok) {
        console.error("Failed to fetch product details:", response.statusText);
        return null;
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching product details:", error);
      return null;
    }
  },
};