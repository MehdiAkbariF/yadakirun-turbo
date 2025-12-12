export interface Location {
  lat: number;
  lng: number;
}

export interface MapSelectorProps {
  /**
   * موقعیت پیش‌فرض یا انتخاب شده
   */
  defaultLocation?: Location;
  
  /**
   * کالبک تغییر موقعیت
   */
  onLocationChange?: (location: Location) => void;
  
  /**
   * ارتفاع کانتینر نقشه
   * @default '300px'
   */
  height?: string;
  
  /**
   * سطح زوم اولیه
   * @default 13
   */
  zoom?: number;
  
  /**
   * کلاس‌های اضافی CSS
   */
  className?: string;
  
  /**
   * حالت فقط خواندنی (غیرقابل درگ و کلیک)
   * @default false
   */
  readOnly?: boolean;

  /**
   * نمایش نقشه به صورت دارک مود (اختیاری - اگر تم گلوبال نباشد)
   * @default false
   */
  isDarkMode?: boolean;

  /**
   * نمایش دکمه مسیریابی (فقط در موبایل نمایش داده می‌شود)
   * با کلیک روی این دکمه، اپلیکیشن مسیریاب گوشی باز می‌شود.
   * @default false
   */
  showNavigationButton?: boolean;
}