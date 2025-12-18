"use client";
import React, { useState, useMemo } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ManufacturerPageData } from "@monorepo/api-client/src/types/manufacturer.types";
import { PaginatedResponse, Product } from "@monorepo/api-client/src/types/car";

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

interface ManufacturerPageClientProps {
  manufacturerData: ManufacturerPageData;
  initialProducts: PaginatedResponse<Product>;
}

// --- داده‌های استاتیک برای فیلترها ---
const categoryList: FilterItem[] = [];
const brandList: FilterItem[] = [];

export function ManufacturerPageClient({ manufacturerData, initialProducts }: ManufacturerPageClientProps) {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  // ✅ 2. اتصال به اکشن‌های مورد نیاز از استورها
  const { addItem } = useBasketStore();
  const { openCartDrawerOnDesktop } = useUIStore();
  
  // ✅ 3. تشخیص وضعیت دسکتاپ (عرض بیشتر از 1024px مطابق breakpoint-lg)
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

  // ✅ 4. تابع هندلر برای افزودن به سبد خرید با رعایت شرط باز شدن در دسکتاپ
  const handleAddToCart = async (productId: string | number) => {
    await addItem({ 
        productId: Number(productId), 
        quantity: 1 
    });
    
    // دراور فقط در دسکتاپ باز می‌شود تا در موبایل مزاحم کاربر نباشد
    openCartDrawerOnDesktop(isDesktop);
  };

  // ✅ 5. آماده‌سازی محصولات با URL کامل تصویر و تابع کلیک
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
      brand: manufacturerData.name,
      inStock: p.stockStatus,
      href: `/ProductPage/${p.id}`,
      onAddToCart: () => handleAddToCart(p.id) // پاس دادن اکشن
    };
  });

  const carSliderItems = useMemo(() => {
    if (!manufacturerData.cars) return [];
    
    return manufacturerData.cars.map(car => ({
      title: car.modelName,
      href: `/CarPage/${car.id}`,
      imgSrc: car.imageUrl ? `https://api-yadakirun.yadakchi.com${car.imageUrl}` : '/placeholder.png',
    }));
  }, [manufacturerData.cars]);

  const breadcrumbItems = [
    { label: "برندها", href: "/brands" },
    { label: manufacturerData.name, href: `/CarManufacturerPage/${manufacturerData.id}` },
  ];

  return (
    <div className="bg-body min-h-screen pb-16">
      <Container>
        <div className="pt-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <section className="py-1">
           <div className="mb-6 mt-6">
             <div className="flex items-center gap-4 mb-6">
                <Label as="h1" size="2x" weight="extra-bold">
                  قطعات یدکی {manufacturerData.name}
                </Label>
             </div>
             
             {carSliderItems.length > 0 && (
                <div className="mb-8">
                  <CardSlider items={carSliderItems} />
                </div>
             )}
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
             
             {productGridItems.length > 0 ? (
                // ✅ استفاده از ProductGrid که داده‌ها را همراه با اکشن دریافت می‌کند
                <ProductGrid products={productGridItems} />
             ) : (
                <div className="text-center py-20 bg-surface rounded-xl border border-border-secondary">
                  <Label color="secondary">محصولی برای این برند یافت نشد.</Label>
                </div>
             )}

             {initialProducts.totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <Pagination 
                    currentPage={initialProducts.currentPage} 
                    totalPages={initialProducts.totalPages} 
                    baseUrl={`/CarManufacturerPage/${params.CarManufacturerId}`} 
                  /> 
                </div>
             )}
          </div>
        </div>

        {manufacturerData.desctiption && (
          <div className="mt-16 bg-surface p-8 rounded-2xl border border-border-secondary">
            <ContentSection title={`درباره برند ${manufacturerData.name}`}>
              <p className="whitespace-pre-line leading-relaxed text-text-secondary">
                {manufacturerData.desctiption}
              </p>
            </ContentSection>
          </div>
        )}
      </Container>
    </div>
  );
}