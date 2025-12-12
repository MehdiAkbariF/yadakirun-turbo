import React from 'react';
import { Label } from '../Label/Label';
import './TextArea.scss';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
}

export const TextArea = ({
  id,
  label,
  error,
  className,
  containerClassName,
  ...props
}: TextAreaProps) => {
  return (
    <div className={`textarea-container ${error ? 'textarea-container--error' : ''} ${containerClassName || ''}`}>
      {label && (
        <Label as="label" htmlFor={id} size="sm" weight="medium" color="secondary" className="textarea-label">
          {label}
        </Label>
      )}
      <textarea
        id={id}
        className={`textarea-field ${className || ''} custom-scrollbar`}
        {...props}
      />
      {error && (
        <Label as="p" size="xs" color="on-brand" className="textarea-error-message">
          {error}
        </Label>
      )}
    </div>
  );
};