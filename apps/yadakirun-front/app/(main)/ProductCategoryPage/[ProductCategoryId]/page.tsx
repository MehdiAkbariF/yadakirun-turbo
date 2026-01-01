import { notFound, redirect } from "next/navigation";
import { categoryService } from "@monorepo/api-client/src/services/categoryService";
import { CategoryPageClient } from "@/src/components/CategoryPage/CategoryPageClient"; 

interface PageProps {
  
  params: Promise<{ ProductCategoryId: string }>;
  searchParams: Promise<{ page?: string }>;
}


const generateSlug = (englishName: string | null) => {
  if (!englishName) return '';
  return englishName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const { ProductCategoryId } = resolvedParams;

  const categoryData = await categoryService.getCategoryDetails(ProductCategoryId);

  if (!categoryData) {
    return { title: "دسته‌بندی یافت نشد" };
  }

  return {
    title: categoryData.metaTitle || `${categoryData.name} | یدکی‌ران`,
    description: categoryData.metaDescription,
    alternates: {
      canonical: categoryData.canonicalUrl,
    },
  };
}

export default async function ProductCategoryPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const { ProductCategoryId } = resolvedParams; 
  const currentPage = Number(resolvedSearchParams.page) || 1;
  
  
  const categoryData = await categoryService.getCategoryDetails(ProductCategoryId);

  if (!categoryData) {
    notFound();
  }

  
  
  const productsData = await categoryService.getCategoryProducts(categoryData.id, currentPage);

  
  
  const currentSlug = decodeURIComponent(ProductCategoryId);
  
  const standardSlug = categoryData.englishName;

  if (standardSlug && currentSlug !== standardSlug && !/^\d+$/.test(currentSlug)) {
     
     
     
     if (currentPage === 1) {
        
     }
  }
  
  return (
    <CategoryPageClient 
      categoryData={categoryData} 
      initialProducts={productsData}
    />
  );
}