export interface Banner {
  targetUrl: string;
  image: string;
  imageAlt: string;
  bannerPlace: number;
  bannerPlaceName: string;
}

export interface ContactUsPageData {
  id: number;
  pageName: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  banners: Banner[];
}