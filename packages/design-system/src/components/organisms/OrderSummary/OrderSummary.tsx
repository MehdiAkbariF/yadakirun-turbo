import React from 'react';
import { Label } from '../../atoms/Label/Label';
import { Input } from '../../atoms/Input/Input';
import './OrderSummary.scss';
import { Button } from '../../atoms/Button/Button';

interface OrderSummaryProps {
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  onCheckout: () => void;
}

export const OrderSummary = ({ subtotal, discount, shippingCost, total, onCheckout }: OrderSummaryProps) => {
  return (
    <div className="order-summary">
      <Label size="lg" weight="bold" className="mb-4">خلاصه سفارش</Label>
      
      <div className="order-summary__rows">
        <div className="summary-row">
          <Label size="sm" color="secondary" weight='medium'>مجموع قیمت</Label>
          <Label size="sm" weight='bold' color='primary'>{subtotal.toLocaleString('fa-IR')} تومان</Label>
        </div>
        <div className="summary-row">
          <Label size="sm" color="secondary" weight='medium'>هزینه ارسال</Label>
          <Label size="sm" color="brand-primary" weight="bold">
            {shippingCost === 0 ? 'رایگان' : `${shippingCost.toLocaleString('fa-IR')} تومان`}
          </Label>
        </div>
        <div className="summary-row text-utility-error" >
          <Label size="sm" color="secondary" weight='medium'>سود شما از خرید</Label>
          <Label size="sm" color="success" weight="bold">{discount.toLocaleString('fa-IR')} تومان</Label>
        </div>
      </div>

      <div className="order-summary__total">
        <Label weight="extra-bold" size='sm'>مبلغ قابل پرداخت</Label>
        <div className="text-left">
           <Label size="base" weight="black" color="primary">{total.toLocaleString('fa-IR')}</Label>

           <Label size="xs" color="secondary" weight='bold'>تومان</Label>
        </div>
      </div>

      <div className="mt-6 mb-4">
         <div className="flex gap-2">
            <Input placeholder="کد تخفیف" containerClassName="flex-grow" id={''} />
            <button className="btn-apply">اعمال</button>
         </div>
      </div>
 <Button 
        fullWidth
        size="sm"
        onClick={onCheckout}  
        className='mb-6'>
                ثبت سفارش و پرداخت
        </Button>
     
  
 
      
      <Label size="xs" color="secondary" className="text-center  leading-relaxed" weight='semi-bold' >
        کالاهای موجود در سبد شما ثبت و رزرو نشده‌اند، برای نهایی کردن سفارش مراحل بعدی را تکمیل کنید.
      </Label>
    </div>
  );
};