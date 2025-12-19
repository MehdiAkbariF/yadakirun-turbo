import { notFound } from "next/navigation";
import { manufacturerService } from "@monorepo/api-client/src/services/manufacturerService";
import { ManufacturerPageClient } from "@/src/components/BrandPage/ManufacturerPageClient"; // ما همچنان از همان کامپوننت کلاینت استفاده می‌کنیم

// ✨ 1. اینترفیس پراپس‌ها برای مطابقت با نام پوشه جدید به‌روز شد
interface PageProps {
  params: Promise<{ CarManufacturerId: string }>;
}

// ✨ 2. تولید متادیتا داینامیک (SEO) با پارامتر جدید
export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const { CarManufacturerId } = resolvedParams;

  const manufacturerData = await manufacturerService.getManufacturerDetails(CarManufacturerId);

  if (!manufacturerData) {
    return { title: "برند یافت نشد" };
  }

  return {
    title: manufacturerData.metaTitle || `${manufacturerData.name} | یدکی‌ران`,
    description: manufacturerData.metaDescription,
    alternates: {
      canonical: manufacturerData.canonicalUrl,
    },
  };
}

export default async function CarManufacturerPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const { CarManufacturerId } = resolvedParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;

  // ✨ 2. اجرای موازی هر دو درخواست API
  const [manufacturerData, productsData] = await Promise.all([
    manufacturerService.getManufacturerDetails(CarManufacturerId),
    manufacturerService.getManufacturerProducts(CarManufacturerId, currentPage)
  ]);

  if (!manufacturerData) {
    notFound();
  }

 
  return (
    <ManufacturerPageClient 
      manufacturerData={manufacturerData} 
      initialProducts={productsData}
    />
  );
}
