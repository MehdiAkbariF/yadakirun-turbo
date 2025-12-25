"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare, PhoneCall } from 'lucide-react';
import { useAuth } from '@/src/context/AuthContext';
import { Button } from '@monorepo/design-system/src/components/atoms/Button/Button';

export const DeliveryActions = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleTicketClick = () => {
    if (isAuthenticated) {
      // هدایت به داشبورد و بخش تیکت‌ها
      router.push('/dashboard'); 
    } else {
      // هدایت به لاگین
      router.push('/login');
    }
  };

  return (
    <div className="flex flex-wrap gap-4 mt-6">
      <Button 
        variant="primary" 
        leftIcon={<MessageSquare size={18} />}
        onClick={handleTicketClick}
      >
        ارسال تیکت پشتیبانی
      </Button>

      <Button 
        variant="secondary" 
        leftIcon={<PhoneCall size={18} />}
        onClick={() => router.push('/contact-us')}
      >
        صفحه تماس با ما
      </Button>
    </div>
  );
};