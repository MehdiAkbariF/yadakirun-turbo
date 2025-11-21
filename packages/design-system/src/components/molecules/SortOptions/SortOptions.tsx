import React from 'react';
import { SortDesc } from 'lucide-react';
import { Label } from '../../atoms/Label/Label';
import './SortOptions.scss';
import { Button } from '../../atoms/Button/Button';

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
      <div className="sort-options__label">
        <SortDesc size={20} />
        <Label size="sm" weight="bold">مرتب‌سازی:</Label>
      </div>
      <div className="sort-options__list">
        {sortItems.map((item) => (
          <Button
            key={item.id}
            className={`sort-btn ${activeSort === item.id ? 'sort-btn--active' : ''}`}
            onClick={() => onSortChange(item.id)}
            variant='danger'
          >
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
};