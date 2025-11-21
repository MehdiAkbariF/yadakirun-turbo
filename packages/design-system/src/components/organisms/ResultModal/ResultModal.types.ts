export type ResultType = 'success' | 'error';

export interface ResultModalProps {
  /**
   * آیا مودال باز است؟
   */
  isOpen: boolean;
  
  /**
   * نوع پیام (موفقیت یا خطا)
   * @default 'success'
   */
  type?: ResultType;
  
  /**
   * عنوان اصلی پیام
   */
  title: string;
  
  /**
   * متن توضیحات پیام
   */
  message?: string;
  
  /**
   * تابع بستن مودال (که بعد از اتمام تایمر صدا زده می‌شود)
   */
  onClose: () => void;
  
  /**
   * مدت زمان نمایش به میلی‌ثانیه
   * @default 5000
   */
  duration?: number;
}