import React from 'react';
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
  ...props
}: ButtonProps) => {
  const classNames = [
    'button',
    `button--${variant}`,
    `button--size-${size}`,
    fullWidth ? 'button--full-width' : '',
    isLoading ? 'button--loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={classNames}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <span className="button__spinner" />}
      {!isLoading && leftIcon && <span className="button__icon-left">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="button__icon-right">{rightIcon}</span>}
    </button>
  );
};