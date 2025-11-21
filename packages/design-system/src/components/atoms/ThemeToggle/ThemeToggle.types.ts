export interface ThemeToggleProps {
  /**
   * مشخص می‌کند که آیا تم در حالت تاریک است یا خیر
   */
  isDarkMode: boolean;
  /**
   * تابعی که هنگام کلیک روی دکمه فراخوانی می‌شود
   */
  onToggle: () => void;
  /**
   * نوع ظاهری تاگل
   * 'slider': دکمه با اسلایدر (پیش‌فرض)
   * 'icon': فقط آیکون
   * @default 'slider'
   */
  variant?: 'slider' | 'icon'; // ✅✅✅ این خط اضافه شد
  /**
   * کلاس‌های CSS اضافی
   */
  className?: string;
}