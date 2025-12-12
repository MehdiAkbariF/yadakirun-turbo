"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Phone } from 'lucide-react';

// Imports from DS
import { Label } from '@monorepo/design-system/src/components/atoms/Label/Label';
import { Input } from '@monorepo/design-system/src/components/atoms/Input/Input';
import { Button } from '@monorepo/design-system/src/components/atoms/Button/Button';
import { Alert } from '@monorepo/design-system/src/components/molecules/Alert/Alert';

export default function LoginPage() {
  const [mobile, setMobile] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // ✅ مدیریت پیشرفته ارور با آیدی برای ریست شدن تایمر
  const [errorState, setErrorState] = useState<{ message: string; id: number } | null>(null);

  const showError = (msg: string) => {
    setErrorState({ message: msg, id: Date.now() }); // آیدی جدید باعث ری-رندر کامل آلرت می‌شود
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorState(null); // پاک کردن ارور قبلی

    const mobileRegex = /^09[0-9]{9}$/;
    
    if (!mobileRegex.test(mobile)) {
      // ✅ نمایش ارور با تایمر
      showError('لطفاً یک شماره موبایل معتبر (۱۱ رقم با ۰۹) وارد کنید.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.push(`/verify?mobile=${mobile}`);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <Label size="lg" weight="bold" className="mb-2">ورود | ثبت‌نام</Label>
        <Label size="sm" color="secondary">
          لطفاً شماره موبایل خود را وارد کنید
        </Label>
      </div>

      {/* ✅ استفاده حرفه‌ای از Alert */}
      {errorState && (
        <Alert 
          key={errorState.id} // ⭐️ نکته کلیدی: تغییر این کلید باعث ریست شدن تایمر می‌شود
          variant="warning" 
          duration={3000} // ۶ ثانیه زمان
          onClose={() => setErrorState(null)}
        >
          {errorState.message}
        </Alert>
      )}

      <div>
        <Input
          id="mobile"
          type="tel"
          placeholder="مثال: 09123456789"
          value={mobile}
          onChange={(e) => {
            setMobile(e.target.value);
            if (errorState) setErrorState(null); // پاک کردن ارور هنگام تایپ
          }}
          leftIcon={<Phone size={18} className="text-placeholder" />}
          label="شماره موبایل"
          className="text-left ltr placeholder:text-right"
          dir="ltr"
          maxLength={11}
        />
      </div>

      <Button 
        type="submit" 
        fullWidth 
        size="md" 
        isLoading={isLoading}
        className="shadow-md"
      >
        دریافت کد تایید
      </Button>
    </form>
  );
}