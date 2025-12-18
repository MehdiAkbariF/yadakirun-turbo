"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { MapPin, Plus, Trash2, Edit2, Loader2, CheckCircle } from 'lucide-react';
import { Label } from '../../atoms/Label/Label';
import { Button } from '../../atoms/Button/Button';
import { Modal } from '../Modal/Modal';
import { Input } from '../../atoms/Input/Input';
import { Location } from '../MapSelector/MapSelector.types';
import { mapService } from '@monorepo/api-client/src/services/mapService';
import './AddressManager.scss';

// --- تایپ‌ها ---

export interface AddressItem {
  id: number | string;
  title: string;
  fullAddress: string;
  postalCode: string;
  location?: Location;
  city?: string;
  plaque?: string;
  unit?: string;
  floor?: string;
  isDefault?: boolean;
  isUserReciever?: boolean;
  receiverName?: string;
  receiverLastName?: string;
  receiverMobile?: string;
}

export type AddressFormData = {
  id?: number | string;
  title: string;
  fullAddress: string;
  postalCode: string;
  location: Location;
  city: string;
  plaque: string;
  unit: string;
  floor: string;
  isDefault: boolean;
  isUserReciever: boolean;
  receiverName: string;
  receiverLastName: string;
  receiverMobile: string;
};

// پراپ‌های کامپوننت با قابلیت‌های جدید
interface AddressManagerProps {
  addresses: AddressItem[];
  isLoading: boolean;
  onAddAddress: (addr: Omit<AddressFormData, 'id'>) => Promise<void>;
  onUpdateAddress: (addr: AddressFormData) => Promise<void>;
  onDeleteAddress: (id: number | string) => Promise<void>;
  
  // پراپ‌های جدید برای انعطاف‌پذیری
  variant?: 'management' | 'selection';
  title?: string;
  selectedId?: number | string | null;
  onSelectAddress?: (id: number | string) => void;
}

const MapSelector = dynamic(
  () => import('../MapSelector/MapSelector').then((mod) => mod.MapSelector),
  { 
    ssr: false, 
    loading: () => <div className="h-[250px] w-full bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-gray-400">در حال بارگذاری نقشه...</div>
  }
);

const INITIAL_FORM_STATE: AddressFormData = {
  title: '', fullAddress: '', postalCode: '', location: { lat: 35.6892, lng: 51.3890 },
  city: 'تهران', plaque: '', unit: '', floor: '', isDefault: false, isUserReciever: true,
  receiverName: '', receiverLastName: '', receiverMobile: '',
};

export const AddressManager = ({ 
  addresses, 
  isLoading, 
  onAddAddress, 
  onUpdateAddress, 
  onDeleteAddress,
  variant = 'management',
  title = 'مدیریت آدرس‌ها',
  selectedId,
  onSelectAddress
}: AddressManagerProps) => {
  const [modalMode, setModalMode] = useState<'add' | 'edit' | null>(null);
  const [formData, setFormData] = useState<AddressFormData>(INITIAL_FORM_STATE);
  const [deleteId, setDeleteId] = useState<number | string | null>(null);
  const [isGettingAddressFromMap, setIsGettingAddressFromMap] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (modalMode === null) {
      setFormData(INITIAL_FORM_STATE);
    }
  }, [modalMode]);

  const openAddModal = () => {
    setFormData(INITIAL_FORM_STATE);
    setModalMode('add');
  };

  const openEditModal = (addressToEdit: AddressItem) => {
    setFormData({
      id: addressToEdit.id,
      title: addressToEdit.title,
      fullAddress: addressToEdit.fullAddress,
      postalCode: addressToEdit.postalCode,
      location: addressToEdit.location || INITIAL_FORM_STATE.location,
      city: addressToEdit.city || 'تهران',
      plaque: addressToEdit.plaque || '',
      unit: addressToEdit.unit || '',
      floor: addressToEdit.floor || '',
      isDefault: addressToEdit.isDefault || false,
      isUserReciever: addressToEdit.isUserReciever ?? true,
      receiverName: addressToEdit.receiverName || '',
      receiverLastName: addressToEdit.receiverLastName || '',
      receiverMobile: addressToEdit.receiverMobile || '',
    });
    setModalMode('edit');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleLocationChange = async (loc: Location) => {
    setFormData(prev => ({ ...prev, location: loc }));
    setIsGettingAddressFromMap(true);
    try {
      const addressText = await mapService.getAddressFromCoordinates(loc.lat, loc.lng);
      if (addressText) {
        setFormData(prev => ({ ...prev, fullAddress: addressText }));
      }
    } catch (error) {
      console.error("Failed to get address", error);
    } finally {
      setIsGettingAddressFromMap(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (modalMode === 'add') {
        await onAddAddress(formData);
      } else if (modalMode === 'edit') {
        await onUpdateAddress(formData);
      }
      setModalMode(null);
    } catch (error) {
      alert('خطا در پردازش درخواست.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteId === null) return;
    setIsDeleting(true);
    try {
      await onDeleteAddress(deleteId);
    } catch (error) {
      alert('خطا در حذف آدرس.');
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  return (
    <div className={`address-manager address-manager--${variant}`}>
      <div className="address-manager__header">
        <div className="flex items-center gap-3">
          <MapPin className="text-brand-primary" size={28} />
          <Label size="xl" weight="bold">{title}</Label>
        </div>
        <Button size="md" leftIcon={<Plus size={18} />} onClick={openAddModal}>
          افزودن آدرس
        </Button>
      </div>

      {isLoading && addresses.length === 0 && (
        <div className="address-manager__empty">
          <Loader2 className="animate-spin text-brand-primary" size={24} />
          <Label color="secondary">در حال بارگذاری آدرس‌ها...</Label>
        </div>
      )}

      <div className="address-manager__list">
        {!isLoading && addresses.length === 0 ? (
          <div className="address-manager__empty">
            <Label color="secondary">هنوز آدرسی ثبت نکرده‌اید.</Label>
          </div>
        ) : (
          addresses.map((addr) => {
            const isSelected = variant === 'selection' && selectedId === addr.id;
            return (
              <div 
                key={addr.id} 
                className={`address-card ${isSelected ? 'address-card--selected' : ''}`}
                onClick={variant === 'selection' ? () => onSelectAddress?.(addr.id) : undefined}
              >
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

                {variant === 'management' ? (
                  <div className="address-card__actions">
                    <button className="address-card__btn address-card__btn--edit" onClick={(e) => { e.stopPropagation(); openEditModal(addr); }}>
                      <Edit2 size={18} />
                    </button>
                    <button className="address-card__btn address-card__btn--delete" onClick={(e) => { e.stopPropagation(); setDeleteId(addr.id); }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                ) : (
                  isSelected && (
                    <div className="address-card__selection-indicator">
                      <CheckCircle size={24} className="text-brand-primary" />
                    </div>
                  )
                )}
              </div>
            );
          })
        )}
      </div>

      <Modal isOpen={!!modalMode} onClose={() => setModalMode(null)} title={modalMode === 'add' ? 'ثبت آدرس جدید' : 'ویرایش آدرس'} size="lg">
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="mb-4">
            <Label size="sm" weight="semi-bold" className="mb-2 block">
              موقعیت مکانی
              {isGettingAddressFromMap && <span className="text-xs text-brand-primary mr-2">(در حال دریافت آدرس...)</span>}
            </Label>
            {!!modalMode && (
              <MapSelector 
                key={`map-${modalMode}-mode`} 
                height="250px" 
                defaultLocation={formData.location} 
                onLocationChange={handleLocationChange} 
                className="border border-border-secondary rounded-xl" 
              />
            )}
            <div className="mt-2 text-left" dir="ltr">
              <Label size="xs" color="placeholder">{formData.location.lat.toFixed(6)}, {formData.location.lng.toFixed(6)}</Label>
            </div>
          </div>

          <Input id="title" name="title" label="عنوان آدرس (مثال: خانه، محل کار)" value={formData.title} onChange={handleInputChange} required />
          <div className="relative">
            <Input id="fullAddress" name="fullAddress" label="نشانی کامل" value={formData.fullAddress} onChange={handleInputChange} required disabled={isGettingAddressFromMap} />
            {isGettingAddressFromMap && <div className="absolute left-3 top-9 text-brand-primary animate-spin"><Loader2 size={20} /></div>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input id="city" name="city" label="شهر" value={formData.city} onChange={handleInputChange} required />
            <Input id="postalCode" name="postalCode" label="کد پستی" value={formData.postalCode} onChange={handleInputChange} dir="ltr" required />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Input id="plaque" name="plaque" label="پلاک" type="number" value={formData.plaque} onChange={handleInputChange} required />
            <Input id="unit" name="unit" label="واحد" type="number" value={formData.unit} onChange={handleInputChange} />
            <Input id="floor" name="floor" label="طبقه" type="number" value={formData.floor} onChange={handleInputChange} />
          </div>
          <div className="pt-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" name="isUserReciever" checked={formData.isUserReciever} onChange={handleInputChange} className="w-5 h-5 accent-brand-primary" />
              <Label size="sm" weight="medium">گیرنده خودم هستم</Label>
            </label>
          </div>
          {!formData.isUserReciever && (
            <div className="border border-border-secondary rounded-lg p-4 space-y-4 transition-all duration-300 animate-fade-in">
              <Label weight="bold">اطلاعات گیرنده</Label>
              <div className="grid grid-cols-2 gap-4">
                <Input id="receiverName" name="receiverName" label="نام گیرنده" value={formData.receiverName} onChange={handleInputChange} required={!formData.isUserReciever} />
                <Input id="receiverLastName" name="receiverLastName" label="نام خانوادگی گیرنده" value={formData.receiverLastName} onChange={handleInputChange} required={!formData.isUserReciever} />
              </div>
              <Input id="receiverMobile" name="receiverMobile" label="موبایل گیرنده" value={formData.receiverMobile} onChange={handleInputChange} dir="ltr" required={!formData.isUserReciever} />
            </div>
          )}
          <div className="pt-4">
            <Button type="submit" fullWidth isLoading={isSubmitting}>
              {isSubmitting ? 'در حال پردازش...' : (modalMode === 'add' ? 'ثبت آدرس' : 'ذخیره تغییرات')}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="حذف آدرس" footer={
          <>
            <Button variant="secondary" onClick={() => setDeleteId(null)}>انصراف</Button>
            <Button variant="danger" onClick={handleDeleteConfirm} isLoading={isDeleting}>
              {isDeleting ? 'در حال حذف...' : 'بله، حذف کن'}
            </Button>
          </>
        }>
        <Label>آیا از حذف این آدرس اطمینان دارید؟</Label>
      </Modal>
    </div>
  );
};