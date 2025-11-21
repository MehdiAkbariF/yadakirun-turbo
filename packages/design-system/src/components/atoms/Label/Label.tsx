import React from 'react';
import { LabelProps } from './Label.types';
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

  return (
    <Component className={classNames} {...props}>
      {children}
    </Component>
  );
};