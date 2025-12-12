// مسیر: packages/design-system/src/components/organisms/TicketList/TicketList.types.ts
import { ReactNode } from 'react';

export type TicketStatus = 'open' | 'pending' | 'closed' | 'canceled';

export interface TicketItem {
  id: number | string;
  ticketNumber: string;
  date: string;
  subject: string;
  status: TicketStatus;
}

export interface TicketListProps {
  tickets?: TicketItem[]; // برای موک یا داده اولیه
  onViewDetails?: (ticketId: number | string) => void;
}