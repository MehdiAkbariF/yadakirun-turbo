// packages/design-system/src/components/atoms/Loader/Loader.tsx
import React from 'react';
import { LoaderProps } from './Loader.types';
import './Loader.scss';

export const Loader = ({
  size = 'md',
  variant = 'primary',
  screenReaderText = 'در حال بارگذاری...',
  fullscreen = false,
  className,
}: LoaderProps) => {
  const classNames = [
    'loader',
    `loader--size-${size}`,
    `loader--variant-${variant}`,
    className,
  ].filter(Boolean).join(' ');

  const loaderSpinner = (
    <div className={classNames} role="status">
      <span className="sr-only">{screenReaderText}</span>
    </div>
  );

  if (fullscreen) {
    return (
      <div className="loader-fullscreen-overlay">
        {loaderSpinner}
      </div>
    );
  }

  return loaderSpinner;
}