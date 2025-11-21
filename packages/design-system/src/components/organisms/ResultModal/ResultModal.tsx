"use client";
import React, { useEffect, useState } from 'react';
import { Check, X, XCircle } from 'lucide-react';
import { Label } from '../../atoms/Label/Label';
import { ResultModalProps } from './ResultModal.types';
import './ResultModal.scss';

export const ResultModal = ({
  isOpen,
  type = 'success',
  title,
  message,
  onClose,
  duration = 5000,
}: ResultModalProps) => {
  const [show, setShow] = useState(false);

  // مدیریت نمایش و تایمر
  useEffect(() => {
    if (isOpen) {
      setShow(true);
      
      // تایمر جاوااسکریپتی برای بستن مودال (به عنوان پشتیبان انیمیشن CSS)
      // نکته: چون CSS Animation روی هاور متوقف می‌شود، این تایمر فقط یک محدودیت نهایی است
      // اما روش اصلی بسته شدن، ایونت onAnimationEnd روی نوار است.
    } else {
      setShow(false);
    }
  }, [isOpen]);

  if (!show) return null;

  const Icon = type === 'success' ? Check : XCircle;

  return (
    <div className="result-modal-overlay" onClick={onClose}>
      <div 
        className={`result-modal result-modal--${type}`} 
        onClick={(e) => e.stopPropagation()} // جلوگیری از بسته شدن با کلیک روی خود مودال
      >
        {/* دکمه بستن دستی */}
        <button className="result-modal__close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {/* آیکون بزرگ */}
        <div className="result-modal__icon-wrapper">
          <div className="result-modal__icon-bg">
            <Icon size={40} strokeWidth={3} />
          </div>
        </div>

        {/* محتوا */}
        <div className="result-modal__content">
          <Label size="xl" weight="extra-bold" className="result-modal__title">
            {title}
          </Label>
          {message && (
            <Label size="sm" color="secondary" className="leading-relaxed">
              {message}
            </Label>
          )}
        </div>

        {/* نوار تایمر */}
        <div className="result-modal__progress">
          <div 
            className="result-modal__progress-bar"
            style={{ animationDuration: `${duration}ms` }}
            onAnimationEnd={onClose} // ✅ وقتی نوار تمام شد، مودال بسته شود
          />
        </div>
      </div>
    </div>
  );
};