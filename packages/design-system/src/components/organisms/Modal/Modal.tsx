"use client";
import React, { useEffect, useState, useRef } from 'react';
import { X } from 'lucide-react';
import { Label } from '../../atoms/Label/Label';
import './Modal.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  /**
   * سایز مودال
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer, 
  size = 'md' 
}: ModalProps) => {
  const [isVisible, setIsVisible] = useState(false); // آیا در DOM رندر شود؟
  const [isAnimateIn, setIsAnimateIn] = useState(false); // آیا کلاس‌های ورود اعمال شود؟
  
  // ررفرنس به کانتینر سفید مودال برای تشخیص محل کلیک
  const containerRef = useRef<HTMLDivElement>(null);
  
  // متغیری برای ذخیره اینکه "آیا کلیک از داخل مودال شروع شده است؟"
  const isMouseDownInside = useRef(false);

  // مدیریت چرخه حیات انیمیشن
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // یک تاخیر کوچک برای اینکه مرورگر رندر اولیه را انجام دهد و انیمیشن CSS اجرا شود
      requestAnimationFrame(() => {
        setIsAnimateIn(true);
      });
      document.body.style.overflow = 'hidden';
    } else {
      setIsAnimateIn(false);
      document.body.style.overflow = 'unset';
      // صبر می‌کنیم تا انیمیشن خروج (300ms) تمام شود
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // بستن با دکمه Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // هندلر فشرده شدن موس
  const handleMouseDown = (e: React.MouseEvent) => {
    // اگر جایی که موس فشرده شد داخل کانتینر مودال بود، فلگ را true کن
    if (containerRef.current && containerRef.current.contains(e.target as Node)) {
      isMouseDownInside.current = true;
    } else {
      isMouseDownInside.current = false;
    }
  };

  // هندلر کلیک روی اورلی (بخش تیره)
  const handleOverlayClick = (e: React.MouseEvent) => {
    // ۱. اگر کلیک نهایی روی خود کانتینر یا بچه‌هایش بود، نادیده بگیر
    if (containerRef.current && containerRef.current.contains(e.target as Node)) {
      return;
    }

    // ۲. اگر شروع کلیک (MouseDown) داخل مودال بوده (مثلاً درگ کردن متن یا نقشه به بیرون)، نادیده بگیر
    // این خط دقیقاً مشکل شما را حل می‌کند
    if (isMouseDownInside.current) {
      return;
    }

    // در غیر این صورت یعنی کاربر واقعاً روی فضای خالی کلیک کرده است
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`modal-overlay ${isAnimateIn ? 'modal-overlay--open' : ''}`} 
      onMouseDown={handleMouseDown} // بررسی لحظه شروع کلیک
      onClick={handleOverlayClick}  // بررسی لحظه پایان کلیک
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-backdrop" />
      
      <div 
        ref={containerRef} // اتصال رفرنس
        className={`modal-container modal-container--${size} ${isAnimateIn ? 'modal-container--open' : ''}`}
        // دیگر نیازی به e.stopPropagation() نیست چون منطق بالا هوشمندتر است
      >
        <div className="modal-header">
          <Label weight="extra-bold" size="sm" className="modal-title">{title}</Label>
          <button onClick={onClose} className="modal-close-btn" aria-label="بستن">
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-content custom-scrollbar">
          {children}
        </div>
        
        {footer && (
          <div className="modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};