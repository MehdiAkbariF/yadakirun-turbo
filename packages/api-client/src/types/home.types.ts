// اینترفیس برای محصولات خلاصه‌شده در اسلایدرها
export interface ProductSummary {
  id: number;
  title: string;
  englishTitle: string;
  imageUrl: string;
  imageAlt: string;
  price: number;
  priceAfterDiscount: number;
  discountPercent: number;
  discountUntil: string | null;
  quantity: number;
}

// اینترفیس برای پست‌های وبلاگ
export interface BlogPostSummary {
  id: number;
  title: string;
  coverUrl: string;
  readingTime: number;
  createDate: string;
  blogCategory: {
    id: number;
    title: string;
    englishTitle: string;
  };
  creator: any | null;
}

// اینترفیس برای بنرها
export interface Banner {
  targetUrl: string;
  image: string;
  imageAlt: string;
  bannerPlace: number;
  bannerPlaceName: string;
}

// اینترفیس کامل ریسپانس API (نسخه اصلاح شده)
export interface HomePageData {
  id: number;
  pageName: string;
  
  // ✅✅✅ فیلدهای سئو که اضافه شدند ✅✅✅
  description: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;

  banners: Banner[];
  discountedProducts: ProductSummary[];
  mostSoldProducts: ProductSummary[];
  mostRecentProducts: ProductSummary[];
  mostRecentBlogPosts: BlogPostSummary[];
}