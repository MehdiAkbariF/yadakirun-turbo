// packages/design-system/src/components/organisms/Container/Container.tsx
"use client";
import React from 'react';
import { ContainerProps } from './Container.types';
import './Container.scss';

export const Container = ({
  children,
  asSection = false,
  as: Component = 'div',
  className,
}: ContainerProps) => {
  const classNames = [
    'container',
    asSection ? 'container--section' : '', // کلاس جدید برای حالت بخش
    className,
  ].filter(Boolean).join(' ');

  // اگر asSection فعال است، همیشه از تگ <section> استفاده می‌کنیم
  const FinalComponent = asSection ? 'section' : Component;

  return <FinalComponent className={classNames}>{children}</FinalComponent>;
};