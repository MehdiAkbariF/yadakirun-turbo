"use client";
import { useState } from "react";
import {
  CheckCircle, Car, Wrench, ShieldCheck, Headset, X,
} from "lucide-react";
import { ProductPageData } from "@monorepo/api-client/src/types/product.types";

// --- Design System Imports ---
import { Container } from "@monorepo/design-system/src/components/organisms/Container/Container";
import { Label } from "@monorepo/design-system/src/components/atoms/Label/Label";
import { Badge } from "@monorepo/design-system/src/components/atoms/Badge/Badge";
import { Breadcrumb } from "@monorepo/design-system/src/components/molecules/Breadcrumb/Breadcrumb";
import { ProductGallery } from "@monorepo/design-system/src/components/organisms/ProductGallery/ProductGallery";
import { ProductInfoCard, PackagingOption } from "@monorepo/design-system/src/components/organisms/ProductInfoCard/ProductInfoCard";
import { ServiceFeatures } from "@monorepo/design-system/src/components/molecules/ServiceFeatures/ServiceFeatures";
import { CommentsSection } from "@monorepo/design-system/src/components/organisms/CommentsSection/CommentsSection";
import { BestSellersSlider } from "@/src/components/layout/BestSellersSlider";
import { CommentFormModal } from "@monorepo/design-system/src/components/organisms/CommentFormModal/CommentFormModal";
import { ContentSection } from "@monorepo/design-system/src/components/molecules/ContentSection/ContentSection";

// --- داده‌های استاتیک ---
const serviceItems = [
  { icon: <Wrench size={28} />, title: "مهلت مرجوعی", description: "تا ۲۴ ساعت پس از تحویل" },
  { icon: <ShieldCheck size={28} />, title: "ضمانت اصالت", description: "تضمین اصل بودن تمام قطعات" },
  { icon: <Headset size={28} />, title: "پشتیبانی", description: "مشاوره تخصصی رایگان" },
];
// const similarProducts = [
//   // این بخش نیازمند API جداگانه است
// ];

interface ProductPageClientProps {
  productData: ProductPageData;
}

export function ProductPageClient({ productData }: ProductPageClientProps) {
  const [selectedPackage, setSelectedPackage] = useState<PackagingOption | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddComment = (data: any) => {
    console.log("New Comment:", data);
    setIsModalOpen(false);
  };

  // تبدیل داده‌های API به فرمت مورد نیاز کامپوننت‌ها
  const galleryImages = [productData.imageUrl, ...productData.gallery.map(img => img.imageUrl)];
  const packagingOptions = productData.productPackages.map(pkg => ({ id: String(pkg.id), label: pkg.name }));
  const breadcrumbItems = [
    { label: "محصولات", href: "/products" },
    { label: productData.productCategory.name, href: `/category/${productData.productCategory.id}` },
    { label: productData.title, href: "#" },
  ];
  const stats = {
      averageRating: productData.comments.reduce((acc, c) => acc + c.rating, 0) / productData.comments.length || 0,
      reviewCount: productData.comments.length
  };

  return (
    <div className="bg-body min-h-screen ">
      <Container>
        <div className="pt-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-10 gap-2 ">
          <div className="order-1 lg:col-span-7 lg:row-start-1">
            <div className="flex flex-col lg:flex-row p-4 bg-surface rounded-3xl shadow-sm border border-border-secondary">
              <div className="lg:w-1/3 mb-6 lg:mb-0">
                <ProductGallery images={galleryImages} alt={productData.imageAlt || productData.title} />
              </div>
              <div className="flex flex-col w-full lg:w-2/3  sm:p-6 lg:p-8">
                <Label as="h1" size="lg" weight="extra-bold" className="text-heading mb-2">{productData.title}</Label>
                <Label size="sm" color="placeholder" className="font-sans mb-6 block">{productData.englishTitle}</Label>
                
                {productData.color && (
                    <>
                        <hr className="my-6 border-border-secondary" />
                        <div className="flex items-center gap-4">
                            <Label weight="bold" size="sm">رنگ:</Label>
                            <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full border border-border-secondary" style={{ backgroundColor: productData.color.hexCode }}></span>
                                <Label size="sm" color="primary" weight="semi-bold">{productData.color.name}</Label>
                            </div>
                        </div>
                    </>
                )}

                {packagingOptions.length > 0 && (
                  <>
                    <hr className="my-6 border-border-secondary" />
                    <div className="space-y-4">
                      <div className="flex items-baseline gap-4">
                        <Label weight="bold" size="sm">بسته بندی:</Label>
                        <Label size="xs" color="secondary" weight="semi-bold">{selectedPackage ? selectedPackage.label : "یک مورد را انتخاب کنید"}</Label>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {packagingOptions.map((option) => (
                          <button key={option.id} onClick={() => setSelectedPackage(option)} className={`px-4 py-2 rounded-lg border transition-all text-xs md:text-sm font-semibold cursor-pointer ${selectedPackage?.id === option.id ? "bg-brand-primary border-brand-primary text-on-brand shadow-md" : "bg-bg-secondary border-border-secondary text-text-secondary hover:border-brand-primary"}`}>
                            {option.label}
                          </button>
                        ))}
                        {selectedPackage && ( <button onClick={() => setSelectedPackage(null)} className="flex items-center gap-1 px-3 py-2 text-utility-error text-xs font-bold hover:bg-utility-error/5 rounded-lg transition-colors"><X size={16} /> لغو</button>)}
                      </div>
                    </div>
                  </>
                )}

                <hr className="my-6 border-border-secondary" />

                <div className=" border border-border-secondary rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle size={20} className="text-utility-success" />
                    <Label weight="bold" size="sm">ویژگی‌های اصلی</Label>
                  </div>
                  <div className="space-y-3">
                    {productData.mainProductDetails.map(detail => (
                        <div key={detail.name} className="flex justify-between">
                          <Label size="sm" color="secondary" weight="bold">{detail.name}:</Label>
                          <Label size="sm" weight="bold" color="brand-primary">{detail.value}</Label>
                        </div>
                    ))}
                  </div>
                </div>

                <div className="bg-bg-secondary border border-border-secondary rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Car size={20} className="text-text-placeholder" />
                    <Label weight="bold" size="sm">مناسب برای:</Label>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="info" className="px-3 py-1 font-medium border border-border-secondary">
                      <Label size="xs" weight="bold" color="on-brand">{productData.car.modelName}</Label>
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-2 lg:col-span-3 lg:row-start-1 lg:row-span-2">
            <ProductInfoCard
              price={productData.priceAfterDiscount}
              originalPrice={productData.price}
              discountAmount={productData.price - productData.priceAfterDiscount}
              seller={"یدکی‌ران"} // استاتیک
              rating={stats.averageRating}
              reviewCount={stats.reviewCount}
              views={productData.views}
              inStock={productData.quantity > 0}
              guarantee={productData.warranty.title}
              shippingInfo={productData.quantity > 0 ? "موجود در انبار (ارسال فوری)" : "ناموجود"}
              packagingOptions={packagingOptions}
            />
          </div>

          <div className="order-3 lg:col-span-7 lg:row-start-2">
            <ServiceFeatures items={serviceItems} />
          </div>
        </div>

        {productData.description && (
          <ContentSection title="توضیحات" className="mt-8 shadow-sm border border-border-secondary rounded-2xl bg-surface p-6">
            <Label as="p" size="base" color="secondary" className="leading-loose text-justify whitespace-pre-line">{productData.description}</Label>
          </ContentSection>
        )}

        {productData.allProductDetails.length > 0 && (
            <ContentSection title="مشخصات کامل" className="mt-8 shadow-sm border border-border-secondary rounded-2xl bg-surface p-6">
                {productData.allProductDetails.map(group => (
                    <div key={group.name} className="mb-8 last:mb-0">
                        <Label as="h3" size="lg" weight="bold" className="mb-4 block">{group.name}</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            {group.productDetail.map((spec, idx) => (
                              <div key={idx} className="flex justify-between border-b border-border-secondary pb-2 last:border-0">
                                <Label size="sm" color="placeholder" weight="bold" className="mb-1 sm:mb-0">{spec.name}</Label>
                                <Label size="sm" weight="medium" color="primary">{spec.value}</Label>
                              </div>
                            ))}
                        </div>
                    </div>
                ))}
            </ContentSection>
        )}

        <div className="mt-10">
          <CommentsSection
            comments={productData.comments}
            stats={stats}
            onAddComment={() => setIsModalOpen(true)}
          />
        </div>

        {/* {similarProducts.length > 0 && (
          <div className="">
            <BestSellersSlider title="محصولات مشابه" items={similarProducts} uniqueId="similar-products-page" />
          </div>
        )} */}
      </Container>

      <CommentFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddComment} />
    </div>
  );
}