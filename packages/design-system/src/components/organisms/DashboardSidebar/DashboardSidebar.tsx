"use client";
import React, { useState } from 'react';
import { LogOut, ChevronDown, Menu } from 'lucide-react';
import { Label } from '../../atoms/Label/Label';
import './DashboardSidebar.scss';

export type DashboardTab = 'dashboard' | 'profile' | 'addresses' | 'orders' | 'reviews';

export interface DashboardMenuItem {
  id: DashboardTab;
  label: string;
  icon: React.ReactNode;
}

interface DashboardSidebarProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  onLogout: () => void;
  menuItems: DashboardMenuItem[]; // منو را از بیرون میگیریم تا وابسته نباشد
  userDisplayName: string; // نام کاربر برای نمایش در هدر
}

export const DashboardSidebar = ({ 
  activeTab, 
  onTabChange, 
  onLogout, 
  menuItems,
  userDisplayName 
}: DashboardSidebarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeLabel = menuItems.find(item => item.id === activeTab)?.label;

  return (
    <div className="dashboard-sidebar">
      
      {/* Mobile Header / Toggle */}
      <div className="dashboard-sidebar__mobile-header">
        <button 
          className="dashboard-sidebar__toggle-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="dashboard-sidebar__toggle-content">
            <Menu size={20} />
            <Label className="dashboard-sidebar__active-label">{activeLabel}</Label>
          </div>
          <ChevronDown size={20} className={`dashboard-sidebar__chevron ${isMobileMenuOpen ? 'open' : ''}`} />
        </button>
      </div>

      {/* Sidebar Content */}
      <div className={`dashboard-sidebar__container ${isMobileMenuOpen ? 'dashboard-sidebar__container--open' : ''}`}>
        
        {/* Sidebar Header (Desktop) */}
        <div className="dashboard-sidebar__header">
           <div className="dashboard-sidebar__user-info">
              <Label weight="bold" size="lg" >حساب کاربری </Label>
              <Label size="sm" color="secondary">{userDisplayName}</Label>
           </div>
        </div>
        
        <nav className="dashboard-sidebar__nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`dashboard-sidebar__item ${activeTab === item.id ? 'dashboard-sidebar__item--active' : ''}`}
            >
              <span className="dashboard-sidebar__icon">{item.icon}</span>
              <span className="dashboard-sidebar__label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="dashboard-sidebar__footer">
          <button onClick={onLogout} className="dashboard-sidebar__logout-btn">
            <LogOut size={20} />
            <span>خروج از حساب</span>
          </button>
        </div>
      </div>
    </div>
  );
};