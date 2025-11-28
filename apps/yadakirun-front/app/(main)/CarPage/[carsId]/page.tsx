import { notFound } from "next/navigation";
import { carService } from "@monorepo/api-client/src/services/carService";
import { CarPageClient } from "@/src/components/CarPage/CarPage";

// ✅ تایپ پراپس‌ها را اصلاح می‌کنیم تا Promise بودن را منعکس کند
interface PageProps {
  params: Promise<{ carsId: string }>;
  searchParams: Promise<{ page?: string }>;
}

// ✅ 1. تولید متادیتا داینامیک (SEO)
export async function generateMetadata({ params }: PageProps) {
  // ✨✨✨ اصلاح اصلی: ابتدا params را await می‌کنیم ✨✨✨
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

// ✅ 2. کامپوننت اصلی سرور (فقط برای دریافت دیتا)
export default async function CarPage({ params, searchParams }: PageProps) {
  // ✨✨✨ اصلاح اصلی: await کردن هر دو پراپ ✨✨✨
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const { carsId } = resolvedParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;

  // اجرای موازی درخواست‌ها برای سرعت بیشتر
  const [carData, productsData] = await Promise.all([
    carService.getCarDetails(carsId),
    carService.getCarProducts(carsId, currentPage)
  ]);

  // اگر اطلاعات خودرو وجود نداشت، صفحه 404 نمایش داده شود
  if (!carData) {
    notFound();
  }

  // پاس دادن داده‌های اولیه به کامپوننت کلاینت
  return (
    <CarPageClient 
      carData={carData} 
      initialProducts={productsData} 
    />
  );
}