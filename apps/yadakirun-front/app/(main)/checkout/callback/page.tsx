"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { checkoutService } from '@monorepo/api-client/src/services/checkoutService';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Label } from '@monorepo/design-system/src/components/atoms/Label/Label';
import { Button } from '@monorepo/design-system/src/components/atoms/Button/Button';

export default function PaymentCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading');
  
  useEffect(() => {
    const refNum = searchParams.get('RefNum');
    const paymentStatus = searchParams.get('Status');
    const token = searchParams.get('Token');

    if (!refNum || !paymentStatus || !token) {
      setStatus('failed');
      return;
    }

    const verifyPayment = async () => {
      try {
        // اطلاعات را برای تایید نهایی به بک‌اند خودمان می‌فرستیم
        await checkoutService.verifySamanPayment({ 
          refNum, 
          status: Number(paymentStatus), 
          token 
        });
        setStatus('success');
      } catch (error) {
        setStatus('failed');
      }
    };

    verifyPayment();
  }, [searchParams]);

  if (status === 'loading') {
    return <div className="flex flex-col items-center justify-center min-h-screen"><Loader2 className="animate-spin" size={48} /><Label className="mt-4">در حال تایید پرداخت...</Label></div>;
  }

  if (status === 'success') {
    return <div className="flex flex-col items-center justify-center min-h-screen"><CheckCircle className="text-green-500" size={64} /><Label size="lg" className="mt-4">پرداخت شما با موفقیت انجام شد.</Label><Button onClick={() => router.push('/dashboard/orders')} className="mt-6">مشاهده سفارشات</Button></div>;
  }

  return <div className="flex flex-col items-center justify-center min-h-screen"><XCircle className="text-red-500" size={64} /><Label size="lg" className="mt-4">پرداخت ناموفق بود یا خطایی رخ داد.</Label><Button onClick={() => router.push('/checkout')} className="mt-6">بازگشت به سبد خرید</Button></div>;
}