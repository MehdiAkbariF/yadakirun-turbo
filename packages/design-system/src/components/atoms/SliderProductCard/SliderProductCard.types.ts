// packages/design-system/src/components/atoms/SliderProductCard/SliderProductCard.types.ts
export interface SliderProductCardProps {
  title: string;
  href: string;
  imgSrc: string;
  price?: number;
  originalPrice?: number;
  rating?: number;
  badgeText?: string;
  className?: string;
   onAddToCart?: () => void;
}