"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import { LayoutDashboard, User, MapPin, ShoppingBag, MessageSquare, HelpCircle } from 'lucide-react';

// ✅ ایمپورت store ها و context های مورد نیاز
import { useAddressStore } from '@/src/stores/addressStore';
import { useAuth } from '@/src/context/AuthContext';

// Imports from DS
import { Label } from '@monorepo/design-system/src/components/atoms/Label/Label';
import { DashboardSidebar, DashboardTab, DashboardMenuItem } from '@monorepo/design-system/src/components/organisms/DashboardSidebar/DashboardSidebar';
import { ProfileEditForm, UserProfileData } from '@monorepo/design-system/src/components/organisms/ProfileEditForm/ProfileEditForm';
import { OrderList, OrderItem } from '@monorepo/design-system/src/components/organisms/OrderList/OrderList';
// ✅ ایمپورت تایپ‌ها از خود کامپوننت حذف شد چون دیگر لازم نیست
import { AddressManager } from '@monorepo/design-system/src/components/organisms/AddressManager/AddressManager';
import { TicketList, TicketItem } from '@monorepo/design-system/src/components/organisms/TicketList/TicketList';

// --- Mock Data ---
const userData: UserProfileData = {
  firstName: "مهدی",
  lastName: "اکبری",
  phoneNumber: "09123456789",
  email: "mahdi@example.com"
};
const ordersData: OrderItem[] = [
  { id: 1, orderNumber: "12345", date: "۱۴۰۲/۰۷/۱۵", totalPrice: "250,000 تومان", status: "processing" },
  { id: 2, orderNumber: "12346", date: "۱۴۰۲/۰۷/۱۲", totalPrice: "180,000 تومان", status: "shipped" },
  { id: 3, orderNumber: "12347", date: "۱۴۰۲/۰۷/۱۰", totalPrice: "500,000 تومان", status: "delivered" },
  { id: 4, orderNumber: "12348", date: "۱۴۰۲/۰۷/۰۵", totalPrice: "95,000 تومان", status: "canceled" },
];
const ticketsData: TicketItem[] = [
  { id: 1, ticketNumber: "TCK-001", date: "۱۴۰۲/۰۸/۰۱", subject: "مشکل در سفارش", status: "open" },
  { id: 2, ticketNumber: "TCK-002", date: "۱۴۰۲/۰۷/۲۵", subject: "درخواست مرجوعی", status: "pending" },
  { id: 3, ticketNumber: "TCK-003", date: "۱۴۰۲/۰۷/۲۰", subject: "سوال فنی", status: "closed" },
  { id: 4, ticketNumber: "TCK-004", date: "۱۴۰۲/۰۷/۱۵", subject: "شکایت از ارسال", status: "open" },
];

// --- Menu Config ---
const menuItems: DashboardMenuItem[] = [
  { id: 'dashboard', label: 'پیشخوان', icon: <LayoutDashboard size={20} /> },
  { id: 'profile', label: 'مشخصات فردی', icon: <User size={20} /> },
  { id: 'addresses', label: 'آدرس‌ها', icon: <MapPin size={20} /> },
  { id: 'orders', label: 'سفارشات', icon: <ShoppingBag size={20} /> },
  { id: 'tickets', label: 'تیکت‌ها', icon: <HelpCircle size={20} /> },
  { id: 'reviews', label: 'نظرات', icon: <MessageSquare size={20} /> },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('dashboard');
  
  // ✅ 1. دریافت تمام اکشن‌های لازم از store
  const { addresses, isLoading, fetchAddresses, addAddress, updateAddress, deleteAddress } = useAddressStore();
  const { logout, user } = useAuth();

  useEffect(() => {
    // واکشی اولیه آدرس‌ها به محض ورود به داشبورد
    fetchAddresses();
  }, [fetchAddresses]);

  // --- Handlers ---
  const handleLogout = () => {
    if (confirm('آیا مطمئن هستید که می‌خواهید خارج شوید؟')) {
      logout();
    }
  };
  
  const handleUpdateProfile = (data: UserProfileData) => {
    console.log('Profile Updated:', data);
  };

  // --- Content Renderer ---
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="bg-surface p-6 rounded-2xl border border-border-secondary shadow-sm">
             <Label size="lg" weight="bold" className="mb-4">پیشخوان</Label>
             <Label className="leading-loose text-secondary">
               سلام <span className="font-bold text-brand-primary">{user?.name || 'کاربر'}</span> عزیز، خوش آمدید.
               <br />
               از پیشخوان حساب کاربری خود می‌توانید آخرین سفارش‌ها را ببینید، به راحتی آدرس‌های حمل و نقل را مدیریت کنید و اطلاعات حساب کاربری و رمز عبور خود را تغییر دهید.
             </Label>
            
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <div className="bg-bg-secondary p-4 rounded-xl border border-border-secondary text-center">
                   <Label size="2x" weight="black" color="primary">{ordersData.length}</Label>
                   <Label size="xs" color="secondary">کل سفارشات</Label>
                </div>
                <div className="bg-bg-secondary p-4 rounded-xl border border-border-secondary text-center">
                   <Label size="2x" weight="black" color="warning">
                      {ordersData.filter(o => o.status === 'processing').length}
                   </Label>
                   <Label size="xs" color="secondary">در حال پردازش</Label>
                </div>
                <div className="bg-bg-secondary p-4 rounded-xl border border-border-secondary text-center">
                   <Label size="2x" weight="black" color="success">0</Label>
                   <Label size="xs" color="secondary">پیام خوانده نشده</Label>
                </div>
             </div>
          </div>
        );
      case 'profile':
        return <ProfileEditForm initialData={userData} onSubmit={handleUpdateProfile} />;
      case 'addresses':
        return (
          // ✅ 2. پاس دادن تمام props های لازم، از جمله onUpdateAddress
          <AddressManager
            addresses={addresses}
            isLoading={isLoading}
            onAddAddress={addAddress}
            onUpdateAddress={updateAddress}
            onDeleteAddress={deleteAddress}
          />
        );
      case 'orders':
        return <OrderList orders={ordersData} onViewDetails={(id) => alert(`مشاهده سفارش ${id}`)} />;
      case 'tickets':
        return <TicketList tickets={ticketsData} onViewDetails={(id) => alert(`مشاهده تیکت ${id}`)} />;
      case 'reviews':
        return (
           <div className="bg-surface p-10 rounded-2xl border border-border-secondary text-center">
              <MessageSquare size={48} className="mx-auto text-text-placeholder mb-4" />
              <Label color="secondary">لیست نظرات شما خالی است.</Label>
           </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
     
      {/* Sidebar */}
      <div className="w-full lg:w-[280px] flex-shrink-0 lg:sticky lg:top-24">
          <DashboardSidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onLogout={handleLogout}
            menuItems={menuItems}
            userDisplayName={user?.name || 'کاربر مهمان'}
          />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 w-full min-w-0">
          {renderContent()}
      </div>
    </div>
  );
}