"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import {
  CheckCircle,
  Car,
  Wrench,
  ShieldCheck,
  Headset,
  X,
  ChevronLeft,
} from "lucide-react";

// --- Design System Imports ---
import { Container } from "@monorepo/design-system/src/components/organisms/Container/Container";
import { Label } from "@monorepo/design-system/src/components/atoms/Label/Label";
import { Badge, BadgeVariant } from "@monorepo/design-system/src/components/atoms/Badge/Badge";
import { Breadcrumb } from "@monorepo/design-system/src/components/molecules/Breadcrumb/Breadcrumb";
import { ProductGallery } from "@monorepo/design-system/src/components/organisms/ProductGallery/ProductGallery";
import {
  ProductInfoCard,
  PackagingOption,
} from "@monorepo/design-system/src/components/organisms/ProductInfoCard/ProductInfoCard";
import { ServiceFeatures } from "@monorepo/design-system/src/components/molecules/ServiceFeatures/ServiceFeatures";
import { CommentsSection } from "@monorepo/design-system/src/components/organisms/CommentsSection/CommentsSection";
import { BestSellersSlider } from "@/src/components/layout/BestSellersSlider";
import { CommentFormModal } from "@monorepo/design-system/src/components/organisms/CommentFormModal/CommentFormModal";
import { ContentSection } from "@monorepo/design-system/src/components/molecules/ContentSection/ContentSection";

// --- Mock Data ---
const productData = {
  id: "bs-1",
  name: "کیت تسمه تایم اصلی رنو تندر 90 (L90)",
  englishTitle: "Genuine Timing Belt Kit for Renault Tondar 90",
  price: 2300000,
  originalPrice: 2550000,
  discountAmount: 250000,
  inStock: true,
  views: 2450,
  rating: 4.5,
  reviewCount: 18,
  seller: "یدکی‌ران",
  guarantee: "ضمانت اصالت و سلامت فیزیکی کالا",
  shippingInfo: "موجود در انبار (ارسال فوری)",
  brand: "رنو",
  carMaker: "Renault",
  images: ["/LandRover.svg", "/Renault.svg", "/LandRover.svg"],
  // ✨ داده‌های جدید برای رنگ‌ها
  availableColors: [
    { id: 'color-1', name: 'مشکی', hex: '#212529' },
    { id: 'color-2', name: 'نقره‌ای', hex: '#ced4da' },
    { id: 'color-3', name: 'سفید', hex: '#f8f9fa', isBordered: true },
  ],
  packagingOptions: [
    { id: "pack-10", label: "بسته بندی ۱۰ عددی" },
    { id: "pack-20", label: "بسته بندی ۲۰ عددی" },
    { id: "pack-30", label: "بسته بندی ۳۰ عددی" },
  ],
  suitableFor: ["رنو تندر 90", "رنو ساندرو", "رنو پارس تندر", "رنو استپ وی"],
  description: {
    sections: [
      {
        title: "دستیگره بیرونی درب لندرور و پاژن سانتانا چیست؟",
        content:
          "دستیگره بیرونی درب به کاربر اجازه می‌دهد تا به‌راحتی درب را باز یا بسته کند. این قطعه با طراحی ارگونومیک و مواد مقاوم، به‌گونه‌ای ساخته شده که دوام و عملکرد مطلوبی را حتی در شرایط سخت جاده‌ای تضمین کند.",
      },
      {
        title: "کاربرد محصول",
        content:
          "کاربرد اصلی دستیگره بیرونی درب، فراهم کردن دسترسی آسان و مطمئن به داخل خودرو است.",
      },
    ],
    specs: [
      {
        title: "جنس",
        content: "ساخته شده از مواد مقاوم پلاستیکی یا فلزی با روکش ضدخوردگی.",
      },
      {
        title: "طراحی ارگونومیک",
        content:
          "به‌گونه‌ای طراحی شده که استفاده آسان و راحت را برای کاربر فراهم کند.",
      },
    ],
  },
  performance: "عالی",
};

const serviceItems = [
  {
    icon: <Wrench size={28} />,
    title: "مهلت مرجوعی",
    description: "تا ۲۴ ساعت پس از تحویل در صورت مغایرت",
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "ضمانت اصالت",
    description: "تضمین اصل بودن تمام قطعات",
  },
  {
    icon: <Headset size={28} />,
    title: "پشتیبانی",
    description: "مشاوره تخصصی رایگان قبل از خرید",
  },
];

const similarProducts = [
  { id: "1", title: "تسمه دینام ال 90", href: "#", imgSrc: "/Renault.svg", price: 450000, rating: 4.2 },
  { id: "2", title: "شمع موتور رنو", href: "#", imgSrc: "/Renault.svg", price: 120000, rating: 4.8 },
  { id: "3", title: "شمع موتور رنو", href: "#", imgSrc: "/Renault.svg", price: 120000, rating: 4.8 },
  { id: "4", title: "شمع موتور رنو", href: "#", imgSrc: "/Renault.svg", price: 120000, rating: 4.8 },
  { id: "5", title: "شمع موتور رنو", href: "#", imgSrc: "/Renault.svg", price: 120000, rating: 4.8 },
  { id: "6", title: "شمع موتور رنو", href: "#", imgSrc: "/Renault.svg", price: 120000, rating: 4.8 },
];

const mockComments = [
  { id: 1, author: "علی محمدی", date: "۳ روز پیش", authorType: "buyer", rating: 5, content: "کیفیت عالی و بسته بندی اورجینال بود.", likes: 8, dislikes: 0, isBuyer: true },
];

const stats = { averageRating: 4.5, reviewCount: 18 };

const performanceStyles: Record<string, { text: string; variant: BadgeVariant }> = {
  عالی: { text: "عالی", variant: "success" },
  متوسط: { text: "متوسط", variant: "warning" },
  ضعیف: { text: "ضعیف", variant: "error" },
};

interface ProductColor {
  id: string;
  name: string;
  hex: string;
  isBordered?: boolean;
}

export default function ProductDetailsPage() {
  const params = useParams();
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(productData.availableColors[0] || null);
  const [selectedPackage, setSelectedPackage] = useState<PackagingOption | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddComment = (data: any) => {
    console.log("New Comment:", data);
    setIsModalOpen(false);
  };

  const perfStyle = performanceStyles[productData.performance];

  return (
    <div className="bg-body min-h-screen ">
      <Container>
        <div className="pt-6">
          <Breadcrumb
            items={[
              { label: "محصولات", href: "/products" },
              { label: "قطعات موتوری", href: "/category/engine" },
              { label: productData.name, href: "#" },
            ]}
          />
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-10 gap-2 ">
          <div className="order-1 lg:col-span-7 lg:row-start-1">
            <div className="flex flex-col lg:flex-row p-4 bg-surface rounded-3xl shadow-sm border border-border-secondary">
              <div className="lg:w-1/3 mb-6 lg:mb-0">
                <ProductGallery
                  images={productData.images}
                  alt={productData.name}
                />
              </div>

              <div className="flex flex-col w-full lg:w-2/3  sm:p-6 lg:p-8">
                <Label
                  as="h1"
                  size="lg"
                  weight="extra-bold"
                  className="text-heading mb-2"
                >
                  {productData.name}
                </Label>
                <Label
                  size="sm"
                  color="placeholder"
                  className="font-sans mb-6 block"
                >
                  {productData.englishTitle}
                </Label>

                {/* --- بخش جدید انتخاب رنگ --- */}
                {productData.availableColors.length > 0 && (
                  <>
                    <hr className="my-6 border-border-secondary" />
                    <div className="space-y-4">
                      <div className="flex items-baseline gap-4">
                        <Label weight="bold" size="sm">رنگ:</Label>
                        <Label size="sm" color="primary" weight="semi-bold">{selectedColor ? selectedColor.name : "یک رنگ را انتخاب کنید"}</Label>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        {productData.availableColors.map((color) => (
                          <button
                            key={color.id}
                            onClick={() => setSelectedColor(color)}
                            aria-label={`انتخاب رنگ ${color.name}`}
                            className={`w-8 h-8 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center
                                        ${color.isBordered ? 'border-2 border-border-secondary' : ''}
                                        ${selectedColor?.id === color.id ? 'ring-2 ring-offset-2 ring-brand-primary' : 'hover:scale-110'}`}
                            style={{ backgroundColor: color.hex }}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* --- بخش انتخاب بسته‌بندی --- */}
                {productData.packagingOptions.length > 0 && (
                  <>
                    <hr className="my-6 border-border-secondary" />
                    <div className="space-y-4">
                      <div className="flex items-baseline gap-4">
                        <Label weight="bold" size="sm">بسته بندی:</Label>
                        <Label size="xs" color="secondary" weight="semi-bold">{selectedPackage ? selectedPackage.label : "یک مورد را انتخاب کنید"}</Label>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {productData.packagingOptions.map((option) => (
                          <button
                            key={option.id}
                            onClick={() => setSelectedPackage(option)}
                            className={`px-4 py-2 rounded-lg border transition-all text-xs md:text-sm font-semibold cursor-pointer
                                        ${selectedPackage?.id === option.id
                                            ? "bg-brand-primary border-brand-primary text-on-brand shadow-md"
                                            : "bg-bg-secondary border-border-secondary text-text-secondary hover:border-brand-primary"}`}
                          >
                            {option.label}
                          </button>
                        ))}
                        {selectedPackage && (
                          <button onClick={() => setSelectedPackage(null)} className="flex items-center gap-1 px-3 py-2 text-utility-error text-xs font-bold hover:bg-utility-error/5 rounded-lg transition-colors">
                            <X size={16} /> لغو
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                )}

                <hr className="my-6 border-border-secondary" />

                <div className="flex flex-wrap justify-between items-center gap-4 w-full mb-6">
                  <div className="flex items-center gap-2">
                    <Label size="sm" color="secondary" weight="bold">فروشنده:</Label>
                    <Label size="xs" weight="bold" color="link">{productData.seller}</Label>
                  </div>
                  {perfStyle && (
                    <div className="flex items-center gap-2">
                      <Badge variant={perfStyle.variant} className="px-3 py-1">
                        <Label size="sm" color="on-brand" className="opacity-80 pl-3">عملکرد:</Label>
                        <Label size="sm" color="on-brand" className="opacity-80 pl-3" weight="extra-bold">{perfStyle.text}</Label>
                      </Badge>
                    </div>
                  )}
                </div>

                <div className=" border border-border-secondary rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle size={20} className="text-utility-success" />
                    <Label weight="bold" size="sm">ویژگی‌ها</Label>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label size="sm" color="secondary" weight="bold">برند:</Label>
                      <Label size="sm" weight="bold" color="brand-primary">{productData.brand}</Label>
                    </div>
                    <div className="flex justify-between">
                      <Label size="sm" color="secondary" weight="bold">خودروساز:</Label>
                      <Label size="sm" weight="bold" color="brand-primary">{productData.carMaker}</Label>
                    </div>
                  </div>
                </div>

                <div className="bg-bg-secondary border border-border-secondary rounded-lg p-4">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <Car size={20} className="text-text-placeholder" />
                      <Label weight="bold" size="sm">مناسب برای:</Label>
                    </div>
                    <button className="text-xs font-bold text-brand-primary flex items-center gap-1 hover:text-brand-primary-hover transition-colors cursor-pointer">
                      <Label size="xs" weight="bold">مشاهده بیشتر</Label>
                      <ChevronLeft size={16} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {productData.suitableFor.map((car, i) => (
                      <Badge key={i} variant="success" className="px-3 py-1 font-medium border border-border-secondary">
                        <Label size="xs" weight="bold" color="on-brand">{car}</Label>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-2 lg:col-span-3 lg:row-start-1 lg:row-span-2">
            <ProductInfoCard
              price={productData.price}
              originalPrice={productData.originalPrice}
              discountAmount={productData.discountAmount}
              seller={productData.seller}
              rating={productData.rating}
              reviewCount={productData.reviewCount}
              views={productData.views}
              inStock={productData.inStock}
              guarantee={productData.guarantee}
              shippingInfo={productData.shippingInfo}
              packagingOptions={productData.packagingOptions}
            />
          </div>

          <div className="order-3 lg:col-span-7 lg:row-start-2">
            <ServiceFeatures items={serviceItems} />
          </div>
        </div>

        <ContentSection
          title="توضیحات"
          className="mt-8 shadow-sm border border-border-secondary rounded-2xl bg-surface p-6"
        >
          <div className="space-y-8 mt-6">
            {productData.description.sections.map((section, idx) => (
              <div key={idx}>
                <Label as="h3" size="lg" weight="bold" className="mb-2 block">
                  {section.title}
                </Label>
                <Label as="p" size="base" color="secondary" className="leading-loose text-justify">
                  {section.content}
                </Label>
              </div>
            ))}
          </div>
          <hr className="my-8 border-border-secondary" />
          <Label as="h3" size="lg" weight="bold" className="mb-4 block">
            مشخصات
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {productData.description.specs.map((spec, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:justify-between border-b border-border-secondary pb-2 last:border-0"
              >
                <Label size="sm" color="placeholder" weight="bold" className="mb-1 sm:mb-0">
                  {spec.title}
                </Label>
                <Label size="sm" weight="medium" color="primary">
                  {spec.content}
                </Label>
              </div>
            ))}
          </div>
        </ContentSection>

        <div className="mt-10">
          <CommentsSection
            comments={mockComments}
            stats={stats}
            onAddComment={() => setIsModalOpen(true)}
          />
        </div>

        <div className="">
          <BestSellersSlider
            title="محصولات مشابه"
            items={similarProducts}
            uniqueId="similar-products-page"
          />
        </div>
      </Container>

      <CommentFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddComment}
      />
    </div>
  );
}