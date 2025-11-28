// اینترفیس‌ها بر اساس ریسپانس کامل API شما

export interface ProductCategory {
    id: number;
    name: string;
    englishName: string;
  }
  
  export interface ProductColor {
    name: string;
    hexCode: string;
  }
  
  export interface ProductCar {
    id: number;
    modelName: string;
    englishName: string;
    imageUrl: string;
  }
  
  export interface ProductBrand {
    id: number;
    description: string;
    logoUrl: string | null;
  }
  
  export interface ProductWarranty {
    id: number;
    title: string;
  }
  
  export interface ProductDetail {
    name: string;
    logoUrl: string | null;
    value: string;
    priority: number;
    isMain: boolean;
  }
  
  export interface ProductDetailGroup {
    name: string;
    logoUrl: string | null;
    priority: number;
    productDetail: ProductDetail[];
  }
  
  export interface ProductGalleryImage {
    imageUrl: string;
    imageAlt: string | null;
    // ... سایر فیلدهای احتمالی
  }
  
  export interface ProductPackage {
    id: number;
    name: string;
    // ... سایر فیلدهای احتمالی
  }
  
  export interface ProductComment {
      id: number;
      author: string;
      date: string; // یا Date
      rating: number;
      content: string;
      likes: number;
      dislikes: number;
      isBuyer: boolean;
      // ...
  }
  
  export interface ProductPageData {
    id: number;
    title: string;
    englishTitle: string;
    description: string | null;
    partNumber: string;
    imageUrl: string;
    imageAlt: string | null;
    price: number;
    priceAfterDiscount: number;
    discountUntil: string | null;
    quantity: number;
    isWholeSaleAvailable: boolean;
    views: number;
    metaTitle: string;
    metaDescription: string;
    canonicalUrl: string;
    productCategory: ProductCategory;
    color: ProductColor | null;
    car: ProductCar;
    brand: ProductBrand;
    warranty: ProductWarranty;
    mainProductDetails: ProductDetail[];
    allProductDetails: ProductDetailGroup[];
    tags: any[];
    comments: ProductComment[];
    productPackages: ProductPackage[];
    gallery: ProductGalleryImage[];
    colorVariants: any | null; // در آینده ممکن است آرایه‌ای از رنگ‌ها باشد
  }