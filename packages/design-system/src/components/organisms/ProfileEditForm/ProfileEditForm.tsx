"use client";
import React, { useState } from 'react';
import { User } from 'lucide-react';
import { Input } from '../../atoms/Input/Input';
import { Button } from '../../atoms/Button/Button';
import { Label } from '../../atoms/Label/Label';
import './ProfileEditForm.scss';

export interface UserProfileData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
}

interface ProfileEditFormProps {
  initialData: UserProfileData;
  onSubmit: (data: UserProfileData) => void;
}

export const ProfileEditForm = ({ initialData, onSubmit }: ProfileEditFormProps) => {
  const [formData, setFormData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await onSubmit(formData);
    setIsLoading(false);
  };

  return (
    <div className="profile-edit-form">
      <div className="profile-edit-form__header">
        <div className="profile-edit-form__icon-wrapper">
           <User size={24} />
        </div>
        <Label size="xl" weight="bold">مشخصات فردی</Label>
      </div>

      <form onSubmit={handleSubmit} className="profile-edit-form__body">
        <div className="profile-edit-form__row">
          <div className="profile-edit-form__col">
            <Input 
              id="firstName"
              label="نام"
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              containerClassName="profile-edit-form__input"
            />
          </div>
          <div className="profile-edit-form__col">
            <Input 
              id="lastName"
              label="نام خانوادگی"
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              containerClassName="profile-edit-form__input"
            />
          </div>
        </div>

        <div className="profile-edit-form__row">
           <Input 
            id="phoneNumber"
            label="شماره موبایل"
            value={formData.phoneNumber}
            disabled
            dir="ltr"
            className="profile-edit-form__input--ltr"
          />
        </div>

        <div className="profile-edit-form__row">
           <Input 
            id="email"
            label="ایمیل (اختیاری)"
            value={formData.email || ''}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            dir="ltr"
            className="profile-edit-form__input--ltr"
          />
        </div>

        <div className="profile-edit-form__footer">
          <Button 
            type="submit" 
            size="lg" 
            isLoading={isLoading} 
            className="profile-edit-form__submit-btn"
          >
            ذخیره تغییرات
          </Button>
        </div>
      </form>
    </div>
  );
};