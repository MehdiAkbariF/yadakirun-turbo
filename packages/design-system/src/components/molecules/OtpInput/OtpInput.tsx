"use client";
import React, { useRef, useEffect } from 'react';
import './OtpInput.scss';

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const OtpInput = ({ length = 5, value, onChange, disabled }: OtpInputProps) => {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const focusInput = (index: number) => {
    const safeIndex = Math.max(0, Math.min(index, length - 1));
    inputs.current[safeIndex]?.focus();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    if (isNaN(Number(val))) return;

    const newOtp = value.split('');
    // هندل کردن Paste یا تایپ
    const chars = val.split('');
    
    if (chars.length > 1) {
        // Paste logic
        const pasteValue = val.slice(0, length);
        onChange(pasteValue);
        focusInput(Math.min(pasteValue.length, length - 1));
    } else {
        // Single char logic
        newOtp[index] = val.slice(-1); // آخرین کاراکتر
        const combined = newOtp.join('').slice(0, length);
        onChange(combined);
        if (val) focusInput(index + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
        e.preventDefault(); // جلوگیری از رفتار پیش‌فرض
        const newOtp = value.split('');
        if (newOtp[index]) {
            newOtp[index] = '';
            onChange(newOtp.join(''));
        } else if (index > 0) {
            newOtp[index - 1] = '';
            onChange(newOtp.join(''));
            focusInput(index - 1);
        }
    } else if (e.key === 'ArrowLeft') {
        focusInput(index - 1);
    } else if (e.key === 'ArrowRight') {
        focusInput(index + 1);
    }
  };

  return (
    <div className="ds-otp-group" dir="ltr">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => { if (el) inputs.current[index] = el; }}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={length} // اجازه به سیستم عامل برای Paste
          value={value[index] || ''}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={(e) => e.target.select()} // انتخاب متن هنگام فوکوس
          disabled={disabled}
          className={`ds-otp-field ${value[index] ? 'ds-otp-field--filled' : ''}`}
        />
      ))}
    </div>
  );
};