import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Home } from 'lucide-react';
import { Label } from '../../atoms/Label/Label';
import './Breadcrumb.scss';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol className="breadcrumb__list">
        <li className="breadcrumb__item">
          <Link href="/" className="breadcrumb__link">
            <Home size={16} />
          </Link>
          <ChevronLeft size={14} className="breadcrumb__separator" />
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="breadcrumb__item">
              {isLast ? (
                <Label size="sm" color="secondary" weight="bold" className="breadcrumb__active">
                  {item.label}
                </Label>
              ) : (
                <>
                  <Link href={item.href} className="breadcrumb__link">
                    {item.label}
                  </Link>
                  <ChevronLeft size={14} className="breadcrumb__separator" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};