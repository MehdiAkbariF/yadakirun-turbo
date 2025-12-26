"use client";

import React from "react";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  User,
  MapPin,
  ShoppingBag,
  MessageSquare,
  HelpCircle,
  ArrowRight,
  RefreshCw,
  Clock,
  CheckCircle2,
  Truck,
  CreditCard,
  XCircle,
} from "lucide-react";

import { useAddressStore } from "@/src/stores/addressStore";
import { useTicketStore } from "@/src/stores/ticketStore";
import { useReturnStore } from "@/src/stores/returnStore";
import { useOrderStore } from "@/src/stores/orderStore"; // ← اضافه شد
import { useAuth } from "@/src/context/AuthContext";

import { Label } from "@monorepo/design-system/src/components/atoms/Label/Label";
import { Badge } from "@monorepo/design-system/src/components/atoms/Badge/Badge";
import {
  DashboardSidebar,
  DashboardTab,
  DashboardMenuItem,
} from "@monorepo/design-system/src/components/organisms/DashboardSidebar/DashboardSidebar";
import {
  ProfileEditForm,
  UserProfileData,
} from "@monorepo/design-system/src/components/organisms/ProfileEditForm/ProfileEditForm";
import {
  OrderList,
  OrderItem,
} from "@monorepo/design-system/src/components/organisms/OrderList/OrderList";
import { AddressManager } from "@monorepo/design-system/src/components/organisms/AddressManager/AddressManager";
import { TicketList } from "@monorepo/design-system/src/components/organisms/TicketList/TicketList";
import { Button } from "@monorepo/design-system/src/components/atoms/Button/Button";
import { TicketChat } from "@monorepo/design-system/src/components/organisms/TicketChat/TicketChat";

const userData: UserProfileData = {
  firstName: "مهدی",
  lastName: "اکبری",
  phoneNumber: "09123456789",
  email: "mahdi@example.com",
};

const menuItems: DashboardMenuItem[] = [
  { id: "dashboard", label: "پیشخوان", icon: <LayoutDashboard size={20} /> },
  { id: "profile", label: "مشخصات فردی", icon: <User size={20} /> },
  { id: "addresses", label: "آدرس‌ها", icon: <MapPin size={20} /> },
  { id: "orders", label: "سفارشات", icon: <ShoppingBag size={20} /> },
  { id: "tickets", label: "تیکت‌ها", icon: <HelpCircle size={20} /> },
  { id: "returns", label: "درخواست مرجوعی", icon: <RefreshCw size={20} /> },
  { id: "reviews", label: "نظرات", icon: <MessageSquare size={20} /> },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("dashboard");

  const {
    addresses,
    isLoading: addrLoading,
    fetchAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
  } = useAddressStore();

  const {
    tickets,
    categories,
    chatMessages,
    isLoading: ticketLoading,
    isLoadingCategories,
    currentView,
    selectedTicketId,
    selectedCategory,
    fetchTickets,
    fetchCategories,
    viewTicket,
    openCreateView,
    goBackToList,
    setCategory,
    createAndOpenNewTicket,
    sendMessageToExistingTicket,
  } = useTicketStore();

  const {
    returns,
    isLoading: returnsLoading,
    selectedStatus: returnSelectedStatus,
    fetchReturns,
    setSelectedStatus: setReturnSelectedStatus,
  } = useReturnStore();

  // ← استور سفارشات اضافه شد
  const {
    orders,
    isLoading: ordersLoading,
    selectedStatus: orderSelectedStatus,
    fetchOrders,
    setSelectedStatus: setOrderSelectedStatus,
  } = useOrderStore();

  const { logout, user } = useAuth();

  useEffect(() => {
    fetchAddresses();
    fetchTickets();
    fetchCategories();
    fetchReturns();
    fetchOrders(); // ← سفارشات هم لود بشه
  }, [fetchAddresses, fetchTickets, fetchCategories, fetchReturns, fetchOrders]);

  const handleLogout = () => {
    if (confirm("آیا مطمئن هستید که می‌خواهید از حساب کاربری خارج شوید؟")) {
      logout();
    }
  };

  const handleUpdateProfile = (data: UserProfileData) => {
    console.log("Profile Updated:", data);
  };

  const formattedTickets = tickets.map((t) => ({
    id: t.id,
    ticketNumber: String(t.id),
    date: new Date(t.createdDate).toLocaleDateString("fa-IR"),
    subject: t.title,
    status:
      t.status === 1 ? "open" : t.status === 2 ? "pending" : ("closed" as any),
  }));

  const activeTicket = tickets.find((t) => t.id === selectedTicketId);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="bg-surface p-6 rounded-md">
            <Label size="base" weight="bold" className="mb-4">
              پیشخوان
            </Label>
            <Label className="leading-loose text-secondary" size="sm">
              سلام{" "}
              <span className="font-bold text-brand-primary">
                {user?.name || "کاربر"}
              </span>{" "}
              عزیز، خوش آمدید.
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              <div className="bg-bg-secondary p-4 rounded-xl border border-border-secondary text-center">
                <Label size="lg" weight="black" color="primary">
                  {orders.length}
                </Label>
                <Label size="xs" color="secondary">
                  کل سفارشات
                </Label>
              </div>
              <div className="bg-bg-secondary p-4 rounded-xl border border-border-secondary text-center">
                <Label size="lg" weight="black" color="warning">
                  {orders.filter((o) => o.status === "WaitingForShipment").length}
                </Label>
                <Label size="xs" color="secondary">
                  در انتظار ارسال
                </Label>
              </div>
              <div className="bg-bg-secondary p-4 rounded-xl border border-border-secondary text-center">
                <Label size="lg" weight="black" color="success">
                  0
                </Label>
                <Label size="xs" color="secondary">
                  پیام خوانده نشده
                </Label>
              </div>
            </div>
          </div>
        );

      case "profile":
        return <ProfileEditForm initialData={userData} onSubmit={handleUpdateProfile} />;

      case "addresses":
        return (
          <AddressManager
            addresses={addresses}
            isLoading={addrLoading}
            onAddAddress={addAddress}
            onUpdateAddress={updateAddress}
            onDeleteAddress={deleteAddress}
          />
        );

      case "orders":
        return (
          <OrderList
            orders={orders}
            isLoading={ordersLoading}
            selectedStatus={orderSelectedStatus}
            onStatusChange={setOrderSelectedStatus}
            onViewDetails={(id) => alert(`مشاهده جزئیات سفارش ${id}`)}
          />
        );

      case "tickets":
        if (currentView === "chat" || currentView === "create") {
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
                isNewTicket={currentView === "create"}
                categories={categories.map((cat) => ({
                  id: cat.id,
                  name: cat.name,
                  title: cat.name,
                  icon: <HelpCircle size={20} />,
                }))}
                messages={chatMessages}
                ticketInfo={{
                  id: selectedTicketId ?? undefined,
                  subject: activeTicket?.title || "مشاهده گفتگو",
                  statusLabel:
                    activeTicket?.status === 1
                      ? "باز"
                      : activeTicket?.status === 2
                        ? "در حال بررسی"
                        : "بسته شده",
                }}
                onSendMessage={async (text, attachedFile) => {
                  if (currentView === "create") {
                    await createAndOpenNewTicket("درخواست پشتیبانی", text);
                  } else if (currentView === "chat") {
                    await sendMessageToExistingTicket(text, attachedFile);
                  }
                }}
                onSelectCategory={(chatCat) => {
                  const originalCat = categories.find((c) => c.id === chatCat.id);
                  if (originalCat) {
                    setCategory(originalCat);
                  }
                }}
                isLoading={ticketLoading}
                isLoadingCategories={isLoadingCategories}
              />
            </div>
          );
        }

        return (
          <TicketList
            tickets={formattedTickets}
            isLoading={ticketLoading}
            onViewDetails={(id) => viewTicket(id, user?.id)}
            onCreateTicket={() => openCreateView()}
          />
        );

      case "returns":
        return (
          <div className="max-w-5xl mx-auto">
            <div className="bg-surface rounded-2xl border border-border-secondary overflow-hidden">
              <div className="p-8 text-center border-b border-border-secondary">
                <RefreshCw size={64} className="mx-auto text-brand-primary mb-6 opacity-80" />
                <Label size="2xl" weight="extra-bold" className="mb-4 block">
                  درخواست‌های مرجوعی کالا
                </Label>
                <Label size="base" color="secondary" className="leading-loose block max-w-3xl mx-auto">
                  اگر کالایی که دریافت کردید مشکل دارد یا از خرید خود پشیمان شده‌اید، می‌توانید درخواست مرجوعی ثبت کنید.
                </Label>
              </div>

              <div className="flex overflow-x-auto border-b border-border-secondary bg-bg-secondary">
                {[
                  { id: 'none', label: 'همه', icon: <RefreshCw size={18} /> },
                  { id: 'New', label: 'جدید', icon: <Clock size={18} /> },
                  { id: 'Confirmed', label: 'تأیید شده', icon: <CheckCircle2 size={18} /> },
                  { id: 'SentBack', label: 'برگشتی ارسال شده', icon: <Truck size={18} /> },
                  { id: 'PaidBack', label: 'وجه برگشتی', icon: <CreditCard size={18} /> },
                  { id: 'Denied', label: 'رد شده', icon: <XCircle size={18} /> },
                ].map((tab) => {
                  const count = tab.id === 'none' 
                    ? returns.length 
                    : returns.filter(r => r.status === tab.id).length;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setReturnSelectedStatus(tab.id as any);
                        fetchReturns(tab.id === 'none' ? undefined : tab.id);
                      }}
                      className={`flex items-center gap-2 px-6 py-4 whitespace-nowrap transition ${
                        returnSelectedStatus === tab.id
                          ? 'bg-surface text-brand-primary border-b-2 border-brand-primary'
                          : 'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      {tab.icon}
                      <Label size="sm" weight={returnSelectedStatus === tab.id ? 'bold' : 'medium'}>
                        {tab.label}
                      </Label>
                      <span className="text-xs bg-bg-surface px-2 py-0.5 rounded-full ml-2">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="p-6 min-h-96">
                {returnsLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-bg-secondary rounded-xl border border-border-secondary p-5 animate-pulse">
                        <div className="flex justify-between items-start">
                          <div className="space-y-3">
                            <div className="h-6 bg-bg-surface rounded w-64"></div>
                            <div className="h-4 bg-bg-surface rounded w-48"></div>
                            <div className="h-4 bg-bg-surface rounded w-32"></div>
                          </div>
                          <div className="h-8 bg-bg-surface rounded w-24"></div>
                        </div>
                        <div className="mt-4 flex gap-3">
                          <div className="h-9 bg-bg-surface rounded w-32"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : returns.length > 0 ? (
                  <div className="space-y-4">
                    {returns.map((ret) => (
                      <div key={ret.id} className="bg-bg-secondary rounded-xl border border-border-secondary p-5 hover:shadow-md transition">
                        <div className="flex justify-between items-start">
                          <div>
                            <Label weight="bold" size="base">
                              درخواست مرجوعی #{ret.id} - سفارش #{ret.orderNumber || ret.orderId}
                            </Label>
                            <Label size="sm" color="secondary" className="block mt-1">
                              تاریخ درخواست: {new Date(ret.createdDate).toLocaleDateString('fa-IR')}
                            </Label>
                          </div>
                          <div>
                            {ret.status === 'New' && <Badge variant="warning">جدید</Badge>}
                            {ret.status === 'Confirmed' && <Badge variant="primary">تأیید شده</Badge>}
                            {ret.status === 'SentBack' && <Badge variant="warning">برگشتی ارسال شده</Badge>}
                            {ret.status === 'PaidBack' && <Badge variant="success">وجه برگشتی</Badge>}
                            {ret.status === 'Denied' && <Badge variant="error">رد شده</Badge>}
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button size="sm" variant="outline">
                            مشاهده جزئیات
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <RefreshCw size={64} className="mx-auto text-text-placeholder mb-6 opacity-50" />
                    <Label color="secondary" size="lg">
                      هیچ درخواست مرجوعی یافت نشد.
                    </Label>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-border-secondary text-center">
                <Button size="lg" variant="primary">
                  ثبت درخواست مرجوعی جدید
                </Button>
              </div>
            </div>
          </div>
        );

      case "reviews":
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
            if (tab === "tickets") goBackToList();
          }}
          onLogout={handleLogout}
          menuItems={menuItems}
          userDisplayName={user?.name || "کاربر مهمان"}
        />
      </div>
      <div className="flex-1 w-full min-w-0">{renderContent()}</div>
    </div>
  );
}