"use client"; // ✅✅✅ این خط حیاتی است و باید اضافه شود

import React from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { ButtonProps } from './Button.types';
import './Button.scss';

export const Button = (props: ButtonProps) => {
  const {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    isLoading = false,
    leftIcon,
    rightIcon,
    children,
    className,
    ...rest
  } = props;

  const isDisabled = (rest as any).disabled || isLoading;

  const classNames = [
    'ds-button',
    `ds-button--${variant}`,
    `ds-button--${size}`,
    fullWidth ? 'ds-button--full' : '',
    isLoading ? 'ds-button--loading' : '',
    isDisabled ? 'ds-button--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <span className="ds-button__loader">
        <Loader2 className="ds-button__spinner-icon" size={size === 'sm' ? 16 : 20} />
      </span>
      
      <span className="ds-button__content">
        {leftIcon && <span className="ds-button__icon-left">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ds-button__icon-right">{rightIcon}</span>}
      </span>
    </>
  );

  // --- رندر به عنوان لینک ---
  if (props.href) {
    const { href, target, ...linkProps } = rest as any;
    const finalHref = isDisabled ? '#' : href;

    return (
      <Link
        href={finalHref}
        className={classNames}
        aria-disabled={isDisabled}
        target={target}
        // ✅ وجود این onClick باعث می‌شد ارور بگیرید چون فایل use client نداشت
        onClick={(e) => {
           if (isDisabled) e.preventDefault();
           if (props.onClick) props.onClick(e as any);
        }}
        {...linkProps}
      >
        {content}
      </Link>
    );
  }

  // --- رندر به عنوان دکمه ---
  return (
    <button
      className={classNames}
      disabled={isDisabled}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
};