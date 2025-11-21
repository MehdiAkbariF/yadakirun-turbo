import React from 'react';
import { Label } from '../Label/Label';
import './Switch.scss';

interface SwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
}

export const Switch = ({ label, checked, onChange, id }: SwitchProps) => {
  return (
    <label className="switch-wrapper" htmlFor={id}>
      <Label size="sm" className="cursor-pointer select-none flex-grow">{label}</Label>
      <div className={`switch-track ${checked ? 'switch-track--checked' : ''}`}>
        <div className="switch-thumb" />
      </div>
      <input 
        type="checkbox" 
        id={id} 
        checked={checked} 
        onChange={(e) => onChange(e.target.checked)}
        className="hidden-input"
      />
    </label>
  );
};