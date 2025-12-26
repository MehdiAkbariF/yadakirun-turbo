"use client";
import React from 'react';
import { LabelProps } from './Label.types';
import { toPersianDigits } from '../../../utils/persian';
import './Label.scss';

export const Label = ({
  as: Component = 'p',
  size = 'base',
  weight = 'normal',
  color = 'primary',
  children,
  className,
  ...props
}: LabelProps) => {
  const classNames = [
    'label',
    `label--size-${size}`,
    `label--weight-${weight}`,
    `label--color-${color}`,
    className,
  ].filter(Boolean).join(' ');

  
  
  
  const content = 
    typeof children === 'string' || typeof children === 'number'
      ? toPersianDigits(children)
      : children;

  return (
    <Component className={classNames} {...props}>
      {content}
    </Component>
  );
};