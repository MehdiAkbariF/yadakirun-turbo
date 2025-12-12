export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  title: string;
  iconUrl: string | null;
  faQs: FAQItem[];
}

export interface FAQPageData {
  id: number;
  pageName: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  faqCategories: FAQCategory[];
  // فیلد banners را هم اضافه می‌کنیم، شاید در آینده استفاده شود
  banners: any[]; 
}