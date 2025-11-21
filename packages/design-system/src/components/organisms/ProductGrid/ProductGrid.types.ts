import { SimpleProductCardProps } from '../../atoms/SimpleProductCard/SimpleProductCard.types';

export interface ProductGridProps {
  /**
   * لیست محصولات برای نمایش
   */
  products: Omit<SimpleProductCardProps, 'className'>[];
  
  /**
   * تعداد آیتم در هر صفحه
   * @default 20
   */
  pageSize?: number;
}