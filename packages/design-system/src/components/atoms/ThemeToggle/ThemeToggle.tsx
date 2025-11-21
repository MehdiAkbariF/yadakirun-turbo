import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { ThemeToggleProps } from './ThemeToggle.types';
import './ThemeToggle.scss';

export const ThemeToggle = ({
  isDarkMode,
  onToggle,
  variant = 'slider',
  className,
}: ThemeToggleProps) => {
  // اگر واریانت فقط آیکون است، یک HTML ساده‌تر رندر می‌کنیم
  if (variant === 'icon') {
    return (
      <button
        type="button"
        className={`theme-toggle-icon-only ${className || ''}`}
        onClick={onToggle}
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    );
  }

  // در غیر این صورت، همان دکمه اسلایدر قبلی را رندر می‌کنیم
  const classNames = [
    'theme-toggle-slider',
    isDarkMode ? 'theme-toggle-slider--dark' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={classNames}
      onClick={onToggle}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <Sun className="theme-toggle-slider__icon theme-toggle-slider__icon--sun" size={16} />
      <Moon className="theme-toggle-slider__icon theme-toggle-slider__icon--moon" size={16} />
      <div className="theme-toggle-slider__slider" />
    </button>
  );
};