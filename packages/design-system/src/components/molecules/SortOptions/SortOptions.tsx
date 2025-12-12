import React from 'react';
import { SortDesc } from 'lucide-react';
import { Label } from '../../atoms/Label/Label';
import { Button } from '../../atoms/Button/Button';
import './SortOptions.scss';

export type SortType = 'relevant' | 'newest' | 'bestselling' | 'cheapest' | 'expensive';

interface SortOptionsProps {
  activeSort: SortType;
  onSortChange: (sort: SortType) => void;
}

const sortItems: { id: SortType; label: string }[] = [
  { id: 'relevant', label: 'مرتبط‌ترین' },
  { id: 'newest', label: 'جدیدترین' },
  { id: 'bestselling', label: 'پرفروش‌ترین' },
  { id: 'cheapest', label: 'ارزان‌ترین' },
  { id: 'expensive', label: 'گران‌ترین' },
];

export const SortOptions = ({ activeSort, onSortChange }: SortOptionsProps) => {
  return (
    <div className="sort-options">
      {/* این بخش ثابت می‌ماند */}
      <div className="sort-options__label">
        <SortDesc size={16} className="text-text-secondary" />
        <Label size="xs" weight="bold" color="secondary" className="whitespace-nowrap">
          مرتب‌سازی:
        </Label>
      </div>

      {/* این بخش اسکرول می‌شود */}
      <div className="sort-options__list custom-scrollbar-hidden">
        {sortItems.map((item) => (
          <Button
            key={item.id}
            size="sm" // سایز دکمه را کوچک کردیم
            variant="ghost" // واریانت گوست برای ظاهر مینیمال
            className={`sort-btn ${activeSort === item.id ? 'sort-btn--active' : ''}`}
            onClick={() => onSortChange(item.id)}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
};