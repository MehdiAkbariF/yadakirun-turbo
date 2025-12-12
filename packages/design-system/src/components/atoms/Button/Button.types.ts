import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';

// انواع ظاهری دکمه
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg';

// پراپرتی‌های مشترک
interface BaseButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
}

// 1. حالتی که دکمه معمولی است (بدون href)
type ButtonAsButton = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
};

// 2. حالتی که لینک است (با href)
type ButtonAsLink = BaseButtonProps & AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

// اجتماع این دو حالت
export type ButtonProps = ButtonAsButton | ButtonAsLink;