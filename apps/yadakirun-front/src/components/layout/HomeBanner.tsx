import React from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react'; 
import { Button } from '@monorepo/design-system/src/components/atoms/Button/Button';
import { Label } from '@monorepo/design-system/src/components/atoms/Label/Label';
import { Input } from '@monorepo/design-system/src/components/atoms/Input/Input'; 
import { Container } from '@monorepo/design-system/src/components/organisms/Container/Container';

export const HomeBanner = () => {
  return (
    <section 
      className="relative w-full overflow-hidden bg-bg-surface  " 
      dir="rtl"
    >
      {/* --- پس‌زمینه گرادینت --- */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-surface via-bg-secondary/30 to-brand-primary/5 z-0" />
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[-10%] left-[-5%] w-72 h-72 bg-brand-accent/10 rounded-full blur-3xl z-0" />

      <Container className="relative z-10 h-full">
    
        <div className="relative flex flex-col justify-center min-h-[400px] lg:min-h-auto lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          
        
          <div className="absolute inset-0 z-0 opacity-20 lg:opacity-100 lg:relative lg:h-[400px] lg:w-full flex items-center justify-center lg:order-2">
            <div className="relative w-full h-full flex items-center justify-center  ">
              <Image 
                src="/character3.png" 
                alt="بنر قطعات خودرو"
                fill
                priority
                className="object-contain drop-shadow-2xl "
             
              />
            </div>
          </div>
          
          
          <div className="relative z-10 w-full flex flex-col items-center text-center space-y-6 lg:order-1 animate-fade-in-right">
            
            {/* 📱 نسخه موبایل (محتوای خاص) */}
            <div className="lg:hidden flex flex-col items-center space-y-3">
                <div className="relative w-40 h-10 ">
                    <Image src="/logo.webp" alt="Logo" fill className="object-contain" />
                </div>
                
               
                <Label 
                  as="h1" 
                  size="2x" 
                  weight="black" 
                  className="text-brand-primary drop-shadow-sm leading-tight flex flex-col "
                color='brand-accent'
                >
                  فروشگاه آنلاین قطعات

یدکی‌ران
                </Label>
                
                <Label 
                  as="p" 
                  size="lg" 
                  className="text-text-secondary leading-loose max-w-lg delay-100"
                  color='info'
                >
        بزرگترین پلتفرم بررسی و خرید  لوازم یدکی خودرو
                </Label>
            </div>

            {/* 💻 نسخه دسکتاپ (محتوای کامل) */}
            <div className="hidden lg:flex flex-col items-center text-center ">
                
                {/* لوگو دسکتاپ */}
                <div className="relative w-50 h-20 ">
                    <Image src="/logo.webp" alt="Logo" fill className="object-contain" />
                </div>

                <Label 
                  as="h1" 
                  size="2x" // سایز اصلاح شده طبق درخواست (lg بود که خیلی کوچک است)
                  weight="black" 
                  className="text-brand-primary drop-shadow-sm leading-tight flex flex-col "
                color='brand-accent'
                >
                  فروشگاه آنلاین قطعات

یدکی‌ران
                </Label>
                
                <Label 
                  as="p" 
                  size="lg" 
                  className="text-text-secondary leading-loose max-w-lg delay-100"
                  color='info'
                >
        بزرگترین پلتفرم بررسی و خرید  لوازم یدکی خودرو
                </Label>
            </div>

            {/* 
               💻 اینپوت جستجو 
               الان با کلاس items-center در والد، کاملاً وسط‌چین می‌شود
            */}
            <div className="hidden lg:block w-full max-w-xl  delay-200">
                <div className="relative group">
                    <Input 
                        id="hero-search"
                        placeholder="جستجو در بین ۲۰۰۰+ قطعه (نام قطعه یا خودرو)..."
                 
                        className=" text-lg" // کمی بزرگتر برای دسکتاپ
                        leftIcon={<Search className="text-brand-primary w-6 h-6" />}
                    />
                </div>
            </div>
         
          </div>

        </div>
      </Container>
    </section>
  );
};