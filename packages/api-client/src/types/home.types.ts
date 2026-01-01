// مسیر: packages/api-client/src/types/home.types.ts

export interface HomePageLink {
  id: number;
  title: string;
  imageUrl: string;
  url: string; // فرض بر این است که API فیلدی برای لینک دارد (مثلاً url یا link)
}

export interface DiscountedProduct {
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

export interface ProductItem {
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

export interface BlogPost {
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

export interface HomePageData {
  id: number;
  pageName: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  // ✅ فیلد جدید اضافه شد
  homePageLinks: HomePageLink[];
  discountedProducts: DiscountedProduct[];
  mostSoldProducts: ProductItem[];
  mostRecentProducts: ProductItem[];
  mostRecentBlogPosts: BlogPost[];
}