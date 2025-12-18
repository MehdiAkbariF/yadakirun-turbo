"use client";
import React from 'react'; // useState دیگر لازم نیست
import { Eye, Star, Minus, Plus } from 'lucide-react';
import { Label } from '../../atoms/Label/Label';
import { Button } from '../../atoms/Button/Button';
import './ProductInfoCard.scss';

// اینترفیس‌ها باید در بالای فایل باشند
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
  
  // ✅ پراپ‌های جدید برای کنترل کامل از بیرون
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  selectedPackageLabel?: string;
  onAddToCart: () => void;
  isAddingToCart: boolean; // برای نمایش وضعیت لودینگ
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
  
  // ✅ دریافت مقادیر و توابع از props
  quantity,
  onQuantityChange,
  selectedPackageLabel,
  onAddToCart,
  isAddingToCart,
}: ProductInfoCardProps) => {

  // ✅ تابع هندلر حالا تابع دریافتی از props را فراخوانی می‌کند
  const handleQuantity = (val: number) => {
    const newQuantity = Math.max(1, quantity + val);
    onQuantityChange(newQuantity);
  };
  
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
          <Label size="xs" color="placeholder">({reviewCount.toLocaleString('fa-IR')} نظر)</Label>
        </div>
      </div>

      {/* Info List */}
      <div className="space-y-3 mb-6">
        <Label size="sm" color="success" weight="bold">{guarantee}</Label>
        {inStock && <Label size="sm" color="secondary">{shippingInfo}</Label>}
      </div>

      {/* Quantity OR Packaging */}
      <div className="flex items-center justify-between mb-6">
        <Label size="sm" weight="bold" color="secondary">
          {/* ✅ اگر لیبل بسته بندی وجود داشت، آن را نمایش بده، در غیر این صورت "تعداد" */}
          {selectedPackageLabel ? "بسته‌بندی:" : "تعداد:"}
        </Label>
        
        {selectedPackageLabel ? (
           <Label size="xs" weight="bold">
             {selectedPackageLabel}
           </Label>
        ) : (
           <div className="quantity-selector">
              {/* ✅ اتصال به تابع handleQuantity */}
              <button onClick={() => handleQuantity(1)}><Plus size={16}/></button>
              {/* ✅ نمایش quantity دریافتی از props */}
              <Label>{quantity.toLocaleString('fa-IR')}</Label>
              <button onClick={() => handleQuantity(-1)}><Minus size={16}/></button>
           </div>
        )}
      </div>

      {/* Seller */}
      <div className="flex justify-between text-sm mb-4">
         <Label color="secondary" weight='semi-bold' size='sm'>فروشنده:</Label>
         <Label color="link" weight="bold" size='sm'>{seller}</Label>
      </div>

      {/* Price Box */}
      <div className="product-info-card__price-box">
         {originalPrice && (
           <div className="flex justify-between text-sm text-text-placeholder mb-2">
              <Label color='secondary' weight='bold' size='sm'>قیمت اصلی:</Label>
              <Label color='primary' weight='bold' >{formatPrice(originalPrice)}</Label>
           </div>
         )}
         {discountAmount && discountAmount > 0 && (
           <div className="flex justify-between text-sm text-utility-success mb-4">
              <Label color='secondary' weight='bold' size='sm'>سود شما:</Label>
              <Label color='success' weight='bold' >{formatPrice(discountAmount)}</Label>
           </div>
         )}
         <div className="flex justify-between items-center pt-4 border-t border-border-secondary mt-4">
            <Label weight="semi-bold" size='base'>قیمت نهایی:</Label>
            <div className="text-left">
               {/* ✅ قیمت نهایی باید در تعداد ضرب شود */}
               <Label size="lg" weight="extra-bold" color="brand-accent">{formatPrice(price * quantity)}</Label>
            </div>
         </div>
      </div>

      {/* Action Button */}
      <Button 
        fullWidth 
        size="sm" // سایز بزرگتر برای اهمیت بیشتر
        disabled={!inStock || isAddingToCart}
        variant={inStock ? 'primary' : 'secondary'}
        className="mt-6"
        onClick={onAddToCart} // ✅ اتصال به تابع onAddToCart از props
        isLoading={isAddingToCart} // ✅ اتصال به isAddingToCart از props
      >
        {inStock ? 'افزودن به سبد خرید' : 'ناموجود'}
      </Button>
    </div>
  );
};