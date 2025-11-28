import React from 'react';
import { SpinnerProps } from './Spinner.types';
import './Spinner.scss';

export const Spinner = ({
  size = 'md',
  color = 'primary',
  label = 'در حال بارگذاری...',
  className,
}: SpinnerProps) => {
  const classNames = [
    'spinner',
    `spinner--size-${size}`,
    `spinner--color-${color}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classNames}
      role="status" // نقش ARIA برای اعلام وضعیت بارگذاری
    >
      {/* این متن برای صفحه‌خوان‌ها خوانده می‌شود اما دیده نمی‌شود */}
      <span className="sr-only">{label}</span>
    </div>
  );
};