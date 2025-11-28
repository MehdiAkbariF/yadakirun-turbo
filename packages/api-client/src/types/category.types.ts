// اینترفیس‌ها بر اساس ریسپانس API شما

// اینترفیس برای هر خودرو در لیست (این تایپ مشترک است و می‌توان آن را در یک فایل عمومی قرار داد)
export interface CarInList {
    id: number;
    modelName: string;
    englishName: string;
    imageUrl: string;
  }
  
  // اینترفیس برای کل داده‌های صفحه دسته‌بندی
  export interface ProductCategoryPageData {
    id: number;
    name: string;
    englishName: string;
    bannerUrl: string | null;
    bannerAlt: string | null;
    description: string | null;
    metaTitle: string;
    metaDescription: string;
    canonicalUrl: string;
    cars: CarInList[];
  }