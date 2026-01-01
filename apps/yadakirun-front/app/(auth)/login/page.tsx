"use client";

import React, { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';

// Imports from DS & Services
import { Label } from '@monorepo/design-system/src/components/atoms/Label/Label';
import { Button } from '@monorepo/design-system/src/components/atoms/Button/Button';
import { Input } from '@monorepo/design-system/src/components/atoms/Input/Input';
import { authService } from '@monorepo/api-client/src/services/authService'; // ✅ ایمپورت سرویس

export const dynamic = 'force-dynamic';

const LoginForm = () => {
  const router = useRouter();
  const [mobile, setMobile] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // ✅ استیت خطا

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length < 11) return;

    setIsLoading(true);
    setError(null);
    
    try {
      // ✅ فراخوانی سرویس واقعی
      await authService.login(mobile);
      // انتقال به صفحه وریفای با شماره موبایل
      router.push(`/verify?mobile=${mobile}`);
    } catch (err) {
      setError("خطا در ارسال کد. لطفا شماره را بررسی کنید یا دقایقی دیگر تلاش کنید.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <Label size="lg" weight="bold" className="mb-2">ورود | ثبت‌نام</Label>
        <Label size="sm" color="secondary">با وارد کردن شماره موبایل، کد تایید برای شما ارسال می‌شود</Label>
      </div>

      <div className="relative">
        <Input
          id="mobile"
          type="tel"
          placeholder="شماره موبایل"
          value={mobile}
          onChange={(e) => {
            setMobile(e.target.value);
            setError(null);
          }}
          inputMode="numeric"
          autoComplete="tel"
          className={`text-center tracking-[4px] font-mono ${error ? 'border-red-500' : ''}`}
          maxLength={11}
        />
        <Label htmlFor="mobile" as="label" className="sr-only">شماره موبایل</Label>
        
        {/* نمایش پیام خطا */}
        {error && (
          <Label size="xs" className="text-red-500 mt-2 block text-center">
            {error}
          </Label>
        )}
      </div>

      <Button 
        type="submit" 
        fullWidth 
        size="md" 
        isLoading={isLoading}
        disabled={mobile.length < 11}
        className="shadow-md"
      >
        دریافت کد تایید
      </Button>
    </form>
  );
};

const LoginPage = () => {
  return (
    <Suspense fallback={<div className="flex justify-center p-8">در حال بارگذاری...</div>}>
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;