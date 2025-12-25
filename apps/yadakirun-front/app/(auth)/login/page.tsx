"use client";

import React, { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';

// Imports from DS
import { Label } from '@monorepo/design-system/src/components/atoms/Label/Label';
import { Button } from '@monorepo/design-system/src/components/atoms/Button/Button';
import { Input } from '@monorepo/design-system/src/components/atoms/Input/Input';

// این خط به Next.js می‌گوید این صفحه را استاتیک نسازد
export const dynamic = 'force-dynamic';

// 1. کامپوننت داخلی که منطق اصلی و هوک‌ها را دارد
const LoginForm = () => {
  const router = useRouter();
  const [mobile, setMobile] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length < 11) return;

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      router.push(`/verify?mobile=${mobile}`);
    }, 1000);
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
          onChange={(e) => setMobile(e.target.value)}
          inputMode="numeric"
          autoComplete="tel"
          className="text-center tracking-[4px] font-mono"
          maxLength={11}
        />
        <Label htmlFor="mobile" as="label" className="sr-only">شماره موبایل</Label>
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

// 2. کامپوننت اصلی که فرم را در Suspense قرار می‌دهد تا بیلد را پاس کند
const LoginPage = () => {
  return (
    <Suspense fallback={<div className="flex justify-center p-8">در حال بارگذاری...</div>}>
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;