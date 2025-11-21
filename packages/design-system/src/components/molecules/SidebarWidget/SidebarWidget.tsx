import React from 'react';
import { Label } from '../../atoms/Label/Label';
import './SidebarWidget.scss'; // ایمپورت فایل استایل

interface SidebarWidgetProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const SidebarWidget = ({ title, children, className }: SidebarWidgetProps) => {
  return (
    <div className={`sidebar-widget ${className || ''}`}>
      <div className="sidebar-widget__header">
        <Label weight="bold" size="lg" className="sidebar-widget__title">
          {title}
        </Label>
      </div>
      <div className="sidebar-widget__content">
        {children}
      </div>
    </div>
  );
};