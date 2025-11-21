import React from 'react';
import { Check } from 'lucide-react';
import { Label } from '../Label/Label';
import './Checkbox.scss';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
}

export const Checkbox = ({ label, checked, onChange, id }: CheckboxProps) => {
  return (
    <label className="checkbox-wrapper" htmlFor={id}>
      <div className={`checkbox-box ${checked ? 'checkbox-box--checked' : ''}`}>
        {checked && <Check size={14} className="text-white" />}
      </div>
      <input 
        type="checkbox" 
        id={id} 
        checked={checked} 
        onChange={(e) => onChange(e.target.checked)}
        className="hidden-input"
      />
      <Label size="sm" className="cursor-pointer select-none">{label}</Label>
    </label>
  );
};