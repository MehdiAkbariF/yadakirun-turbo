import { notFound, redirect } from "next/navigation";
import { carService } from "@monorepo/api-client/src/services/carService";
import { CarPageClient } from "@/src/components/CarPage/CarPage";

interface PageProps {
  // نام پارامتر با نام پوشه [carsId] یکی است
  params: Promise<{ carsId: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const { carsId } = resolvedParams;

  const carData = await carService.getCarDetails(carsId);

  if (!carData) {
    return { title: "خودرو یافت نشد" };
  }

  return {
    title: carData.metaTitle || `${carData.modelName} | یدکی‌ران`,
    description: carData.metaDescription,
    alternates: {
      canonical: carData.canonicalUrl,
    },
  };
}

export default async function CarPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const { carsId } = resolvedParams; // می‌تواند ID یا Slug باشد
  const currentPage = Number(resolvedSearchParams.page) || 1;

  // 1. ابتدا دریافت جزئیات خودرو (هوشمند: با ID یا Slug)
  const carData = await carService.getCarDetails(carsId);

  if (!carData) {
    notFound();
  }

  // 2. دریافت محصولات با استفاده از ID واقعی خودرو
  const productsData = await carService.getCarProducts(carData.id, currentPage);

  // 3. ✅ لاجیک ریدایرکت سئو (SEO Redirect)
  const currentSlug = decodeURIComponent(carsId);
  // فرض بر این است که API فیلدی به نام englishName یا englishTitle دارد
  const standardSlug = (carData as any).englishName || (carData as any).englishTitle;

  if (standardSlug && currentSlug !== standardSlug) {
    // فقط در صفحه اول ریدایرکت می‌کنیم
    if (currentPage === 1) {
       redirect(`/CarPage/${standardSlug}`);
    }
  }

  return (
    <CarPageClient 
      carData={carData} 
      initialProducts={productsData} 
    />
  );
}