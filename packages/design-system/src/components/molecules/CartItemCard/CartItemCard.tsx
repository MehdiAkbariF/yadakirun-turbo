import React from 'react';
import Image from 'next/image';
import { Plus, Minus, Trash2, ShieldCheck, Archive } from 'lucide-react';
import { Label } from '../../atoms/Label/Label';
import './CartItemCard.scss';

export interface CartItemProps {
  id: string | number;
  title: string;
  imgSrc: string;
  price: number;
  quantity: number;
  maxStock?: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export const CartItemCard = ({
  title,
  imgSrc,
  price,
  quantity,
  onIncrease,
  onDecrease,
  onRemove
}: CartItemProps) => {
  const formatPrice = (val: number) => val.toLocaleString('fa-IR');

  return (
    <div className="cart-item">
      <div className="cart-item__image-wrapper">
        <Image src={imgSrc} alt={title} fill className="cart-item__image" />
      </div>
      
      <div className="cart-item__content">
        <Label weight="bold" size="base" className="cart-item__title">{title}</Label>
        
        <div className="cart-item__meta">
          <div className="flex items-center gap-2 text-utility-success">
            <ShieldCheck size={14} />
            <Label size="xs" color="success">ضمانت اصالت کالا</Label>
          </div>
          <div className="flex items-center gap-2 text-utility-warning">
            <Archive size={14} />
            <Label size="xs" color="warning">موجود در انبار</Label>
          </div>
        </div>

        <div className="cart-item__footer">
          <div className="cart-item__price">
            <Label size="lg" weight="extra-bold">{formatPrice(price * quantity)}</Label>
            <Label size="xs">تومان</Label>
          </div>

          <div className="cart-item__controls">
            <button onClick={onIncrease} className="cart-control-btn">
              <Plus size={16} />
            </button>
            <span className="cart-quantity">{quantity.toLocaleString('fa-IR')}</span>
            <button 
              onClick={quantity === 1 ? onRemove : onDecrease} 
              className={`cart-control-btn ${quantity === 1 ? 'text-utility-error' : ''}`}
            >
              {quantity === 1 ? <Trash2 size={16} /> : <Minus size={16} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};