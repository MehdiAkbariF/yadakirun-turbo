"use client";
import React, { useRef, useEffect } from 'react';
import { LogOut } from 'lucide-react';
import { Label } from '../../atoms/Label/Label';
import './DashboardSidebar.scss';

// ✅ اضافه شدن tickets به تایپ‌ها
export type DashboardTab = 'dashboard' | 'profile' | 'addresses' | 'orders' | 'tickets' | 'returns' | 'reviews';

export interface DashboardMenuItem {
  id: DashboardTab;
  label: string;
  icon: React.ReactNode;
}

interface DashboardSidebarProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  onLogout: () => void;
  menuItems: DashboardMenuItem[];
  userDisplayName: string;
}

export const DashboardSidebar = ({ 
  activeTab, 
  onTabChange, 
  onLogout, 
  menuItems,
  userDisplayName 
}: DashboardSidebarProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // ✅ اسکرول خودکار به سمت آیتم فعال در موبایل
  useEffect(() => {
    const activeElement = scrollRef.current?.querySelector('.dashboard-sidebar__item--active');
    if (activeElement) {
      activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeTab]);

  return (
    <aside className="dashboard-sidebar">
      
      {/* --- بخش اطلاعات کاربر (در دسکتاپ عمودی و در موبایل افقی) --- */}
      <div className="dashboard-sidebar__user-box">
        <div className="dashboard-sidebar__user-info">
          <div className="dashboard-sidebar__avatar">
            {userDisplayName.charAt(0)}
          </div>
          <div className="dashboard-sidebar__text">
            <Label weight="bold" size="base" className="dashboard-sidebar__welcome">خوش آمدید</Label>
            <Label size="sm" color="secondary" className="dashboard-sidebar__name">{userDisplayName}</Label>
          </div>
        </div>
        
        {/* دکمه خروج مخصوص موبایل (در دسکتاپ مخفی است) */}
        <button onClick={onLogout} className="dashboard-sidebar__logout-mobile" title="خروج">
          <LogOut size={20} />
        </button>
      </div>

      {/* --- نوار ناوبری --- */}
      <nav className="dashboard-sidebar__nav custom-scrollbar" ref={scrollRef}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`dashboard-sidebar__item ${activeTab === item.id ? 'dashboard-sidebar__item--active' : ''}`}
          >
            <span className="dashboard-sidebar__icon">{item.icon}</span>
            <span className="dashboard-sidebar__label">{item.label}</span>
            
            {/* ایندیکیتور فعال بودن (مخصوص موبایل) */}
            {activeTab === item.id && <span className="dashboard-sidebar__active-dot" />}
          </button>
        ))}
      </nav>

      {/* --- فوتر (فقط دسکتاپ) --- */}
      <div className="dashboard-sidebar__footer">
        <button onClick={onLogout} className="dashboard-sidebar__logout-btn">
          <LogOut size={20} />
          <Label as="span" size="sm" weight="bold">خروج از حساب</Label>
        </button>
      </div>

    </aside>
  );
};