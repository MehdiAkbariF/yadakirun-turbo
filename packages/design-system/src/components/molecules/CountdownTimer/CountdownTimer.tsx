import React from 'react';
import { Label } from '../../atoms/Label/Label';
import { toPersianDigits } from '../../../utils/persian'; // ایمپورت تابع فارسی‌ساز
import './CountdownTimer.scss';

interface TimeValue {
  value: number;
  label: string;
}

export const CountdownTimer = ({ days, hours, minutes, seconds }: { days: number, hours: number, minutes: number, seconds: number }) => {
  const times: TimeValue[] = [
    { value: days, label: 'روز' },
    { value: hours, label: 'ساعت' },
    { value: minutes, label: 'دقیقه' },
    { value: seconds, label: 'ثانیه' },
  ];
  
  // فرمت: دو رقمی کردن و سپس تبدیل به فارسی
  const format = (val: number) => toPersianDigits(String(val).padStart(2, '0'));

  return (
    <div className="countdown-timer" dir="ltr">
      {times.map((time, index) => (
        <React.Fragment key={time.label}>
          <div className="countdown-timer__block">
            <span className="countdown-timer__value">{format(time.value)}</span>
            <span className="countdown-timer__label">{time.label}</span>
          </div>
          
          {/* جداکننده (:) بین بلوک‌ها به جز آخری */}
          {index < times.length - 1 && (
             <span className="countdown-timer__separator">:</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};