"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  User, 
  MapPin, 
  ShoppingBag, 
  MessageSquare, 
  HelpCircle, 
  ArrowRight,
  Wrench,
  Truck,
  RefreshCw
} from 'lucide-react';

// --- Stores & Context ---
import { useAddressStore } from '@/src/stores/addressStore';
import { useTicketStore } from '@/src/stores/ticketStore';
import { useAuth } from '@/src/context/AuthContext';

// --- Design System Imports ---
import { Label } from '@monorepo/design-system/src/components/atoms/Label/Label';
import { DashboardSidebar, DashboardTab, DashboardMenuItem } from '@monorepo/design-system/src/components/organisms/DashboardSidebar/DashboardSidebar';
import { ProfileEditForm, UserProfileData } from '@monorepo/design-system/src/components/organisms/ProfileEditForm/ProfileEditForm';
import { OrderList, OrderItem } from '@monorepo/design-system/src/components/organisms/OrderList/OrderList';
import { AddressManager } from '@monorepo/design-system/src/components/organisms/AddressManager/AddressManager';
import { TicketList } from '@monorepo/design-system/src/components/organisms/TicketList/TicketList';
import { Button } from '@monorepo/design-system/src/components/atoms/Button/Button';
import { TicketChat } from '@monorepo/design-system/src/components/organisms/TicketChat/TicketChat';

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
];

const chatCategories = [
  { id: 1, title: 'مشاوره فنی', icon: <Wrench size={20} className="text-blue-500" /> },
  { id: 2, title: 'پیگیری ارسال', icon: <Truck size={20} className="text-orange-500" /> },
  { id: 3, title: 'مرجوعی کالا', icon: <RefreshCw size={20} className="text-red-500" /> },
  { id: 4, title: 'سایر موارد', icon: <HelpCircle size={20} className="text-gray-500" /> },
];

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
  
  const { addresses, isLoading: addrLoading, fetchAddresses, addAddress, updateAddress, deleteAddress } = useAddressStore();
  const { 
    tickets, 
    chatMessages, // ✅ دریافت پیام‌ها از استور
    isLoading: ticketLoading, 
    currentView, 
    selectedTicketId,
    fetchTickets, 
    viewTicket, 
    openCreateView, 
    goBackToList,
    sendMessage, // ✅ دریافت اکشن ارسال
    setCategory  // ✅ دریافت اکشن انتخاب دسته‌بندی
  } = useTicketStore();
  
  const { logout, user } = useAuth();

  useEffect(() => {
    fetchAddresses();
    fetchTickets();
  }, [fetchAddresses, fetchTickets]);

  const handleLogout = () => {
    if (confirm('آیا مطمئن هستید که می‌خواهید از حساب کاربری خارج شوید؟')) {
      logout();
    }
  };
  
  const handleUpdateProfile = (data: UserProfileData) => {
    console.log('Profile Updated:', data);
  };

  const formattedTickets = tickets.map(t => ({
    id: t.id,
    ticketNumber: String(t.id),
    date: new Date(t.createdDate).toLocaleDateString('fa-IR'),
    subject: t.title,
    status: t.status === 1 ? 'open' : t.status === 2 ? 'pending' : 'closed' as any
  }));

  const activeTicket = tickets.find(t => t.id === selectedTicketId);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="bg-surface p-6 rounded-md  ">
             <Label size="base" weight="bold" className="mb-4">پیشخوان</Label>
             <Label className="leading-loose text-secondary" size='sm'>
               سلام <span className="font-bold text-brand-primary ">{user?.name || 'کاربر'}</span> عزیز، خوش آمدید.
             </Label>
             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                <div className="bg-bg-secondary p-4 rounded-xl border border-border-secondary text-center">
                   <Label size="lg" weight="black" color="primary">{ordersData.length}</Label>
                   <Label size="xs" color="secondary">کل سفارشات</Label>
                </div>
                <div className="bg-bg-secondary p-4 rounded-xl border border-border-secondary text-center">
                   <Label size="lg" weight="black" color="warning">
                      {ordersData.filter(o => o.status === 'processing').length}
                   </Label>
                   <Label size="xs" color="secondary">در حال پردازش</Label>
                </div>
                <div className="bg-bg-secondary p-4 rounded-xl border border-border-secondary text-center">
                   <Label size="lg" weight="black" color="success">0</Label>
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
            isLoading={addrLoading}
            onAddAddress={addAddress}
            onUpdateAddress={updateAddress}
            onDeleteAddress={deleteAddress}
          />
        );

      case 'orders':
        return <OrderList orders={ordersData} onViewDetails={(id) => alert(`مشاهده سفارش ${id}`)} />;

      case 'tickets':
        if (currentView === 'chat' || currentView === 'create') {
          return (
            <div className="flex flex-col h-full animate-fade-in">
               <Button 
                variant="ghost" 
                size="sm" 
                onClick={goBackToList} 
                leftIcon={<ArrowRight size={18} />} 
                className="mb-4 self-start hover:bg-brand-primary/5 text-brand-primary font-bold"
               >
                 بازگشت به لیست تیکت‌ها
               </Button>
               
               <TicketChat
                  isNewTicket={currentView === 'create'}
                  categories={chatCategories}
                  messages={chatMessages} // ✅ حالا پیام‌ها از استور می‌آیند
                  ticketInfo={{ 
                    id: selectedTicketId, 
                    subject: activeTicket?.title || 'مشاهده گفتگو', 
                    statusLabel: activeTicket?.status === 1 ? 'باز' : 'در حال بررسی' 
                  }}
                  onSendMessage={sendMessage} // ✅ اتصال اکشن واقعی ارسال
                  onSelectCategory={setCategory} // ✅ اتصال اکشن انتخاب موضوع
                  onAttachFile={() => console.log('Attach file requested')}
               />
            </div>
          );
        }

        return (
          <TicketList 
            tickets={formattedTickets} 
            isLoading={ticketLoading}
            onViewDetails={(id) => viewTicket(id)}
            onCreateTicket={() => openCreateView()}
          />
        );

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
    <div className="flex flex-col lg:flex-row gap-8 items-start pb-10 px-5 mt-8">
      <div className="w-full lg:w-[280px] flex-shrink-0 lg:sticky lg:top-24">
          <DashboardSidebar
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              if (tab === 'tickets') goBackToList(); 
            }}
            onLogout={handleLogout}
            menuItems={menuItems}
            userDisplayName={user?.name || 'کاربر مهمان'}
          />
      </div>
      <div className="flex-1 w-full min-w-0">
          {renderContent()}
      </div>
    </div>
  );
}