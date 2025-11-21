// packages/design-system/src/components/atoms/Badge/Badge.tsx
import React from 'react';
import { BadgeProps } from './Badge.types';
import './Badge.scss';

export const Badge = ({
  variant = 'primary',
  children,
  className,
}: BadgeProps) => {
  const classNames = [
    'badge',
    `badge--variant-${variant}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      {children}
    </div>
  );
};