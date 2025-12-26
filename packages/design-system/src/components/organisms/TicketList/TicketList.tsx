"use client";
import React, { useState } from 'react';
import { HelpCircle, Clock, UserCheck, XCircle, CheckCircle2, Plus } from 'lucide-react'; 
import { Label } from '../../atoms/Label/Label';
import { Badge } from '../../atoms/Badge/Badge';
import { Button } from '../../atoms/Button/Button'; 
import './TicketList.scss';
import { BadgeVariant } from '../../atoms/Badge/Badge.types';

type TicketStatus = 'open' | 'pending' | 'closed' | 'canceled';

interface StatusConfig {
  label: string;
  icon: React.ReactNode;
  badgeVariant: BadgeVariant;
}

const statusMap: Record<TicketStatus, StatusConfig> = {
  open: { label: 'باز', icon: <Clock size={18} />, badgeVariant: 'primary' },
  pending: { label: 'در حال بررسی', icon: <UserCheck size={18} />, badgeVariant: 'warning' },
  closed: { label: 'بسته شده', icon: <CheckCircle2 size={18} />, badgeVariant: 'success' },
  canceled: { label: 'لغو شده', icon: <XCircle size={18} />, badgeVariant: 'error' },
};

export interface TicketItem {
  id: number | string;
  ticketNumber: string;
  date: string;
  subject: string;
  status: TicketStatus;
}

interface TicketListProps {
  tickets: TicketItem[];
  isLoading?: boolean;
  error?: string | null;
  onViewDetails?: (ticketId: number | string) => void;
  onCreateTicket?: () => void; 
}

export const TicketList = ({ 
  tickets, 
  isLoading = false, 
  error = null, 
  onViewDetails,
  onCreateTicket 
}: TicketListProps) => {
  const [activeFilter, setActiveFilter] = useState<TicketStatus>('open');

  const filteredTickets = tickets.filter(t => t.status === activeFilter);

  if (isLoading) return (
    <div className="flex justify-center p-10">
      <Label>در حال بارگذاری تیکت‌ها...</Label>
    </div>
  );

  return (
    <div className="ticket-list">
      <div className="ticket-list__header mb-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <HelpCircle className="ticket-list__icon" size={24} />
          <Label size="base" weight="bold">تیکت‌های من</Label>
        </div>
        
        {/* ✅ دکمه جدید ثبت تیکت */}
        <Button 
          size="sm" 
          variant="primary" 
          leftIcon={<Plus size={18} />}
          onClick={onCreateTicket}
        >
          ثبت تیکت جدید
        </Button>
      </div>

      <div className="ticket-list__tabs">
        {(Object.keys(statusMap) as TicketStatus[]).map((status) => (
          <button
            key={status}
            onClick={() => setActiveFilter(status)}
            className={`ticket-list__tab ${activeFilter === status ? 'ticket-list__tab--active' : ''}`}
          >
            <span className="ticket-list__tab-icon">{statusMap[status].icon}</span>
            <Label className="ticket-list__tab-label" size='xs'>{statusMap[status].label}</Label>
            <span className="ticket-list__tab-count">
               {tickets.filter(t => t.status === status).length}
            </span>
          </button>
        ))}
      </div>

      <div className="ticket-list__content">
        {filteredTickets.length > 0 ? (
          <div className="ticket-list__grid">
            {filteredTickets.map((ticket) => (
              <div key={ticket.id} className="ticket-card">
                <div className="ticket-card__top">
                  <div className="ticket-card__info">
                     <Label weight="bold" size='sm'>تیکت #{ticket.ticketNumber}</Label>
                     <Label size="xs" color="secondary">{ticket.date}</Label>
                  </div>
                  <Badge variant={statusMap[ticket.status].badgeVariant} >
                     {statusMap[ticket.status].label}
                  </Badge>
                </div>
               
                <div className="ticket-card__bottom">
                   <div className="ticket-card__subject">
                      <Label size="sm" color="secondary">موضوع:</Label>
                      <Label size="sm" weight="bold" className="line-clamp-1">{ticket.subject}</Label>
                   </div>
                   <button
                     className="ticket-card__link"
                     onClick={() => onViewDetails?.(ticket.id)}
                   >
                     <Label color="brand-primary" size='xs' weight='bold'>مشاهده جزئیات</Label>
                   </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="ticket-list__empty">
             <Label color="secondary">تیکتی در این وضعیت یافت نشد.</Label>
          </div>
        )}
      </div>
    </div>
  );
};