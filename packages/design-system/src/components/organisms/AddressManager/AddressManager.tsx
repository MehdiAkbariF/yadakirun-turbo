"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { MapPin, Plus, Trash2, Edit2, Loader2 } from 'lucide-react'; // Loader2 اضافه شد
import { Label } from '../../atoms/Label/Label';
import { Button } from '../../atoms/Button/Button';
import { Modal } from '../Modal/Modal';
import { Input } from '../../atoms/Input/Input';
import { Location } from '../MapSelector/MapSelector.types';
import { mapService } from '@monorepo/api-client/src/services/mapService'; // ✅ ایمپورت سرویس
import './AddressManager.scss';

// تعریف داینامیک نقشه
const MapSelector = dynamic(
  () => import('../MapSelector/MapSelector').then((mod) => mod.MapSelector),
  { 
    ssr: false, 
    loading: () => (
      <div className="h-[250px] w-full bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-gray-400">
        در حال بارگذاری نقشه...
      </div>
    )
  }
);

export interface AddressItem {
  id: number | string;
  title: string;
  fullAddress: string;
  postalCode: string;
  location?: Location;
}

interface AddressManagerProps {
  addresses: AddressItem[];
  onAddAddress: (addr: Omit<AddressItem, 'id'>) => void;
  onDeleteAddress: (id: number | string) => void;
}

export const AddressManager = ({ addresses, onAddAddress, onDeleteAddress }: AddressManagerProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | string | null>(null);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false); // ✅ استیت لودینگ آدرس
  
  const [newAddress, setNewAddress] = useState<{
    title: string;
    fullAddress: string;
    postalCode: string;
    location: Location;
  }>({
    title: '',
    fullAddress: '',
    postalCode: '',
    location: { lat: 35.6892, lng: 51.3890 }
  });

  // ✅ هندلر هوشمند تغییر لوکیشن
  const handleLocationChange = async (loc: Location) => {
    // 1. آپدیت فوری مختصات در استیت
    setNewAddress(prev => ({ ...prev, location: loc }));
    
    // 2. دریافت آدرس متنی از سرور
    setIsLoadingAddress(true);
    try {
      const addressText = await mapService.getAddressFromCoordinates(loc.lat, loc.lng);
      if (addressText) {
        setNewAddress(prev => ({ 
          ...prev, 
          fullAddress: addressText 
        }));
      }
    } catch (error) {
      console.error("Failed to get address", error);
    } finally {
      setIsLoadingAddress(false);
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddAddress(newAddress);
    setIsAddModalOpen(false);
    setNewAddress({ 
      title: '', 
      fullAddress: '', 
      postalCode: '', 
      location: { lat: 35.6892, lng: 51.3890 } 
    });
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      onDeleteAddress(deleteId);
      setDeleteId(null);
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
                <div className="flex justify-between items-start">
                    <Label weight="bold" className="mb-2">{addr.title}</Label>
                    {addr.location && (
                        <Label size="xs" color="placeholder" className="bg-bg-secondary px-2 py-1 rounded-md">
                            موقعیت ثبت شده
                        </Label>
                    )}
                </div>
                <Label size="sm" color="secondary" className="mb-1 leading-relaxed">{addr.fullAddress}</Label>
                <Label size="xs" color="placeholder">کد پستی: {addr.postalCode}</Label>
              </div>
              <div className="address-card__actions">
                <button className="address-card__btn address-card__btn--edit">
                  <Edit2 size={18} />
                </button>
                <button 
                  className="address-card__btn address-card__btn--delete"
                  onClick={() => setDeleteId(addr.id)}
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

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="ثبت آدرس جدید"
      >
        <form id="address-form" onSubmit={handleAddSubmit} className="space-y-4">
            <div className="mb-4">
                <Label size="sm" weight="semi-bold" className="mb-2 block">
                  موقعیت مکانی
                  {isLoadingAddress && <span className="text-xs text-brand-primary mr-2">(در حال دریافت آدرس...)</span>}
                </Label>
                
                {isAddModalOpen && (
                    <MapSelector 
                        key="map-add-mode"
                        height="250px" 
                        defaultLocation={newAddress.location}
                        onLocationChange={handleLocationChange}
                        className="border border-border-secondary rounded-xl"
                    />
                )}
                
                <div className="mt-2 text-left" dir="ltr">
                    <Label size="xs" color="placeholder">
                        {newAddress.location.lat.toFixed(6)}, {newAddress.location.lng.toFixed(6)}
                    </Label>
                </div>
            </div>

            <Input 
                id="addr-title" 
                label="عنوان آدرس" 
                value={newAddress.title}
                onChange={e => setNewAddress({...newAddress, title: e.target.value})}
                required
            />
            
            {/* اینپوت آدرس با قابلیت نمایش لودینگ */}
            <div className="relative">
              <Input 
                  id="addr-full" 
                  label="نشانی کامل" 
                  value={newAddress.fullAddress}
                  onChange={e => setNewAddress({...newAddress, fullAddress: e.target.value})}
                  required
                  disabled={isLoadingAddress} // غیرفعال کردن هنگام دریافت آدرس
              />
              {isLoadingAddress && (
                <div className="absolute left-3 top-9 text-brand-primary animate-spin">
                  <Loader2 size={20} />
                </div>
              )}
            </div>

            <Input 
                id="addr-zip" 
                label="کد پستی" 
                value={newAddress.postalCode}
                onChange={e => setNewAddress({...newAddress, postalCode: e.target.value})}
                dir="ltr"
                className="text-left"
                required
            />
            <div className="pt-4">
                <Button type="submit" fullWidth>ثبت آدرس</Button>
            </div>
        </form>
      </Modal>

      <Modal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="حذف آدرس"
        footer={
          <>
            <Button variant="secondary" onClick={() => setDeleteId(null)}>انصراف</Button>
            <Button variant="danger" onClick={handleDeleteConfirm}>بله، حذف کن</Button>
          </>
        }
      >
        <Label>آیا از حذف این آدرس اطمینان دارید؟</Label>
      </Modal>
    </div>
  );
};