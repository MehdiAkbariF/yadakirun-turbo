import React from 'react';
import { ButtonProps } from './Button.types';
import './Button.scss'; // فایل استایل را وارد می‌کنیم

export const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  ...props
}: ButtonProps) => {
  const mode = `button--${variant}`;
  const sizeClass = `button--${size}`;
  
  return (
    <button
      type="button"
      className={['button', mode, sizeClass].join(' ')}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};