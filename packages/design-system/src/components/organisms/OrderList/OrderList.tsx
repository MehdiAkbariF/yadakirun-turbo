"use client";
import React, { useState } from 'react';
import { ShoppingBag, CheckCircle2, Clock, Truck, XCircle, RefreshCcw } from 'lucide-react';
import { Label } from '../../atoms/Label/Label';
import { Badge } from '../../atoms/Badge/Badge';
import './OrderList.scss';
import { BadgeVariant } from '../../atoms/Badge/Badge.types';

// تعریف ساختار داده‌ای استاتوس‌ها
type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'canceled' | 'returned';

interface StatusConfig {
  label: string;
  icon: React.ReactNode;
  badgeVariant: BadgeVariant;
}

const statusMap: Record<OrderStatus, StatusConfig> = {
  processing: { label: 'در حال پردازش', icon: <Clock size={18} />, badgeVariant: 'warning' },
  shipped: { label: 'ارسال شده', icon: <Truck size={18} />, badgeVariant: 'primary' },
  delivered: { label: 'تحویل شده', icon: <CheckCircle2 size={18} />, badgeVariant: 'success' },
  canceled: { label: 'لغو شده', icon: <XCircle size={18} />, badgeVariant: 'error' },
  returned: { label: 'مرجوع شده', icon: <RefreshCcw size={18} />, badgeVariant: 'secondary' },
};

export interface OrderItem {
  id: number | string;
  orderNumber: string;
  date: string;
  totalPrice: string;
  status: OrderStatus;
}

interface OrderListProps {
  orders: OrderItem[];
  onViewDetails?: (orderId: number | string) => void;
}

export const OrderList = ({ orders, onViewDetails }: OrderListProps) => {
  const [activeFilter, setActiveFilter] = useState<OrderStatus>('processing');

  const filteredOrders = orders.filter(o => o.status === activeFilter);

  return (
    <div className="order-list">
      <div className="order-list__header">
        <ShoppingBag className="order-list__icon" size={24} />
        <Label size="xl" weight="bold">سفارشات من</Label>
      </div>

      {/* Tabs Grid */}
      <div className="order-list__tabs">
        {(Object.keys(statusMap) as OrderStatus[]).map((status) => (
          <button
            key={status}
            onClick={() => setActiveFilter(status)}
            className={`order-list__tab ${activeFilter === status ? 'order-list__tab--active' : ''}`}
          >
            <Label className="order-list__tab-icon">{statusMap[status].icon}</Label>
            <Label className="order-list__tab-label">{statusMap[status].label}</Label>
            
            {/* Badge Counter */}
            <span className="order-list__tab-count">
               {orders.filter(o => o.status === status).length}
            </span>
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="order-list__content">
        {filteredOrders.length > 0 ? (
          <div className="order-list__grid">
            {filteredOrders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-card__top">
                  <div className="order-card__info">
                     <Label weight="bold">سفارش #{order.orderNumber}</Label>
                     <Label size="xs" color="secondary">{order.date}</Label>
                  </div>
                  <Badge variant={statusMap[order.status].badgeVariant} >
                     {statusMap[order.status].label}
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
            ))}
          </div>
        ) : (
          <div className="order-list__empty">
             <Label color="secondary">سفارشی در این وضعیت یافت نشد.</Label>
          </div>
        )}
      </div>
    </div>
  );
};