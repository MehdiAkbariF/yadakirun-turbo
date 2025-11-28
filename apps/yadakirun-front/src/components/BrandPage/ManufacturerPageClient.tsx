"use client";
import React, { useState, useMemo } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ManufacturerPageData } from "@monorepo/api-client/src/types/manufacturer.types";
import { PaginatedResponse, Product } from "@monorepo/api-client/src/types/car";

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
    brand: manufacturerData.name,
    inStock: p.stockStatus,
    href: `/ProductPage/${p.id}`
  }));

  const carSliderItems = useMemo(() => {
    if (!manufacturerData.cars) return [];
    
    return manufacturerData.cars.map(car => ({
      title: car.modelName,
      href: `/CarPage/${car.id}`,
      imgSrc: car.imageUrl,
    }));
  }, [manufacturerData.cars]);

  // ✨ 2. ساخت آیتم‌های Breadcrumb به صورت داینامیک
  const breadcrumbItems = [
    { label: "برندها", href: "/brands" }, // لینک به صفحه لیست تمام برندها
    { label: manufacturerData.name, href: `/CarManufacturerPage/${manufacturerData.id}` }, // لینک به خود صفحه فعلی
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
             <div className="flex items-center gap-4 mb-6">
                {/* {manufacturerData.logoUrl && (
                  <div className="relative w-16 h-16 shrink-0">
                    <Image src={manufacturerData.logoUrl} alt={manufacturerData.logoAlt || manufacturerData.name} fill className="object-contain" />
                  </div>
                )} */}
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
             
             {productGridItems.length > 0 ? (
                <ProductGrid products={productGridItems} />
             ) : (
                <div className="text-center py-20 bg-surface rounded-xl border border-border-secondary">
                  <Label color="secondary">محصولی برای این برند یافت نشد.</Label>
                </div>
             )}

             <div className="flex justify-center mt-8">
               <Pagination 
                 currentPage={initialProducts.currentPage} 
                 totalPages={initialProducts.totalPages} 
                 baseUrl={`/CarManufacturerPage/${params.CarManufacturerId}`} 
               /> 
             </div>
          </div>
        </div>

        {manufacturerData.desctiption && (
          <div className="mt-16 bg-surface p-8 rounded-2xl border border-border-secondary">
            <ContentSection title={`درباره برند ${manufacturerData.name}`}>
              <p className="whitespace-pre-line leading-relaxed">{manufacturerData.desctiption}</p>
            </ContentSection>
          </div>
        )}
      </Container>
    </div>
  );
}