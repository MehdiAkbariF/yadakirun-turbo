"use client";
import React, { useState } from 'react';
import { MapPin, Plus, Trash2, Edit2 } from 'lucide-react';
import { Label } from '../../atoms/Label/Label';
import { Button } from '../../atoms/Button/Button';
import { Modal } from '../Modal/Modal';
import { Input } from '../../atoms/Input/Input';
import './AddressManager.scss';

export interface AddressItem {
  id: number | string;
  title: string;
  fullAddress: string;
  postalCode: string;
}

interface AddressManagerProps {
  addresses: AddressItem[];
  onAddAddress: (addr: Omit<AddressItem, 'id'>) => void;
  onDeleteAddress: (id: number | string) => void;
}

export const AddressManager = ({ addresses, onAddAddress, onDeleteAddress }: AddressManagerProps) => {
  // استیت برای مودال افزودن
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // استیت برای مودال حذف (اگر null نباشد یعنی مودال باز است و مقدارش آیدی آیتم است)
  const [deleteId, setDeleteId] = useState<number | string | null>(null);
  
  const [newAddress, setNewAddress] = useState({ title: '', fullAddress: '', postalCode: '' });

  // هندلر ثبت آدرس جدید
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddAddress(newAddress);
    setIsAddModalOpen(false);
    setNewAddress({ title: '', fullAddress: '', postalCode: '' });
  };

  // هندلر تایید حذف نهایی
  const handleDeleteConfirm = () => {
    if (deleteId) {
      onDeleteAddress(deleteId);
   
    }
  };

  return (
    <div className="address-manager">
      <div className="address-manager__header">
        <div className="flex items-center gap-3">
           <MapPin className="text-brand-primary" size={28} />
           <Label size="xl" weight="bold">مدیریت آدرس‌ها</Label>
        </div>
        
        <Button 
          size="md" 
          leftIcon={<Plus size={18} />}
          onClick={() => setIsAddModalOpen(true)}
        >
          افزودن آدرس
        </Button>
      </div>

      <div className="address-manager__list">
        {addresses.length > 0 ? (
          addresses.map((addr) => (
            <div key={addr.id} className="address-card">
              <div className="address-card__content">
                <Label weight="bold" className="mb-2">{addr.title}</Label>
                <Label size="sm" color="secondary" className="mb-1 leading-relaxed">{addr.fullAddress}</Label>
                <Label size="xs" color="placeholder">کد پستی: {addr.postalCode}</Label>
              </div>
              <div className="address-card__actions">
                <button className="address-card__btn address-card__btn--edit">
                  <Edit2 size={18} />
                </button>
                <button 
                  className="address-card__btn address-card__btn--delete"
                  onClick={() => setDeleteId(addr.id)} // باز کردن مودال حذف با آیدی مشخص
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="address-manager__empty">
            <Label color="secondary">هنوز آدرسی ثبت نکرده‌اید.</Label>
          </div>
        )}
      </div>

      {/* --- Modal 1: Add Address --- */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="ثبت آدرس جدید"
      >
        <form id="address-form" onSubmit={handleAddSubmit} className="space-y-4">
          <Input 
            id="addr-title" 
            label="عنوان آدرس (مثلاً خانه)" 
            value={newAddress.title}
            onChange={e => setNewAddress({...newAddress, title: e.target.value})}
          />
          <Input 
            id="addr-full" 
            label="نشانی کامل" 
            value={newAddress.fullAddress}
            onChange={e => setNewAddress({...newAddress, fullAddress: e.target.value})}
          />
          <Input 
            id="addr-zip" 
            label="کد پستی" 
            value={newAddress.postalCode}
            onChange={e => setNewAddress({...newAddress, postalCode: e.target.value})}
            dir="ltr"
            className="text-left"
          />
          <div className="pt-4">
             <Button type="submit" fullWidth>ثبت آدرس</Button>
          </div>
        </form>
      </Modal>

      {/* --- Modal 2: Delete Confirmation --- */}
      <Modal
        isOpen={!!deleteId} // اگر deleteId مقدار داشته باشد مودال باز است
        onClose={() => setDeleteId(null)}
        title="حذف آدرس"
        footer={
          <>
            <Button 
              variant="secondary" 
              onClick={() => setDeleteId(null)}
            >
              انصراف
            </Button>
            <Button 
              variant="danger" 
              onClick={handleDeleteConfirm}
            >
              بله، حذف کن
            </Button>
          </>
        }
      >
        <Label>
          آیا از حذف این آدرس اطمینان دارید؟ این عملیات غیرقابل بازگشت است.
        </Label>
      </Modal>
    </div>
  );
};