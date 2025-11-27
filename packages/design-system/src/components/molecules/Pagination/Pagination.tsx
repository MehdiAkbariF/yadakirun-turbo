import React from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, MoreHorizontal } from 'lucide-react';
import './Pagination.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export const Pagination = ({ currentPage, totalPages, baseUrl }: PaginationProps) => {
  if (totalPages <= 1) return null;

  // تابع تولید آرایه صفحات با منطق Ellipsis (...)
  const generatePages = () => {
    const delta = 1; // تعداد صفحات کناری صفحه فعلی
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  const pages = generatePages();
  const getPageUrl = (page: number) => `${baseUrl}?page=${page}`;

  return (
    <nav className="pagination" aria-label="Pagination">
      {/* دکمه قبلی */}
      <Link 
        href={currentPage > 1 ? getPageUrl(currentPage - 1) : '#'}
        className={`pagination__arrow ${currentPage === 1 ? 'pagination__arrow--disabled' : ''}`}
        aria-disabled={currentPage === 1}
        tabIndex={currentPage === 1 ? -1 : 0}
      >
        <ChevronRight size={20} />
      </Link>

      {/* شماره صفحات */}
      <div className="pagination__list">
        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`dots-${index}`} className="pagination__dots">
                <MoreHorizontal size={20} />
              </span>
            );
          }

          const pageNumber = page as number;
          const isActive = currentPage === pageNumber;

          return (
            <Link
              key={pageNumber}
              href={getPageUrl(pageNumber)}
              className={`pagination__item ${isActive ? 'pagination__item--active' : ''}`}
            >
              {pageNumber}
            </Link>
          );
        })}
      </div>

      {/* دکمه بعدی */}
      <Link 
        href={currentPage < totalPages ? getPageUrl(currentPage + 1) : '#'}
        className={`pagination__arrow ${currentPage === totalPages ? 'pagination__arrow--disabled' : ''}`}
        aria-disabled={currentPage === totalPages}
        tabIndex={currentPage === totalPages ? -1 : 0}
      >
        <ChevronLeft size={20} />
      </Link>
    </nav>
  );
};