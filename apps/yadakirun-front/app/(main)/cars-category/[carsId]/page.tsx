"use client";
import React, { useState, useMemo } from "react";
import { useParams } from "next/navigation";

// --- Design System Imports ---
import { Container } from "@monorepo/design-system/src/components/organisms/Container/Container";
import { Label } from "@monorepo/design-system/src/components/atoms/Label/Label";
// import { ProductCard } from "@monorepo/design-system/src/components/atoms/ProductCard/ProductCard"; // این کامپوننت استفاده نشده، با ProductGrid جایگزین شد
import { FilterSidebar, FilterState, FilterItem } from "@monorepo/design-system/src/components/organisms/FilterSidebar/FilterSidebar";
import { SortOptions, SortType } from "@monorepo/design-system/src/components/molecules/SortOptions/SortOptions";
import { Pagination } from "@monorepo/design-system/src/components/molecules/Pagination/Pagination";
import { ContentSection } from "@monorepo/design-system/src/components/molecules/ContentSection/ContentSection";
import { CardGrid } from "@monorepo/design-system/src/components/molecules/CardGrid/CardGrid";
import { ProductGrid } from "@monorepo/design-system/src/components/organisms/ProductGrid/ProductGrid";
import { CardSlider } from "@monorepo/design-system/src/components/molecules/CardSlider/CardSlider"; // ✅ ایمپورت CardSlider

// --- Data (Moved Here) ---
// ✅ لیست دسته‌بندی‌ها (دیتای بیزنس)
const categoryList: FilterItem[] = [
  { title: "لوازم موتوری", subtitle: "Engine Parts", id: "engine" },
  { title: "قطعات بدنه", subtitle: "Body Parts", id: "body" },
  { title: "جلوبندی و تعلیق", subtitle: "Suspension", id: "suspension" },
  { title: "سیستم ترمز", subtitle: "Brake System", id: "brake" },
];

// ✅ لیست برندها (دیتای بیزنس)
const brandList: FilterItem[] = [
  { title: "رنو", subtitle: "Renault", id: "renault" },
  { title: "پژو", subtitle: "Peugeot", id: "peugeot" },
  { title: "کیا", subtitle: "KIA", id: "kia" },
  { title: "هیوندای", subtitle: "Hyundai", id: "hyundai" },
  { title: "سانگ یانگ", subtitle: "SsangYong", id: "ssangyong" },
  { title: "جک", subtitle: "JAC", id: "jac" },
  { title: "ام وی ام", subtitle: "MVM", id: "mvm" },
  { title: "تویوتا", subtitle: "Toyota", id: "toyota" },
  { title: "سایپا", subtitle: "Saipa", id: "saipa" },
  { title: "ایران خودرو", subtitle: "IKCO", id: "ikco" },
];

// --- Mock Data for Products ---
const allProductsData = [
  { id: "1", title: "کیت تسمه تایم اصلی رنو تندر 90", imgSrc: "/Renault.svg", price: 2300000, originalPrice: 2550000, rating: 4.5, badgeText: "پیشنهاد ویژه", brandId: "renault", isNew: true, inStock: true },
  { id: "2", title: "کمک فنر جلو چپ MVM 530", imgSrc: "/Renault.svg", price: 2200000, rating: 4.1, brandId: "mvm", inStock: false },
  { id: "3", title: "دیسک و صفحه کلاچ پژو 206", imgSrc: "/Renault.svg", price: 3420000, originalPrice: 3800000, rating: 4.8, brandId: "peugeot", inStock: true, onSale: true },
  { id: "4", title: "لنت ترمز جلو پراید سرامیکی", imgSrc: "/Renault.svg", price: 750000, rating: 4.6, brandId: "saipa", inStock: true },
  { id: "5", title: "شمع موتور سوزنی هیوندای", imgSrc: "/Renault.svg", price: 1100000, originalPrice: 1250000, rating: 4.7, brandId: "hyundai", inStock: true, onSale: true },
  { id: "6", title: "فیلتر هوای کابین کیا سراتو", imgSrc: "/Renault.svg", price: 350000, rating: 4.3, brandId: "kia", inStock: true },
  { id: "7", title: "روغن موتور بهران سوپر پیشتاز", imgSrc: "/Renault.svg", price: 450000, originalPrice: 480000, rating: 4.9, brandId: "behran", inStock: true },
  { id: "8", title: "باتری خودرو صبا باتر 60 آمپر", imgSrc: "/Renault.svg", price: 1800000, rating: 4.0, brandId: "saba", inStock: false },
  { id: "9", title: "چراغ جلو سانگ یانگ موسو", imgSrc: "/Renault.svg", price: 4100000, originalPrice: 4500000, rating: 4.2, brandId: "ssangyong", inStock: true },
];

const categoryData = [
  { href: '/category/landrover', imgSrc: '/LandRover.svg', title: 'لندرور' },
  { href: '/category/ssangyong', imgSrc: '/ssangyong.svg', title: 'سانگ یانگ' },
  { href: '/category/renault', imgSrc: '/Renault.svg', title: 'رنو' },
  { href: '/category/offroad', imgSrc: '/Renault.svg', title: 'آفرود' },
  { href: '/category/mvm', imgSrc: '/Renault.svg', title: 'MVM' },
  { href: '/category/geely', imgSrc: '/geely.webp', title: 'جیلی' },
    { href: '/category/geely', imgSrc: '/geely.webp', title: 'جیلی' },
];

const textContentData = [
    { id: 'sec-1', title: "قطعات یدکی خودروهای رنو", content: <><p>اگه صاحب یکی از خودروهای رنو باشی، حتماً می‌دونی که این ماشینا چه کیفیت خوبی دارن...</p></> },
    { id: 'sec-2', title: "معرفی قطعات یدکی رنو", content: <><p>وقتی از قطعات یدکی رنو حرف می‌زنیم، داریم درباره‌ی مجموعه‌ای کامل صحبت می‌کنیم...</p></> },
];

const PRODUCTS_PER_PAGE = 8;

export default function CarsCategoryPage() {
  const params = useParams();
  
  const [activeSort, setActiveSort] = useState<SortType>("relevant");
  const [filters, setFilters] = useState<FilterState>({ 
    inStock: false, 
    onSale: false, 
    brands: [] 
  });
  const [currentPage, setCurrentPage] = useState(1);

  // لاجیک فیلتر و سورت (Client Side برای نمونه)
  const processedProducts = useMemo(() => {
    let result = [...allProductsData];

    // 1. Filter
    if (filters.inStock) result = result.filter(p => p.inStock);
    if (filters.onSale) result = result.filter(p => p.onSale);
    if (filters.brands.length > 0) result = result.filter(p => filters.brands.includes(p.brandId));

    // 2. Sort
    if (activeSort === 'cheapest') result.sort((a, b) => a.price - b.price);
    else if (activeSort === 'expensive') result.sort((a, b) => b.price - a.price);

    return result;
  }, [filters, activeSort]);

  const totalPages = Math.ceil(processedProducts.length / PRODUCTS_PER_PAGE);
  const currentProducts = processedProducts.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);

  return (
    <div className="bg-body min-h-screen pb-20">
      <Container>
        
        {/* --- Top Categories --- */}
        <section className="py-8">
           <div className="mb-8">
             <Label as="h1" size="xl" weight="bold" className="mb-6">دسته‌بندی‌های مرتبط</Label>
             
             {/* ✅ اصلاح: استفاده از CardGrid در دسکتاپ */}
            
             
             {/* ✅ اصلاح: استفاده از CardSlider در موبایل (مشابه HomePage) */}
             <div >
                <CardSlider items={categoryData} />
             </div>
           </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* --- Sidebar (Filters) --- */}
          <div className="hidden lg:block lg:col-span-1 sticky top-24">
             <FilterSidebar 
               filters={filters} 
               onFilterChange={setFilters} 
               categories={categoryList}
               brands={brandList} 
             />
          </div>

          {/* --- Main Content (Products) --- */}
          <div className="lg:col-span-3">
             
             {/* Sort Options */}
             <SortOptions activeSort={activeSort} onSortChange={setActiveSort} />

             {/* Products Grid */}
             <ProductGrid 
               products={processedProducts.map(p => ({
                 id: p.id,
                 title: p.title,
                 imgSrc: p.imgSrc,
                 price: p.price,
                 originalPrice: p.originalPrice,
                 rating: p.rating,
                 brand: p.brandId, 
                 inStock: p.inStock,
                 href: `/product/${p.id}`
               }))} 
             />

             {/* Pagination */}
             <div className="flex justify-center">
               <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="#" /> 
             </div>

          </div>
        </div>

        {/* --- Content Section (SEO Text) --- */}
        <div className="mt-16 bg-surface p-8 rounded-2xl border border-border-secondary">
          {textContentData.map((section) => (
            <div key={section.id} className="mb-8 last:mb-0">
              <ContentSection title={section.title}>
                {section.content}
              </ContentSection>
            </div>
          ))}
        </div>

      </Container>
    </div>
  );
}