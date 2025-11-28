"use client";
import React, { useState, useMemo } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ProductCategoryPageData } from "@monorepo/api-client/src/types/category.types";
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

interface CategoryPageClientProps {
  categoryData: ProductCategoryPageData;
  initialProducts: PaginatedResponse<Product>;
}

// --- داده‌های استاتیک برای فیلترها ---
const categoryList: FilterItem[] = [];
const brandList: FilterItem[] = [];

export function CategoryPageClient({ categoryData, initialProducts }: CategoryPageClientProps) {
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
    brand: "نام برند از محصول",
    inStock: p.stockStatus,
    href: `/ProductPage/${p.id}`
  }));
  
  const carSliderItems = useMemo(() => {
    if (!categoryData.cars) return [];
    return categoryData.cars.map(car => ({
      title: car.modelName,
      href: `/CarPage/${car.id}`,
      imgSrc: car.imageUrl,
    }));
  }, [categoryData.cars]);

  // ✨ 2. ساخت آیتم‌های Breadcrumb به صورت داینامیک
  const breadcrumbItems = [
    { label: "دسته‌بندی‌ها", href: "/categories" }, // لینک به صفحه لیست تمام دسته‌بندی‌ها
    { label: categoryData.name, href: `/ProductCategoryPage/${categoryData.id}` }, // لینک به خود صفحه فعلی
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
             {/* {categoryData.bannerUrl && (
                <div className="relative w-full h-48 md:h-64 rounded-2xl overflow-hidden mb-6">
                    <Image src={categoryData.bannerUrl} alt={categoryData.bannerAlt || categoryData.name} fill className="object-cover" />
                </div>
             )} */}
             <Label as="h1" size="2x" weight="extra-bold">{categoryData.name}</Label>
             
             {carSliderItems.length > 0 && (
                <div className="my-8">
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
                  <Label color="secondary">محصولی برای این دسته‌بندی یافت نشد.</Label>
                </div>
             )}

             <div className="flex justify-center mt-8">
               <Pagination 
                 currentPage={initialProducts.currentPage} 
                 totalPages={initialProducts.totalPages} 
                 baseUrl={`/ProductCategoryPage/${params.ProductCategoryId}`} 
               /> 
             </div>
          </div>
        </div>

        {categoryData.description && (
          <div className="mt-16 bg-surface p-8 rounded-2xl border border-border-secondary">
            <ContentSection title={`درباره ${categoryData.name}`}>
              <p className="whitespace-pre-line leading-relaxed">{categoryData.description}</p>
            </ContentSection>
          </div>
        )}
      </Container>
    </div>
  );
}