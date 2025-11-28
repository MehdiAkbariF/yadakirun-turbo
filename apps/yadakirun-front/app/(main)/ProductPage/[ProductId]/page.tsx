import { notFound } from "next/navigation";
import { productService } from "@monorepo/api-client/src/services/productService";
import { ProductPageClient } from "@/src/components/ProductPage/ProductPageClient"; // کامپوننت کلاینت جدید

interface PageProps {
  params: Promise<{ ProductId: string }>;
}

// 1. تولید متادیتا داینامیک برای SEO
export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const { ProductId } = resolvedParams;

  const productData = await productService.getProductDetails(ProductId);

  if (!productData) {
    return { title: "محصول یافت نشد" };
  }

  return {
    title: productData.metaTitle || productData.title,
    description: productData.metaDescription,
    alternates: {
      canonical: productData.canonicalUrl,
    },
  };
}

// 2. کامپوننت اصلی سرور
export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { ProductId } = resolvedParams;

  const productData = await productService.getProductDetails(ProductId);

  if (!productData) {
    notFound(); // اگر محصول وجود نداشت، صفحه 404
  }

  // پاس دادن داده‌ها به کامپوننت کلاینت
  return (
    <ProductPageClient productData={productData} />
  );
}