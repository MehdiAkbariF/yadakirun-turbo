import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Settings, Car, ChevronLeft } from 'lucide-react';

// --- Design System Imports ---
import { Container } from '@monorepo/design-system/src/components/organisms/Container/Container';
import { Label } from '@monorepo/design-system/src/components/atoms/Label/Label';

export const metadata: Metadata = {
  title: 'دسته‌بندی محصولات و خودروها | یدکی‌ران',
  description: 'دسترسی سریع به قطعات یدکی بر اساس نوع قطعه و مدل خودروهای رنو، سانگ‌یانگ، لندرور و جک.',
};

// --- داده‌های استاتیک قطعات ---
const partCategories = [
  { id: 1, title: 'دیسک و صفحه', href: '/ProductCategoryPage/1', image: '/parts/disc.webp' },
  { id: 2, title: 'چهارشاخ گاردان', href: '/ProductCategoryPage/2', image: '/parts/gardan.webp' },
  { id: 3, title: 'لوازم آفرودی', href: '/ProductCategoryPage/3', image: '/parts/offroad.webp' },
  { id: 4, title: 'سرسیلندر', href: '/ProductCategoryPage/4', image: '/parts/cylinder.webp' },
];

// --- داده‌های استاتیک برندها و مدل‌ها ---
const carBrands = [
  {
    id: 'renault',
    name: 'رنو',
    englishName: 'Renault',
    logo: '/Renault.svg',
    models: [
      { name: 'ال 90', id: 'l90' },
      { name: 'تالیسمان', id: 'talisman' },
      { name: 'داستر', id: 'duster' },
      { name: 'ساندرو', id: 'sandero' },
      { name: 'سیمبل', id: 'symbol' },
      { name: 'کولئوس', id: 'koleos' },
      { name: 'مگان', id: 'megan' },
    ]
  },
  {
    id: 'ssangyong',
    name: 'سانگ یانگ',
    englishName: 'SsangYong',
    logo: '/ssangyong.svg',
    models: [
      { name: 'اکتیون', id: 'actyon' },
      { name: 'تیوولی', id: 'tivoli' },
      { name: 'چیرمن', id: 'chairman' },
      { name: 'رکستون', id: 'rexton' },
      { name: 'کایرون', id: 'kyron' },
      { name: 'موسو', id: 'musso' },
      { name: 'نیو کوراندو', id: 'new-korando' },
    ]
  },
  {
    id: 'landrover',
    name: 'لندروور',
    englishName: 'Land Rover',
    logo: '/LandRover.svg',
    models: [
      { name: 'لندرور', id: 'defender-classic' },
      { name: 'پاژن', id: 'pazhan' },
      { name: 'دیفندر', id: 'defender' },
    ]
  },
  {
    id: 'jac',
    name: 'جک',
    englishName: 'JAC',
    logo: '/jack.png',
    models: [
      { name: 'جک S5', id: 'jac-s5' },
      { name: 'جک J5', id: 'jac-j5' },
    ]
  }
];

export default function CategoriesPage() {
  return (
    <div className="bg-bg-body min-h-screen pb-20">
      <Container>
        {/* === هدر صفحه === */}
        <div className="py-10 text-center">
          <Label as="h1" size="xl" weight="black" className="mb-2">دسته‌بندی‌های فروشگاه</Label>
          <Label color="secondary" size='sm'>قطعه یا خودروی مورد نظر خود را انتخاب کنید</Label>
        </div>

        {/* === بخش ۱: دسته بندی قطعات === */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8 border-r-4 border-brand-primary pr-4">
            <Settings className="text-brand-primary" size={28} />
            <Label as="h2" size="lg" weight="extra-bold">دسته‌بندی قطعات</Label>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partCategories.map((part) => (
              <Link 
                key={part.id} 
                href={part.href}
                className="group bg-surface rounded-2xl p-4 border border-border-secondary hover:border-brand-primary
                 transition-all duration-300 hover:shadow-md text-center text-xs"
              >
                <div className="relative w-full h-32 mb-4 overflow-hidden rounded-xl bg-bg-secondary">
                  <Image 
                    src={part.image} 
                    alt={part.title} 
                    fill 
                    className="object-contain p-4 group-hover:scale-110 transition-transform" 
                  />
                </div>
                <Label weight="bold" size="sm" className="group-hover:text-brand-primary transition-colors">
                  {part.title}
                </Label>
              </Link>
            ))}
          </div>
        </section>

        {/* === بخش ۲: دسته بندی خودروها === */}
        <section>
          <div className="flex items-center gap-3 mb-8 border-r-4 border-brand-accent pr-4">
            <Car className="text-brand-accent" size={28} />
            <Label as="h2" size="lg" weight="extra-bold">دسته‌بندی خودروها</Label>
          </div>

          <div className="space-y-10">
            {carBrands.map((brand) => (
              <div key={brand.id} className="bg-surface rounded-3xl border border-border-secondary overflow-hidden shadow-sm">
                {/* هدر برند */}
                <div className="bg-bg-secondary p-6 flex items-center justify-between border-b border-border-secondary">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 bg-white rounded-xl p-2 border border-border-secondary shadow-sm">
                      <Image src={brand.logo} alt={brand.name} fill className="object-contain p-1" />
                    </div>
                    <div>
                      <Label as="h3" size="sm" weight="black">{brand.name}</Label>
                      <Label size="xs" color="placeholder" className="uppercase tracking-widest">{brand.englishName}</Label>
                    </div>
                  </div>
                  <Link href={`/CarManufacturerPage/${brand.id}`} className="text-brand-primary flex items-center gap-1 text-sm font-bold hover:gap-2 transition-all">
                    مشاهده همه <ChevronLeft size={16} />
                  </Link>
                </div>

                {/* گرید مدل‌ها */}
                <div className="p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {brand.models.map((model) => (
                      <Link 
                        key={model.id} 
                        href={`/CarPage/${model.id}`}
                        className="flex flex-col items-center justify-center p-4 rounded-xl border border-border-secondary 
                        hover:border-brand-primary hover:bg-brand-primary/5 transition-all group"
                      >
                        <Label size="sm" weight="bold" className="text-center group-hover:text-brand-primary transition-colors">
                          {model.name}
                        </Label>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}