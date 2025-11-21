import React from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import './Pagination.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string; // مثلا "/blog"
}

export const Pagination = ({ currentPage, totalPages, baseUrl }: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // تابع کمکی برای ساخت لینک
  const getPageUrl = (page: number) => `${baseUrl}?page=${page}`;

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <Link href={getPageUrl(currentPage - 1)} className="pagination__btn">
          <ChevronRight size={20} />
        </Link>
      )}
      
      {pages.map(page => (
        <Link 
          key={page} 
          href={getPageUrl(page)} 
          className={`pagination__item ${currentPage === page ? 'pagination__item--active' : ''}`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link href={getPageUrl(currentPage + 1)} className="pagination__btn">
          <ChevronLeft size={20} />
        </Link>
      )}
    </div>
  );
};