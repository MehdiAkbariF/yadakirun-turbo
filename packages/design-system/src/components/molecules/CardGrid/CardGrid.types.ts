import { CardProps } from "../../atoms/Card/Card.types";

export interface CardGridProps {
  /**
   * آرایه‌ای از آیتم‌های کارت
   */
  items: Omit<CardProps, 'className'>[];
  
  /**
   * تعداد ستون‌ها در حالت دسکتاپ (وقتی اسکرول غیرفعال است)
   * @default 7
   */
  columns?: number;
  
  /**
   * کلاس‌های اضافی
   */
  className?: string;

  /**
   * آیا گرید قابلیت اسکرول افقی داشته باشد؟
   * @default false
   */
  scrollable?: boolean;
}