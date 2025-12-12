import React from 'react';
import { SpinnerProps } from './Spinner.types';
import './Spinner.scss';

export const Spinner = ({
  size = 'md',
  color = 'multicolor', // پیش‌فرض روی حالت رنگارنگ
  label = 'در حال بارگذاری...',
  className,
  ...props
}: SpinnerProps) => {
  
  // تنظیم ضخامت خط
  const strokeWidth = size === 'sm' ? 3 : size === 'xl' ? 5 : 4;
  const viewBoxSize = 50; // ویو باکس ثابت
  const radius = 20;

  const classNames = [
    'spinner',
    `spinner--size-${size}`,
    `spinner--color-${color}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} role="status" {...props}>
      <svg
        className="spinner__svg"
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="spinner__path"
          cx={viewBoxSize / 2}
          cy={viewBoxSize / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );
};