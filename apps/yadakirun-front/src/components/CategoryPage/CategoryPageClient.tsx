"use client";
import React, { useState, useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { ProductCategoryPageData } from "@monorepo/api-client/src/types/category.types";
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

interface CategoryPageClientProps {
  categoryData: ProductCategoryPageData;
  initialProducts: PaginatedResponse<Product>;
}

const categoryList: FilterItem[] = [];
const brandList: FilterItem[] = [];

export function CategoryPageClient({ categoryData, initialProducts }: CategoryPageClientProps) {
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
  
  // ✅ 4. اصلاح تابع هندلر برای باز شدن شرطی دراور
  const handleAddToCart = async (productId: string | number) => {
    await addItem({ productId: Number(productId), quantity: 1 });
    
    // فقط در دسکتاپ دراور باز می‌شود
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
      brand: (p as any).carManufacturer?.name || "عمومی",
      inStock: p.stockStatus,
      href: `/ProductPage/${p.id}`,
      onAddToCart: () => handleAddToCart(p.id),
    };
  });
  
  const carSliderItems = useMemo(() => {
    if (!categoryData.cars) return [];
    return categoryData.cars.map(car => ({
      title: car.modelName,
      href: `/CarPage/${car.id}`,
      imgSrc: `https://api-yadakirun.yadakchi.com${car.imageUrl}`,
    }));
  }, [categoryData.cars]);

  const breadcrumbItems = [
    { label: "دسته‌بندی‌ها", href: "/categories" },
    { label: categoryData.name, href: `/ProductCategoryPage/${categoryData.id}` },
  ];

  return (
    <div className="bg-body min-h-screen pb-16">
      <Container>
        <div className="pt-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <section className="py-1">
           <div className="mb-6 mt-6">
             <div className="flex justify-between items-center mb-6 lg:hidden">
                <Label as="h1" size="lg" weight="extra-bold">{categoryData.name}</Label>
                <FilterSidebar 
                  filters={filters} 
                  onFilterChange={setFilters} 
                  categories={categoryList}
                  brands={brandList} 
                />
             </div>
             
             <div className="hidden lg:block">
                <Label as="h1" size="2x" weight="extra-bold">{categoryData.name}</Label>
             </div>
             
             {carSliderItems.length > 0 && (
                <div className="my-8">
                  <CardSlider items={carSliderItems} />
                </div>
             )}
           </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <div className="hidden lg:block lg:col-span-1 lg:sticky lg:top-24">
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
              <p className="whitespace-pre-line leading-relaxed text-text-secondary">{categoryData.description}</p>
            </ContentSection>
          </div>
        )}
      </Container>
    </div>
  );
}