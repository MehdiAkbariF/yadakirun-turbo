"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Imports from DS
import { Label } from '@monorepo/design-system/src/components/atoms/Label/Label';
import { Button } from '@monorepo/design-system/src/components/atoms/Button/Button';
import { Input } from '@monorepo/design-system/src/components/atoms/Input/Input';

export default function LoginPage() {
  const router = useRouter();
  const [mobile, setMobile] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length < 11) return; // اعتبارسنجی ساده

    setIsLoading(true);
    
    // شبیه‌سازی ارسال شماره موبایل به API
    setTimeout(() => {
      setIsLoading(false);
      // پس از موفقیت، کاربر را به صفحه تایید به همراه شماره موبایل هدایت می‌کنیم
      router.push(`/verify?mobile=${mobile}`);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* هدر */}
      <div className="text-center mb-8">
        <Label size="lg" weight="bold" className="mb-2">ورود | ثبت‌نام</Label>
        <Label size="sm" color="secondary">با وارد کردن شماره موبایل، کد تایید برای شما ارسال می‌شود</Label>
      </div>

      {/* فیلد ورودی شماره موبایل */}
      <div className="relative">
        <Input
          id="mobile"
          type="tel" // نوع مناسب برای شماره تلفن
          placeholder="شماره موبایل"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          inputMode="numeric" // کیبورد عددی را در موبایل نشان می‌دهد
          autoComplete="tel"
          className="text-center tracking-[4px] font-mono" // استایل برای ظاهر بهتر
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
}