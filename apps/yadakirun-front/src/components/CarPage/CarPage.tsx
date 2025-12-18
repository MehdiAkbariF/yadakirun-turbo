"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { CarPageData, PaginatedResponse, Product } from "@monorepo/api-client/src/types/car";

// ✅ 1. ایمپورت استورها و هوک تشخیص سایز صفحه
import { useBasketStore } from "@/src/stores/basketStore";
import { useUIStore } from "@/src/stores/uiStore";
import { useMediaQuery } from "@/src/hooks/useMediaQuery";

// --- Design System Imports ---
import { Container } from "@monorepo/design-system/src/components/organisms/Container/Container";
import { Label } from "@monorepo/design-system/src/components/atoms/Label/Label";
import { FilterSidebar, FilterState, FilterItem } from "@monorepo/design-system/src/components/organisms/FilterSidebar/FilterSidebar";
import { SortOptions, SortType } from "@monorepo/design-system/src/components/molecules/SortOptions/SortOptions";
import { Pagination } from "@monorepo/design-system/src/components/molecules/Pagination/Pagination";
import { ContentSection } from "@monorepo/design-system/src/components/molecules/ContentSection/ContentSection";
import { ProductGrid } from "@monorepo/design-system/src/components/organisms/ProductGrid/ProductGrid";
import { CardSlider } from "@monorepo/design-system/src/components/molecules/CardSlider/CardSlider";
import { Breadcrumb } from "@monorepo/design-system/src/components/molecules/Breadcrumb/Breadcrumb";

interface CarPageClientProps {
  carData: CarPageData;
  initialProducts: PaginatedResponse<Product>;
}

const categoryList: FilterItem[] = [
    { title: "لوازم موتوری", subtitle: "Engine Parts", id: "engine" },
    { title: "قطعات بدنه", subtitle: "Body Parts", id: "body" },
    { title: "جلوبندی و تعلیق", subtitle: "Suspension", id: "suspension" },
    { title: "سیستم ترمز", subtitle: "Brake System", id: "brake" },
];
const brandList: FilterItem[] = [
    { title: "رنو", subtitle: "Renault", id: "renault" },
    { title: "پژو", subtitle: "Peugeot", id: "peugeot" },
    { title: "کیا", subtitle: "KIA", id: "kia" },
];

export function CarPageClient({ carData, initialProducts }: CarPageClientProps) {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  // ✅ 2. اتصال به اکشن‌های مورد نیاز
  const { addItem } = useBasketStore();
  const { openCartDrawerOnDesktop } = useUIStore();

  // ✅ 3. تشخیص وضعیت دسکتاپ (عرض بیشتر از 1024px)
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [activeSort, setActiveSort] = useState<SortType>(() => (searchParams.get('sort') as SortType) || "relevant");
  const [filters, setFilters] = useState<FilterState>({
    inStock: searchParams.get('inStock') === 'true',
    onSale: searchParams.get('onSale') === 'true',
    brands: searchParams.getAll('brands')
  });

  const processedProducts = useMemo(() => {
    let result = [...initialProducts.items];
    if (filters.inStock) result = result.filter(p => p.stockStatus);
    if (activeSort === 'cheapest') result.sort((a, b) => a.price - b.price);
    else if (activeSort === 'expensive') result.sort((a, b) => b.price - a.price);
    return result;
  }, [initialProducts.items, filters, activeSort]);

  // ✅ 4. اصلاح تابع هندلر برای باز شدن شرطی دراور فقط در دسکتاپ
  const handleAddToCart = async (productId: string | number) => {
    await addItem({ 
        productId: Number(productId), 
        quantity: 1 
    });
    
    // دراور فقط در دسکتاپ باز می‌شود
    openCartDrawerOnDesktop(isDesktop);
  };
  
  const productGridItems = processedProducts.map(p => {
    const placeholderImage = '/placeholder.png'; 
    const imageUrl = p.mainImage 
      ? `https://api-yadakirun.yadakchi.com${p.mainImage}` 
      : placeholderImage;

    return {
      id: String(p.id),
      title: p.title,
      imgSrc: imageUrl,
      price: p.price,
      originalPrice: p.oldPrice,
      rating: p.rating,
      brand: carData.carManufacturer.name,
      inStock: p.stockStatus,
      href: `/ProductPage/${p.id}`,
      // ✅ اتصال به هندلر جدید
      onAddToCart: () => handleAddToCart(p.id),
    };
  });

  const breadcrumbItems = [
    { label: "خودروها", href: "/cars-category" },
    { label: carData.carManufacturer.name, href: `/CarManufacturerPage/${carData.carManufacturer.id}` },
    { label: carData.modelName, href: `/CarPage/${carData.id}` },
  ];

  return (
    <div className="bg-body min-h-screen pb-16">
      <Container>
        <div className="pt-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <section className="py-1">
           <div className="mb-6 mt-6">
             <Label as="h1" size="2x" weight="extra-bold" className="mb-4 block text-center lg:text-right">
                لوازم یدکی {carData.modelName}
             </Label>
           </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <div className="lg:col-span-1 sticky top-24">
             <div className="hidden lg:block">
                <FilterSidebar 
                  filters={filters} 
                  onFilterChange={setFilters} 
                  categories={categoryList}
                  brands={brandList} 
                />
             </div>
          </div>

          <div className="lg:col-span-3">
             <SortOptions activeSort={activeSort} onSortChange={setActiveSort} />
             
             {/* ✅ پاس دادن محصولات به همراه تابع onAddToCart */}
             <ProductGrid products={productGridItems} />

             {initialProducts.totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <Pagination 
                    currentPage={initialProducts.currentPage} 
                    totalPages={initialProducts.totalPages} 
                    baseUrl={`/CarPage/${params.carsId}`} 
                  /> 
                </div>
             )}
          </div>
        </div>

        {carData.description && (
          <div className="mt-16 bg-surface p-8 rounded-2xl border border-border-secondary">
            <ContentSection title={`درباره قطعات ${carData.modelName}`}>
              <p className="whitespace-pre-line leading-loose text-text-secondary">
                {carData.description}
              </p>
            </ContentSection>
          </div>
        )}
      </Container>
    </div>
  );
}