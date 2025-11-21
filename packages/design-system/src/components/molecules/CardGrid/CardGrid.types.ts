import { CardProps } from "../../atoms/Card/Card.types";

export interface CardGridProps {
  /**
   * آرایه‌ای از آیتم‌های کارت
   */
  items: Omit<CardProps, 'className'>[];
  /**
   * تعداد ستون‌ها در حالت دسکتاپ
   * @default 7
   */
  columns?: number;
    className?: string; 
}