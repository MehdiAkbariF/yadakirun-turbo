"use client";
import React from 'react';
import { AlertTriangle, CheckCircle2, Info, XCircle, X } from 'lucide-react';
import { AlertProps, AlertVariant } from './Alert.types';
import './Alert.scss';

export const Alert = ({
  variant = 'error',
  title,
  children,
  icon,
  onClose,
  duration,
  className,
  ...props
}: AlertProps) => {

  // ✅ آیکون‌ها به داخل کامپوننت منتقل شدند
  const icons: Record<AlertVariant, React.ReactNode> = {
    error: <XCircle size={20} />,
    success: <CheckCircle2 size={20} />,
    warning: <AlertTriangle size={20} />,
    info: <Info size={20} />,
  };
  
  const classNames = [
    'ds-alert',
    `ds-alert--${variant}`,
    duration ? 'ds-alert--has-timer' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} role="alert" {...props}>
      <div className="ds-alert__icon">
        {icon || icons[variant]}
      </div>
      
      <div className="ds-alert__content">
        {title && <span className="ds-alert__title">{title}</span>}
        <span className="ds-alert__message">{children}</span>
      </div>

      {onClose && (
        <button 
          className="ds-alert__close" 
          onClick={onClose} 
          type="button"
          aria-label="بستن پیام"
        >
          <X size={18} />
        </button>
      )}

      {duration && onClose && (
        <div className="ds-alert__progress">
          <div 
            className="ds-alert__progress-bar" 
            style={{ animationDuration: `${duration}ms` }}
            onAnimationEnd={onClose}
          />
        </div>
      )}
    </div>
  );
};