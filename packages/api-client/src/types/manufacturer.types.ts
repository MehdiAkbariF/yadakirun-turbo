// اینترفیس‌ها بر اساس ریسپانس API شما

// اینترفیس برای هر خودرو در لیست
export interface CarInList {
    id: number;
    modelName: string;
    englishName: string;
    imageUrl: string;
  }
  
  // اینترفیس برای کل داده‌های صفحه
  export interface ManufacturerPageData {
    id: number;
    name: string;
    englishName: string;
    desctiption: string | null;
    logoUrl: string | null;
    logoAlt: string | null;
    metaTitle: string;
    metaDescription: string;
    canonicalUrl: string;
    cars: CarInList[];
  }