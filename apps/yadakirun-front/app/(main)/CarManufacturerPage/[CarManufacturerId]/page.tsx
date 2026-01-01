import { notFound, redirect } from "next/navigation";
import { manufacturerService } from "@monorepo/api-client/src/services/manufacturerService";
import { ManufacturerPageClient } from "@/src/components/BrandPage/ManufacturerPageClient";

interface PageProps {
  // پارامتر ورودی با نام پوشه [CarManufacturerId] یکی است
  // اما می‌تواند حاوی ID یا EnglishName باشد
  params: Promise<{ CarManufacturerId: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const { CarManufacturerId } = resolvedParams;

  const manufacturerData =
    await manufacturerService.getManufacturerDetails(CarManufacturerId);

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

export default async function CarManufacturerPage({
  params,
  searchParams,
}: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const { CarManufacturerId } = resolvedParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;

  // 1. ابتدا دریافت اطلاعات برند (با قابلیت پشتیبانی از Slug یا ID)
  const manufacturerData =
    await manufacturerService.getManufacturerDetails(CarManufacturerId);

  if (!manufacturerData) {
    notFound();
  }

  // 2. دریافت محصولات با استفاده از ID واقعی و قطعی برند
  const productsData = await manufacturerService.getManufacturerProducts(
    manufacturerData.id,
    currentPage
  );

  // 3. ✅ لاجیک ریدایرکت سئو (SEO Redirect Logic)
  // اگر کاربر با ID وارد شده باشد (/12) ولی برند دارای نام انگلیسی باشد (/bmw)، ریدایرکت می‌شود.
  const currentSlug = decodeURIComponent(CarManufacturerId);
  // فرض بر این است که API فیلدی به نام englishName یا englishTitle برمی‌گرداند (بسته به تایپ‌های شما)
  // در اینجا از englishName استفاده شده، اگر در تایپ manufacturer.types.ts نامش englishTitle است، تغییر دهید.
  const standardSlug =
    (manufacturerData as any).englishName ||
    (manufacturerData as any).englishTitle;

  if (standardSlug && currentSlug !== standardSlug) {
    // فقط در صفحه اول ریدایرکت می‌کنیم تا در صفحه‌بندی اختلال ایجاد نشود
    if (currentPage === 1) {
      redirect(`/CarManufacturerPage/${standardSlug}`);
    }
  }

  return (
    <ManufacturerPageClient
      manufacturerData={manufacturerData}
      initialProducts={productsData}
    />
  );
}
