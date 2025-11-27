export type RatingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type RatingVariant = 'warning' | 'primary' | 'success' | 'neutral';

export interface RatingStarsProps {
  /**
   * امتیاز فعلی (مثلاً 4.5)
   * @default 0
   */
  rating?: number;

  /**
   * تعداد کل ستاره‌ها
   * @default 5
   */
  totalStars?: number;

  /**
   * اندازه ستاره‌ها
   * @default 'sm'
   */
  size?: RatingSize;

  /**
   * تم رنگی ستاره‌ها
   * @default 'warning'
   */
  variant?: RatingVariant;

  /**
   * کلاس اضافی
   */
  className?: string;
}