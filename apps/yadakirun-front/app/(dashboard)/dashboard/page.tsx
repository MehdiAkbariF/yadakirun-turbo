// مسیر: apps/yadakirun-front/app/(dashboard)/dashboard/page.tsx
"use client";
import React, { useState } from 'react';
import { LayoutDashboard, User, MapPin, ShoppingBag, MessageSquare, HelpCircle } from 'lucide-react'; // ✅ آیکون جدید برای تیکت‌ها

// Imports from DS
import { Label } from '@monorepo/design-system/src/components/atoms/Label/Label';
import { DashboardSidebar, DashboardTab, DashboardMenuItem } from '@monorepo/design-system/src/components/organisms/DashboardSidebar/DashboardSidebar';
import { ProfileEditForm, UserProfileData } from '@monorepo/design-system/src/components/organisms/ProfileEditForm/ProfileEditForm';
import { OrderList, OrderItem } from '@monorepo/design-system/src/components/organisms/OrderList/OrderList';
import { AddressManager, AddressItem } from '@monorepo/design-system/src/components/organisms/AddressManager/AddressManager';
import { TicketList, TicketItem } from '@monorepo/design-system/src/components/organisms/TicketList/TicketList'; // ✅✅✅ ایمپورت کامپوننت جدید ✅✅✅

// --- Mock Data ---
const userData: UserProfileData = {
  firstName: "مهدی",
  lastName: "اکبری",
  phoneNumber: "09123456789",
  email: "mahdi@example.com"
};
const initialAddresses: AddressItem[] = [
  { id: 1, title: 'خانه', fullAddress: 'تهران، خیابان آزادی، کوچه شماره ۵، پلاک ۱۰', postalCode: '1419912345' },
  { id: 2, title: 'محل کار', fullAddress: 'اصفهان، میدان نقش جهان، ساختمان اداری، طبقه ۳', postalCode: '8146654321' },
];
const ordersData: OrderItem[] = [
  { id: 1, orderNumber: "12345", date: "۱۴۰۲/۰۷/۱۵", totalPrice: "250,000 تومان", status: "processing" },
  { id: 2, orderNumber: "12346", date: "۱۴۰۲/۰۷/۱۲", totalPrice: "180,000 تومان", status: "shipped" },
  { id: 3, orderNumber: "12347", date: "۱۴۰۲/۰۷/۱۰", totalPrice: "500,000 تومان", status: "delivered" },
  { id: 4, orderNumber: "12348", date: "۱۴۰۲/۰۷/۰۵", totalPrice: "95,000 تومان", status: "canceled" },
];

// ✅✅✅ داده‌های موک برای تیکت‌ها ✅✅✅
const ticketsData: TicketItem[] = [
  { id: 1, ticketNumber: "TCK-001", date: "۱۴۰۲/۰۸/۰۱", subject: "مشکل در سفارش", status: "open" },
  { id: 2, ticketNumber: "TCK-002", date: "۱۴۰۲/۰۷/۲۵", subject: "درخواست مرجوعی", status: "pending" },
  { id: 3, ticketNumber: "TCK-003", date: "۱۴۰۲/۰۷/۲۰", subject: "سوال فنی", status: "closed" },
  { id: 4, ticketNumber: "TCK-004", date: "۱۴۰۲/۰۷/۱۵", subject: "شکایت از ارسال", status: "open" },
];

// --- Menu Config ---
// ✅✅✅ اضافه کردن تب جدید 'tickets' ✅✅✅
const menuItems: DashboardMenuItem[] = [
  { id: 'dashboard', label: 'پیشخوان', icon: <LayoutDashboard size={20} /> },
  { id: 'profile', label: 'مشخصات فردی', icon: <User size={20} /> },
  { id: 'addresses', label: 'آدرس‌ها', icon: <MapPin size={20} /> },
  { id: 'orders', label: 'سفارشات', icon: <ShoppingBag size={20} /> },
  { id: 'tickets', label: 'تیکت‌ها', icon: <HelpCircle size={20} /> }, // ✅✅✅ تب جدید ✅✅✅
  { id: 'reviews', label: 'نظرات', icon: <MessageSquare size={20} /> },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('dashboard');
  const [addresses, setAddresses] = useState<AddressItem[]>(initialAddresses);

  // --- Handlers ---
  const handleLogout = () => {
    if (confirm('آیا مطمئن هستید که می‌خواهید خارج شوید؟')) {
      alert('خروج از حساب...');
      // Logic for logout
    }
  };
  const handleUpdateProfile = (data: UserProfileData) => {
    console.log('Profile Updated:', data);
    // API Call
  };
  const handleAddAddress = (newAddr: Omit<AddressItem, 'id'>) => {
    const addrWithId = { ...newAddr, id: Date.now() };
    setAddresses([...addresses, addrWithId]);
  };
  // ✅✅✅ اصلاح شده: حذف confirm مرورگر
  const handleDeleteAddress = (id: number | string) => {
    // چون تاییدیه در مودال داخلی AddressManager گرفته شده، اینجا مستقیماً حذف می‌کنیم
    setAddresses(addresses.filter(a => a.id !== id));
  };

  // --- Content Renderer ---
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="bg-surface p-6 rounded-2xl border border-border-secondary shadow-sm">
             <Label size="lg" weight="bold" className="mb-4">پیشخوان</Label>
             <Label className="leading-loose text-secondary">
               سلام <span className="font-bold text-brand-primary">{userData.firstName} {userData.lastName}</span> عزیز، خوش آمدید.
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
          <AddressManager
            addresses={addresses}
            onAddAddress={handleAddAddress}
            onDeleteAddress={handleDeleteAddress}
          />
        );
      case 'orders':
        return <OrderList orders={ordersData} onViewDetails={(id) => alert(`مشاهده سفارش ${id}`)} />;
      case 'tickets': // ✅✅✅ کیس جدید برای تیکت‌ها ✅✅✅
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
            userDisplayName={`${userData.firstName} ${userData.lastName}`}
          />
      </div>
      {/* Main Content Area */}
      <div className="flex-1 w-full min-w-0">
          {renderContent()}
      </div>
    </div>
  );
}