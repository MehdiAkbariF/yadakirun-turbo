import { AnchorHTMLAttributes } from 'react';

export interface AdBannerProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'title'> {
  /**
   * لینک مقصد بنر
   * @default '#'
   */
  href?: string;

  /**
   * آدرس تصویر (اگر خالی باشد، حالت Placeholder نمایش داده می‌شود)
   */
  src?: string;

  /**
   * متن جایگزین تصویر
   * @default 'تبلیغات'
   */
  alt?: string;

  /**
   * عنوان اصلی (در حالت بدون عکس)
   * @default 'محل تبلیغات شما'
   */
  title?: string;

  /**
   * زیرعنوان (در حالت بدون عکس)
   * @default 'برای رزرو تماس بگیرید'
   */
  subTitle?: string;
}