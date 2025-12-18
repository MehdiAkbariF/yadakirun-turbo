"use client";

import React, { useEffect, useMemo, useState } from "react";

// ❌ تمام ایمپورت‌های مربوط به store حذف شدند

import { SimpleProductCard } from '../../atoms/SimpleProductCard/SimpleProductCard';
import { ProductGridProps } from './ProductGrid.types';
import { Label } from "../../atoms/Label/Label";
import './ProductGrid.scss';

// ✅ این کامپوننت حالا کاملاً "Dumb" است و هیچ اطلاعی از store ندارد
export const ProductGrid = ({ products = [], pageSize = 20 }: ProductGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // ❌ اتصال به store ها حذف شد

  const totalPages = Math.max(1, Math.ceil(products.length / pageSize));
  
  useEffect(() => {
    setCurrentPage(1);
  }, [products.length, pageSize]);

  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return products.slice(startIndex, startIndex + pageSize);
  }, [currentPage, products, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const gridElement = document.getElementById('product-grid-anchor');
    if (gridElement) {
      gridElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // ❌ تابع handleAddToCart حذف شد چون منطق آن باید در اپلیکیشن اصلی باشد

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
      <div className="product-grid-container">
        {currentProducts.map(p => (
          <div key={p.id} className="product-grid-item">
            {/* 
              ✅ onAddToCart حالا از خود آبجکت p خوانده می‌شود.
              مسئولیت پاس دادن این تابع به عهده کامپوننت والد (در اپلیکیشن اصلی) است.
            */}
            <SimpleProductCard 
              {...p}
              onAddToCart={p.onAddToCart} 
            />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pg-pagination-wrapper">
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
        </div>
      )}
    </div>
  );
};