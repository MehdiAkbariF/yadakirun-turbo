import { notFound } from "next/navigation";
import { categoryService } from "@monorepo/api-client/src/services/categoryService";
import { CategoryPageClient } from "@/src/components/CategoryPage/CategoryPageClient"; // کامپوننت کلاینت جدید

interface PageProps {
  params: Promise<{ ProductCategoryId: string }>;
  searchParams: Promise<{ page?: string }>;
}

// 1. تولید متادیتا داینامیک برای SEO
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

// 2. کامپوننت اصلی سرور
export default async function ProductCategoryPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const { ProductCategoryId } = resolvedParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;

  // اجرای موازی هر دو درخواست API
  const [categoryData, productsData] = await Promise.all([
    categoryService.getCategoryDetails(ProductCategoryId),
    categoryService.getCategoryProducts(ProductCategoryId, currentPage)
  ]);

  if (!categoryData) {
    notFound();
  }

  // پاس دادن هر دو داده به کامپوننت کلاینت
  return (
    <CategoryPageClient 
      categoryData={categoryData} 
      initialProducts={productsData}
    />
  );
}