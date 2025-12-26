"use client";

import React from 'react';
import { ShoppingBag, Clock, Truck, CheckCircle2, XCircle, RefreshCcw } from 'lucide-react';
import { Label } from '../../atoms/Label/Label';
import { Badge } from '../../atoms/Badge/Badge';
import './OrderList.scss';
import { BadgeVariant } from '../../atoms/Badge/Badge.types';

type OrderStatus = 
  'WaitingForPayment' | 
  'WaitingForShipment' | 
  'Sent' | 
  'Delivered' | 
  'ReturnRequestInProgress' | 
  'PartialReturned' | 
  'FullyReturned' | 
  'UserCancelled' | 
  'AdminCancelled' | 
  'SystemCancelled';

interface StatusConfig {
  label: string;
  icon: React.ReactNode;
  badgeVariant: BadgeVariant;
}

const statusMap: Partial<Record<OrderStatus, StatusConfig>> = {
  WaitingForPayment: { label: 'در انتظار پرداخت', icon: <Clock size={18} />, badgeVariant: 'warning' },
  WaitingForShipment: { label: 'در انتظار ارسال', icon: <Clock size={18} />, badgeVariant: 'warning' },
  Sent: { label: 'ارسال شده', icon: <Truck size={18} />, badgeVariant: 'primary' },
  Delivered: { label: 'تحویل شده', icon: <CheckCircle2 size={18} />, badgeVariant: 'success' },
  ReturnRequestInProgress: { label: 'درخواست مرجوعی در حال بررسی', icon: <RefreshCcw size={18} />, badgeVariant: 'secondary' },
  PartialReturned: { label: 'مرجوعی جزئی', icon: <RefreshCcw size={18} />, badgeVariant: 'secondary' },
  FullyReturned: { label: 'مرجوعی کامل', icon: <RefreshCcw size={18} />, badgeVariant: 'secondary' },
  UserCancelled: { label: 'لغو شده توسط کاربر', icon: <XCircle size={18} />, badgeVariant: 'error' },
  AdminCancelled: { label: 'لغو شده توسط ادمین', icon: <XCircle size={18} />, badgeVariant: 'error' },
  SystemCancelled: { label: 'لغو شده توسط سیستم', icon: <XCircle size={18} />, badgeVariant: 'error' },
};

// fallback برای وضعیت‌های ناشناخته
const fallbackConfig: StatusConfig = {
  label: 'نامشخص',
  icon: <Clock size={18} />,
  badgeVariant: 'secondary'
};

export interface OrderItem {
  id: number | string;
  orderNumber: string;
  createdDate: string;
  totalPrice: string;
  status: string; // string چون ممکنه وضعیت جدید بیاد
}

interface OrderListProps {
  orders: OrderItem[];
  isLoading?: boolean;
  selectedStatus?: 'all' | string;
  onStatusChange?: (status: 'all' | string) => void;
  onViewDetails?: (orderId: number | string) => void;
}

export const OrderList = ({ 
  orders, 
  isLoading = false,
  selectedStatus = 'all',
  onStatusChange,
  onViewDetails 
}: OrderListProps) => {
  const [activeFilter, setActiveFilter] = React.useState<'all' | string>(selectedStatus);

  const handleTabClick = (status: 'all' | string) => {
    setActiveFilter(status);
    onStatusChange?.(status);
  };

  const filteredOrders = activeFilter === 'all' 
    ? orders 
    : orders.filter(o => o.status === activeFilter);

  const allStatuses: ('all' | string)[] = ['all', ...new Set(orders.map(o => o.status))];

  const getStatusConfig = (status: string): StatusConfig => {
    return (statusMap as Record<string, StatusConfig>)[status] || fallbackConfig;
  };

  return (
    <div className="order-list">
      <div className="order-list__header">
        <ShoppingBag className="order-list__icon" size={24} />
        <Label size="xl" weight="bold">سفارشات من</Label>
      </div>

      {/* Tabs */}
      <div className="order-list__tabs">
        {allStatuses.map((status) => {
          const count = status === 'all' 
            ? orders.length 
            : orders.filter(o => o.status === status).length;

          const config = status === 'all' 
            ? { label: 'همه', icon: <ShoppingBag size={18} />, badgeVariant: 'default' as BadgeVariant }
            : getStatusConfig(status);

          return (
            <button
              key={status}
              onClick={() => handleTabClick(status)}
              className={`order-list__tab ${activeFilter === status ? 'order-list__tab--active' : ''}`}
            >
              <span className="order-list__tab-icon">{config.icon}</span>
              <Label className="order-list__tab-label">{config.label}</Label>
              <span className="order-list__tab-count">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="order-list__content">
        {isLoading ? (
          <div className="order-list__grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="order-card animate-pulse">
                <div className="order-card__top">
                  <div className="order-card__info">
                    <div className="h-6 bg-bg-surface rounded w-48 mb-2"></div>
                    <div className="h-4 bg-bg-surface rounded w-32"></div>
                  </div>
                  <div className="h-8 bg-bg-surface rounded w-28"></div>
                </div>
                <div className="order-card__bottom">
                  <div className="order-card__price">
                    <div className="h-4 bg-bg-surface rounded w-24"></div>
                    <div className="h-5 bg-bg-surface rounded w-32 mt-1"></div>
                  </div>
                  <div className="h-8 bg-bg-surface rounded w-32"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="order-list__grid">
            {filteredOrders.map((order) => {
              const config = getStatusConfig(order.status);

              return (
                <div key={order.id} className="order-card">
                  <div className="order-card__top">
                    <div className="order-card__info">
                      <Label weight="bold">سفارش #{order.orderNumber}</Label>
                      <Label size="xs" color="secondary">
                        {new Date(order.createdDate).toLocaleDateString('fa-IR')}
                      </Label>
                    </div>
                    <Badge variant={config.badgeVariant}>
                      {config.label}
                    </Badge>
                  </div>
                  
                  <div className="order-card__bottom">
                    <div className="order-card__price">
                      <Label size="sm" color="secondary">مبلغ کل:</Label>
                      <Label size="sm" weight="bold">{order.totalPrice}</Label>
                    </div>
                    <button 
                      className="order-card__link"
                      onClick={() => onViewDetails?.(order.id)}
                    >
                      مشاهده جزئیات
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="order-list__empty">
            <ShoppingBag size={64} className="text-text-placeholder mb-6 opacity-50" />
            <Label color="secondary">سفارشی در این وضعیت یافت نشد.</Label>
          </div>
        )}
      </div>
    </div>
  );
};