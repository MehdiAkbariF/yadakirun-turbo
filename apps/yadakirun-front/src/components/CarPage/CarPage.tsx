"use client";
import React, { useState, useMemo } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { CarPageData, PaginatedResponse, Product, CarManufacturer } from "@monorepo/api-client/src/types/car";

// --- Design System Imports ---
import { Container } from "@monorepo/design-system/src/components/organisms/Container/Container";
import { Label } from "@monorepo/design-system/src/components/atoms/Label/Label";
import { FilterSidebar, FilterState, FilterItem } from "@monorepo/design-system/src/components/organisms/FilterSidebar/FilterSidebar";
import { SortOptions, SortType } from "@monorepo/design-system/src/components/molecules/SortOptions/SortOptions";
import { Pagination } from "@monorepo/design-system/src/components/molecules/Pagination/Pagination";
import { ContentSection } from "@monorepo/design-system/src/components/molecules/ContentSection/ContentSection";
import { ProductGrid } from "@monorepo/design-system/src/components/organisms/ProductGrid/ProductGrid";
import { CardSlider } from "@monorepo/design-system/src/components/molecules/CardSlider/CardSlider";
import { Breadcrumb } from "@monorepo/design-system/src/components/molecules/Breadcrumb/Breadcrumb"; // ✨ 1. ایمپورت Breadcrumb

interface CarPageClientProps {
  carData: CarPageData;
  initialProducts: PaginatedResponse<Product>;
  manufacturers: CarManufacturer[]; // این پراپ از صفحه قبل باقی مانده، آن را پاس می‌دهیم
}

// --- داده‌های استاتیک برای فیلترها ---
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

export function CarPageClient({ carData, initialProducts, manufacturers }: CarPageClientProps) {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

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

  const productGridItems = processedProducts.map(p => ({
    id: String(p.id),
    title: p.title,
    imgSrc: p.mainImage,
    price: p.price,
    originalPrice: p.oldPrice,
    rating: p.rating,
    brand: carData.carManufacturer.name,
    inStock: p.stockStatus,
    href: `/ProductPage/${p.id}`
  }));

  const brandSliderItems = useMemo(() => {
    if (!manufacturers) return [];
    return manufacturers.map(brand => ({
      title: brand.name,
      href: `/CarManufacturerPage/${brand.id}`,
      imgSrc: `/brands/${brand.englishName.toLowerCase()}.svg`,
    }));
  }, [manufacturers]);

  // ✨ 2. ساخت آیتم‌های Breadcrumb به صورت داینامیک
  const breadcrumbItems = [
    { label: carData.carManufacturer.name, href: `/CarManufacturerPage/${carData.carManufacturer.id}` },
    { label: carData.modelName, href: `/CarPage/${carData.id}` },
  ];

  return (
    <div className="bg-body min-h-screen pb-15">
      <Container>
        {/* ✨ 3. اضافه کردن کامپوننت Breadcrumb در بالای صفحه */}
        <div className="pt-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <section className="py-1">
           <div className="mb-6 mt-6">
             <Label as="h1" size="xl" weight="bold" className="mb-6">
                قطعات یدکی {carData.modelName}
             </Label>
             
             {brandSliderItems.length > 0 && (
                <div className="mb-8">
                  <CardSlider items={brandSliderItems} />
                </div>
             )}
           </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <div className="hidden lg:block lg:col-span-1 sticky top-24">
             <FilterSidebar 
               filters={filters} 
               onFilterChange={setFilters} 
               categories={categoryList}
               brands={brandList} 
             />
          </div>

          <div className="lg:col-span-3">
             <SortOptions activeSort={activeSort} onSortChange={setActiveSort} />
             <ProductGrid products={productGridItems} />

             <div className="flex justify-center mt-8">
               <Pagination 
                 currentPage={initialProducts.currentPage} 
                 totalPages={initialProducts.totalPages} 
                 baseUrl={`/CarPage/${params.carsId}`} 
               /> 
             </div>
          </div>
        </div>

        {carData.description && (
          <div className="mt-16 bg-surface p-8 rounded-2xl border border-border-secondary">
            <ContentSection title={`درباره قطعات ${carData.modelName}`}>
              <p>{carData.description}</p>
            </ContentSection>
          </div>
        )}
      </Container>
    </div>
  );
}