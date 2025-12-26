// packages/design-system/src/components/atoms/Input/Input.tsx
"use client";
import React from 'react';
import { InputProps } from './Input.types';
import { Label } from '../Label/Label';
import './Input.scss';

export const Input = ({
  id,
  label,
  leftIcon,
  error,
  className,
  containerClassName,
  ...props
}: InputProps) => {
  const containerClasses = [
    'input-container',
    error ? 'input-container--error' : '',
    props.disabled ? 'input-container--disabled' : '',
    containerClassName,
  ].filter(Boolean).join(' ');

  const inputClasses = [
    'input-field',
    leftIcon ? 'input-field--with-icon' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {label && (
        <Label as="label" htmlFor={id} size="sm" weight="medium" color="secondary" className="input-label">
          {label}
        </Label>
      )}
      <div className="input-wrapper">
        {leftIcon && <div className="input-icon">{leftIcon}</div>}
        <input
          id={id}
          className={inputClasses}
          {...props}
        />
      </div>
      {error && (
        <Label as="p" size="xs" color="on-brand" className="input-error-message">
          {error}
        </Label>
      )}
    </div>
  );
};