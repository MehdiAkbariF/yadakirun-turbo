/**
 * تبدیل اعداد انگلیسی به فارسی (بدون تغییر در سایر کاراکترها)
 */
export const toPersianDigits = (value: string | number | undefined | null): string => {
  if (value === undefined || value === null) return '';
  
  const str = String(value);
  return str.replace(/[0-9]/g, (char) => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return persianDigits[parseInt(char)];
  });
};

/**
 * فرمت قیمت: جدا کردن سه رقم + تبدیل به فارسی
 * مثال: 1250000 -> ۱,۲۵۰,۰۰۰
 */
export const formatPrice = (value: string | number | undefined | null): string => {
  if (value === undefined || value === null) return '۰';

  // ۱. تبدیل به رشته و حذف هر چیزی غیر از عدد (مثل کاماهای قبلی)
  const numStr = String(value).replace(/[^0-9.]/g, '');
  
  if (!numStr) return '';

  // ۲. جدا کردن سه رقم (انگلیسی)
  const withCommas = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
  // ۳. تبدیل به فارسی
  return toPersianDigits(withCommas);
};