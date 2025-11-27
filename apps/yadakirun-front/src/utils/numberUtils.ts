/**
 * تبدیل اعداد انگلیسی به فارسی
 */
export const toPersianDigits = (value: string | number): string => {
  const str = String(value);
  return str.replace(/[0-9]/g, (char) => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return persianDigits[parseInt(char)];
  });
};

/**
 * فرمت کردن قیمت (سه رقم سه رقم + تبدیل به فارسی)
 */
export const formatPrice = (value: string | number | undefined | null): string => {
  if (value === undefined || value === null) return '۰';
  
  // تبدیل به رشته و حذف کاماهای احتمالی قبلی
  const cleanValue = String(value).replace(/,/g, '');
  
  // جدا کردن سه رقم سه رقم (انگلیسی)
  const withCommas = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
  // تبدیل به فارسی
  return toPersianDigits(withCommas);
};