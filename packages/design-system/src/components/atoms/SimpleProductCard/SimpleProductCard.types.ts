export interface SimpleProductCardProps {
  id: string | number;
  title: string;
  imgSrc: string;
  price: number | string;
  originalPrice?: number | string;
  rating?: number;
  brand?: string;
  seller?: string;
  inStock?: boolean;
  href: string;
  className?: string;
  onAddToCart?: () => void;
}