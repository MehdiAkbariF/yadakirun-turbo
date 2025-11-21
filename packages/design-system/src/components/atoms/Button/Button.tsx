import React from 'react';
import { Loader2 } from 'lucide-react';
import { ButtonProps } from './Button.types';
import './Button.scss';

export const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  type = 'button',
  ...props
}: ButtonProps) => {
  const classNames = [
    'ds-button',
    `ds-button--${variant}`,
    `ds-button--${size}`,
    fullWidth ? 'ds-button--full' : '',
    isLoading ? 'ds-button--loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classNames}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* لودر همیشه در DOM هست اما با CSS مدیریت می‌شود */}
      <span className="ds-button__loader">
        <Loader2 className="ds-button__spinner-icon" size={size === 'sm' ? 16 : 20} />
      </span>
      
      <span className="ds-button__content">
        {leftIcon && <span className="ds-button__icon-left">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ds-button__icon-right">{rightIcon}</span>}
      </span>
    </button>
  );
};