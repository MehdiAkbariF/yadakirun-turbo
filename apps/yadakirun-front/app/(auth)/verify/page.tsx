"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, Timer } from 'lucide-react';

import { useAuth } from '@/src/context/AuthContext';
import { Label } from '@monorepo/design-system/src/components/atoms/Label/Label';
import { Button } from '@monorepo/design-system/src/components/atoms/Button/Button';
import { OtpInput } from '@monorepo/design-system/src/components/molecules/OtpInput/OtpInput';

// این خط را نگه می‌داریم برای اطمینان
export const dynamic = 'force-dynamic';

// 1. جدا کردن منطق صفحه در یک کامپوننت داخلی
const VerifyContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mobile = searchParams.get('mobile') || '---';
  const { login } = useAuth();

  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 5 || isLoading) return;

    setIsLoading(true);

    setTimeout(() => {
      login();
      setIsLoading(false);
      router.push('/');
    }, 1500);
  };

  const handleResend = () => {
    setTimer(120);
    setCanResend(false);
    setOtp('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-2 relative">
        <button 
          type="button" 
          onClick={() => router.back()} 
          className="absolute right-0 top-1 text-text-secondary hover:text-brand-primary transition-colors"
        >
          <ArrowRight size={20} />
        </button>
        <Label size="lg" weight="bold" className="mb-2">کد تایید را وارد کنید</Label>
        <div className="flex items-center justify-center gap-1">
           <Label size="sm" color="secondary">کد به شماره</Label>
           <Label size="sm" weight="bold" className="font-mono">{mobile}</Label>
           <Label size="sm" color="secondary">ارسال شد</Label>
        </div>
      </div>

      <div className="py-4">
        <OtpInput 
          length={5} 
          value={otp} 
          onChange={setOtp} 
        />
      </div>

      <div className="flex justify-center">
        {canResend ? (
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            onClick={handleResend}
            className="text-brand-primary"
          >
            ارسال مجدد کد
          </Button>
        ) : (
          <div className="flex items-center gap-2 text-text-placeholder">
            <Timer size={16} />
            <Label size="sm" className="font-mono w-12 text-center">
              {formatTime(timer)}
            </Label>
            <Label size="xs">تا ارسال مجدد</Label>
          </div>
        )}
      </div>

      <Button 
        type="submit" 
        fullWidth 
        size="md" 
        isLoading={isLoading}
        disabled={otp.length < 5}
        className="shadow-md"
      >
        تایید و ورود
      </Button>
    </form>
  );
};

// 2. کامپوننت اصلی که محتوا را در Suspense قرار می‌دهد
const VerifyPage = () => {
  return (
    <Suspense fallback={<div className="text-center p-4">در حال بارگذاری...</div>}>
      <VerifyContent />
    </Suspense>
  );
};

export default VerifyPage;