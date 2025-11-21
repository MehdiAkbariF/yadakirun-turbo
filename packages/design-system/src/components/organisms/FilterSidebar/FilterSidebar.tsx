"use client";
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Label } from '../../atoms/Label/Label';
import { Accordion } from '../../molecules/Accordion/Accordion';
import { Checkbox } from '../../atoms/Checkbox/Checkbox';
import { Switch } from '../../atoms/Switch/Switch';
import { Input } from '../../atoms/Input/Input';
import './FilterSidebar.scss';

// --- Types ---
export interface FilterState {
  inStock: boolean;
  onSale: boolean;
  brands: string[];
}

export interface FilterItem {
  id: string;
  title: string;
  subtitle?: string;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  categories: FilterItem[];
  brands: FilterItem[];
}

export const FilterSidebar = ({ 
  filters, 
  onFilterChange, 
  categories, 
  brands 
}: FilterSidebarProps) => {
  
  const [brandSearchTerm, setBrandSearchTerm] = useState("");

  const handleBrandToggle = (brandId: string) => {
    const newBrands = filters.brands.includes(brandId)
      ? filters.brands.filter(id => id !== brandId)
      : [...filters.brands, brandId];
    onFilterChange({ ...filters, brands: newBrands });
  };

  const filteredBrands = brands.filter(
    (brand) =>
      brand.title.toLowerCase().includes(brandSearchTerm.toLowerCase()) ||
      (brand.subtitle && brand.subtitle.toLowerCase().includes(brandSearchTerm.toLowerCase()))
  );

  return (
    <aside className="filter-sidebar">
      <div className="filter-sidebar__header">
        <Label weight="bold" size="lg">فیلترها</Label>
      </div>

      <div className="filter-sidebar__content">
        
        {/* --- Categories --- */}
        <Accordion title="دسته‌های محصولات" defaultOpen>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat.id} className="flex justify-between items-center p-2 hover:bg-secondary-bg rounded-lg cursor-pointer transition-colors group">
                <Label size="sm" className="group-hover:text-brand-primary transition-colors">
                  {cat.title}
                </Label>
                {cat.subtitle && (
                  <Label size="xs" color="placeholder" className="font-mono">
                    {cat.subtitle}
                  </Label>
                )}
              </li>
            ))}
          </ul>
        </Accordion>

        <div className="filter-sidebar__divider" />

        {/* --- Brands --- */}
        <Accordion title="برند" defaultOpen={false}>
          <div className="pt-2">
            <Input
              id="brand-search"
              type="text"
              value={brandSearchTerm}
              onChange={(e) => setBrandSearchTerm(e.target.value)}
              placeholder="جستجوی برند..."
              leftIcon={<Search size={18} className="text-placeholder" />}
              containerClassName="mb-3"
            />

            {/* ✅✅✅ لیست اسکرول‌خور با کلاس CSS اختصاصی ✅✅✅ */}
            <div className="custom-scrollbar space-y-1 pl-2">
              {filteredBrands.map((brand) => (
                <div 
                  key={brand.id} 
                  className="flex justify-between items-center p-2 hover:bg-secondary-bg rounded-lg transition-colors cursor-pointer"
                  onClick={() => handleBrandToggle(brand.id)}
                >
                  <Checkbox
                    label={brand.title}
                    checked={filters.brands.includes(brand.id)}
                    onChange={() => handleBrandToggle(brand.id)}
                    id={`brand-${brand.id}`}
                  />
                  {brand.subtitle && (
                    <Label size="xs" color="placeholder" className="font-mono hidden sm:block">
                      {brand.subtitle}
                    </Label>
                  )}
                </div>
              ))}
              
              {filteredBrands.length === 0 && (
                <Label size="xs" color="secondary" className="text-center py-4 block">
                  برندی یافت نشد.
                </Label>
              )}
            </div>
          </div>
        </Accordion>

        <div className="filter-sidebar__divider" />

        {/* --- Switches --- */}
        <div className="space-y-4 py-2">
          <Switch 
            label="فروش ویژه" 
            checked={filters.onSale} 
            onChange={(val) => onFilterChange({ ...filters, onSale: val })}
            id="sale-switch"
          />
          <Switch 
            label="موجود در انبار" 
            checked={filters.inStock} 
            onChange={(val) => onFilterChange({ ...filters, inStock: val })}
            id="stock-switch"
          />
        </div>

      </div>
    </aside>
  );
};