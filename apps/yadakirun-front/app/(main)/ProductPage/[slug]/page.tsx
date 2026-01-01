import { notFound } from "next/navigation";
import { productService } from "@monorepo/api-client/src/services/productService";
import { ProductPageClient } from "@/src/components/ProductPage/ProductPageClient";

interface PageProps {
  
  params: Promise<{ slug: string }>;
}


export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  
  const englishName = resolvedParams.slug;

  const productData = await productService.getProductDetails(englishName);

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


export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await params;
  
  const englishName = resolvedParams.slug;

  const productData = await productService.getProductDetails(englishName);

  if (!productData) {
    notFound(); 
  }

  return (
    <ProductPageClient productData={productData} />
  );
}