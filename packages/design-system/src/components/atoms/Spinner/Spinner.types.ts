// packages/design-system/src/components/atoms/Spinner/Spinner.types.ts
import { HTMLAttributes } from 'react';

type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';
// رنگ 'multicolor' رو اضافه کردم
type SpinnerColor = 'primary' | 'secondary' | 'white' | 'multicolor'; 

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
  color?: SpinnerColor;
  label?: string;
  strokeWidth?: number;
}