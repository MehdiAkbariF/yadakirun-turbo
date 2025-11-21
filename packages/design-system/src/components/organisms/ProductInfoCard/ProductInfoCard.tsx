"use client";
import React, { useState } from 'react';
import { Eye, Star, Minus, Plus } from 'lucide-react';
import { Label } from '../../atoms/Label/Label';
import { Button } from '../../atoms/Button/Button';
import './ProductInfoCard.scss';

export interface PackagingOption {
  id: string;
  label: string;
}

interface ProductInfoCardProps {
  price: number;
  originalPrice?: number;
  discountAmount?: number;
  seller: string;
  rating: number;
  reviewCount: number;
  views: number;
  inStock: boolean;
  guarantee: string;
  shippingInfo?: string;
  packagingOptions?: PackagingOption[];
}

export const ProductInfoCard = ({
  price,
  originalPrice,
  discountAmount,
  seller,
  rating,
  reviewCount,
  views,
  inStock,
  guarantee,
  shippingInfo,
  packagingOptions = []
}: ProductInfoCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<PackagingOption | null>(null);

  const handleQuantity = (val: number) => setQuantity(Math.max(1, quantity + val));
  const formatPrice = (p: number) => p.toLocaleString('fa-IR');

  return (
    <div className="product-info-card">
      
      {/* Header Stats */}
      <div className="product-info-card__stats">
        <div className="flex items-center gap-2 text-text-placeholder">
          <Eye size={18} />
          <Label size="sm" color="placeholder">{views.toLocaleString('fa-IR')} بازدید</Label>
        </div>
        <div className="flex items-center gap-1">
          <Star size={18} className="text-utility-warning fill-utility-warning" />
          <Label size="sm" weight="bold">{rating}</Label>
          <Label size="xs" color="placeholder">({reviewCount} نظر)</Label>
        </div>
      </div>

      {/* Info List */}
      <div className="space-y-3 mb-6">
        <Label size="sm" color="success" weight="bold">{guarantee}</Label>
        {inStock && <Label size="sm" color="secondary">{shippingInfo}</Label>}
      </div>

      {/* Packaging Options OR Quantity */}
      <div className="flex items-center justify-between mb-6">
        <Label size="sm" weight="bold" color="secondary">موارد انتخابی:</Label>
        
        {packagingOptions.length > 0 ? (
           <Label size="xs" weight="bold">
             {selectedPackage ? selectedPackage.label : 'انتخاب نشده'}
           </Label>
        ) : (
           <div className="quantity-selector">
              <button onClick={() => handleQuantity(1)}><Plus size={16}/></button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantity(-1)}><Minus size={16}/></button>
           </div>
        )}
      </div>

      {/* Seller */}
      <div className="flex justify-between text-sm mb-4">
         <Label color="placeholder">فروشنده:</Label>
         <Label color="link" weight="bold">{seller}</Label>
      </div>

      {/* Price Box */}
      <div className="product-info-card__price-box">
         {originalPrice && (
           <div className="flex justify-between text-sm text-text-placeholder mb-2">
              <Label size='sm'>قیمت اصلی:</Label>
              <Label size='sm'>{formatPrice(originalPrice)}</Label>
           </div>
         )}
         {discountAmount && (
           <div className="flex justify-between text-sm text-utility-success mb-4">
              <span className="font-bold">سود شما:</span>
              <span className="font-bold">{formatPrice(discountAmount)}</span>
           </div>
         )}
         <div className="flex justify-between items-center pt-4 border-t border-border-secondary">
            <Label weight="bold">قیمت نهایی:</Label>
            <div className="text-left">
               <Label size="xl" weight="extra-bold" color="brand-accent">{formatPrice(price)}</Label>
            </div>
         </div>
      </div>

      {/* Action Button */}
      <Button 
        fullWidth 
        size="lg" 
        disabled={!inStock}
        variant={inStock ? 'primary' : 'secondary'} // در دیزاین سیستم اگر variant اکسنت ندارید، primary
        className="mt-4 shadow-lg"
      >
        {inStock ? 'افزودن به سبد خرید' : 'ناموجود'}
      </Button>
    </div>
  );
};