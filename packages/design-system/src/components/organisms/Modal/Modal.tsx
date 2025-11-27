"use client";
import React, { useEffect, useState } from 'react';
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

  if (!isVisible) return null;

  return (
    <div 
      className={`modal-overlay ${isAnimateIn ? 'modal-overlay--open' : ''}`} 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-backdrop" />
      
      <div 
        className={`modal-container modal-container--${size} ${isAnimateIn ? 'modal-container--open' : ''}`}
        onClick={(e) => e.stopPropagation()} // جلوگیری از بستن هنگام کلیک روی محتوا
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