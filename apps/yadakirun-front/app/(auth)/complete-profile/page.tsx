"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from 'lucide-react';

// ایمپورت‌ها را چک کن که دقیق باشند
import { Label } from '@monorepo/design-system/src/components/atoms/Label/Label';
import { Input } from '@monorepo/design-system/src/components/atoms/Input/Input';
import { Button } from '@monorepo/design-system/src/components/atoms/Button/Button';
import { Alert } from '@monorepo/design-system/src/components/molecules/Alert/Alert';
export const dynamic = 'force-dynamic';
const CompleteProfilePage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
  });

  const [errorState, setErrorState] = useState<{ message: string; id: number } | null>(null);

  const showError = (msg: string) => {
    setErrorState({ message: msg, id: Date.now() });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorState(null);

    if (!formData.firstName.trim()) {
      showError('لطفاً نام خود را وارد کنید.');
      return;
    }
    if (!formData.lastName.trim()) {
      showError('لطفاً نام خانوادگی خود را وارد کنید.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.push('/'); 
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <Label size="lg" weight="bold" className="mb-2">تکمیل ثبت نام</Label>
        <Label size="sm" color="secondary">
          فقط یک قدم تا پایان ثبت نام باقی مانده است.
        </Label>
      </div>

      {errorState && (
        <Alert 
          key={errorState.id}
          variant="warning" 
          duration={5000} 
          onClose={() => setErrorState(null)}
        >
          {errorState.message}
        </Alert>
      )}

      <div className="space-y-4">
        <Input
          id="firstName"
          type="text"
          label="نام*"
          placeholder="نام خود را وارد کنید"
          value={formData.firstName}
          onChange={(e) => {
            setFormData({ ...formData, firstName: e.target.value });
            if (errorState) setErrorState(null);
          }}
          leftIcon={<User size={18} className="text-placeholder" />}
        />

        <Input
          id="lastName"
          type="text"
          label="نام خانوادگی*"
          placeholder="نام خانوادگی خود را وارد کنید"
          value={formData.lastName}
          onChange={(e) => {
            setFormData({ ...formData, lastName: e.target.value });
            if (errorState) setErrorState(null);
          }}
          leftIcon={<User size={18} className="text-placeholder" />}
        />
      </div>

      <Button 
        type="submit" 
        fullWidth 
        size="lg" 
        isLoading={isLoading}
        className="shadow-md mt-8"
      >
        تایید و ورود
      </Button>
    </form>
  );
};

export default CompleteProfilePage;