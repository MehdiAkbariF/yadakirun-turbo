"use client";
import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Label } from '../../atoms/Label/Label';
import { Accordion } from '../../molecules/Accordion/Accordion';
import { Checkbox } from '../../atoms/Checkbox/Checkbox';
import { Switch } from '../../atoms/Switch/Switch';
import { Input } from '../../atoms/Input/Input';
import { Modal } from '../Modal/Modal';
import { Button } from '../../atoms/Button/Button';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import './FilterSidebar.scss';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const isDesktop = useMediaQuery('(min-width: 1024px)');

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
  
  const filterContent = (
    <>
      <Accordion title="دسته‌های محصولات" defaultOpen>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat.id} className="flex justify-between items-center p-2 hover:bg-bg-secondary rounded-lg cursor-pointer transition-colors group">
              <Label size="sm" className="group-hover:text-brand-primary transition-colors">{cat.title}</Label>
              {cat.subtitle && <Label size="xs" color="placeholder" className="font-mono">{cat.subtitle}</Label>}
            </li>
          ))}
        </ul>
      </Accordion>

      <div className="filter-sidebar__divider" />

      <Accordion title="برند" defaultOpen>
        <div className="pt-2">
          <Input
            id="brand-search"
            type="text"
            value={brandSearchTerm}
            onChange={(e) => setBrandSearchTerm(e.target.value)}
            placeholder="جستجوی برند..."
            leftIcon={<Search size={18} className="text-text-placeholder" />}
            containerClassName="mb-3"
          />
          <div className="custom-scrollbar space-y-1 pl-2">
            {filteredBrands.map((brand) => (
              <div 
                key={brand.id} 
                className="flex justify-between items-center p-2 hover:bg-bg-secondary rounded-lg transition-colors cursor-pointer"
                onClick={() => handleBrandToggle(brand.id)}
              >
                <Checkbox
                  label={brand.title}
                  checked={filters.brands.includes(brand.id)}
                  onChange={() => handleBrandToggle(brand.id)}
                  id={`brand-${brand.id}`}
                />
                {brand.subtitle && <Label size="xs" color="placeholder" className="font-mono hidden sm:block">{brand.subtitle}</Label>}
              </div>
            ))}
            {filteredBrands.length === 0 && <Label size="xs" color="secondary" className="text-center py-4 block">برندی یافت نشد.</Label>}
          </div>
        </div>
      </Accordion>

      <div className="filter-sidebar__divider" />

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
    </>
  );

  // --- رندر در دسکتاپ ---
  if (isDesktop) {
    return (
      <aside className="filter-sidebar">
        <div className="filter-sidebar__header">
          <Label weight="bold" size="lg">فیلترها</Label>
        </div>
        <div className="filter-sidebar__content">
          {filterContent}
        </div>
      </aside>
    );
  }

  // --- رندر در موبایل ---
  return (
    <>
      <div className="filter-sidebar__floating-btn-container">
        <Button 
          onClick={() => setIsModalOpen(true)}
          size="sm" // سایز کوچکتر برای ظرافت
          leftIcon={<SlidersHorizontal size={18} />}
          className="filter-sidebar__floating-btn"
        >
          فیلترها
        </Button>
      </div>
      
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="فیلتر کردن محصولات"
        size="md"
        footer={
          <div className="w-full flex justify-between gap-3">
             <Button variant="outline" onClick={() => onFilterChange({ inStock: false, onSale: false, brands: [] })}>
                حذف فیلترها
             </Button>
             <Button onClick={() => setIsModalOpen(false)}>
                اعمال فیلتر
             </Button>
          </div>
        }
      >
        <div className="px-2">
          {filterContent}
        </div>
      </Modal>
    </>
  );
};