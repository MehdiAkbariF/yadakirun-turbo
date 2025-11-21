"use client";

import React, { useEffect, useMemo, useState } from "react";
import { SimpleProductCard } from '../../atoms/SimpleProductCard/SimpleProductCard';
import { ProductGridProps } from './ProductGrid.types';
import { Label } from "../../atoms/Label/Label";
import './ProductGrid.scss';

export const ProductGrid = ({ products = [], pageSize = 20 }: ProductGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // محاسبه تعداد کل صفحات
  const totalPages = Math.max(1, Math.ceil(products.length / pageSize));
  
  // اگر محصولات فیلتر شدند و تعداد صفحات کم شد، به صفحه اول برگرد
  useEffect(() => {
    setCurrentPage(1);
  }, [products.length, pageSize]);

  // محاسبه آیتم‌های صفحه فعلی
  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return products.slice(startIndex, startIndex + pageSize);
  }, [currentPage, products, pageSize]);

  // هندلر تغییر صفحه
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // اسکرول نرم به بالای لیست محصولات
    const gridElement = document.getElementById('product-grid-anchor');
    if (gridElement) {
      gridElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // حالت بدون محصول
  if (products.length === 0) {
    return (
      <div className="text-center py-20 px-4 bg-bg-surface rounded-xl border border-border-secondary">
        <Label size="lg" color="secondary" weight="medium">
          محصولی یافت نشد.
        </Label>
      </div>
    );
  }

  return (
    <div className="w-full" id="product-grid-anchor">
      {/* گرید محصولات چسبیده به هم */}
      <div className="product-grid-container">
        {currentProducts.map(p => (
          <div key={p.id} className="product-grid-item">
            <SimpleProductCard {...p} />
          </div>
        ))}
      </div>

      {/* صفحه‌بندی (Pagination) */}
      {totalPages > 1 && (
        <div className="pg-pagination-wrapper">
          {/* دکمه قبلی (اختیاری) */}
          {/* <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pg-pagination-btn"
          >Previous</button> */}

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`pg-pagination-btn ${
                currentPage === page ? "pg-pagination-btn--active" : ""
              }`}
            >
              {page}
            </button>
          ))}

           {/* دکمه بعدی (اختیاری) */}
           {/* <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pg-pagination-btn"
          >Next</button> */}
        </div>
      )}
    </div>
  );
};