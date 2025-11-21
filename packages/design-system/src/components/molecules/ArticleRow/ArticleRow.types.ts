import { AnchorHTMLAttributes } from 'react';

export interface ArticleRowProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'title'> {
  /**
   * عنوان مقاله
   */
  title: string;
  
  /**
   * متن خلاصه یا چکیده مقاله
   */
  excerpt: string;
  
  /**
   * آدرس تصویر شاخص
   */
  imgSrc: string;
  
  /**
   * نام دسته‌بندی
   */
  category: string;
  
  /**
   * تاریخ انتشار (مثلاً ۱۴۰۳/۰۸/۲۰)
   */
  date: string;
  
  /**
   * لینک صفحه مقاله
   */
  href: string;
  
  /**
   * زمان مطالعه به دقیقه (اختیاری)
   */
  readTime?: string | number;
}