import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { aboutUsService } from '@monorepo/api-client/src/services/aboutUsService';

// --- Design System Imports ---
import { Container } from '@monorepo/design-system/src/components/organisms/Container/Container';
import { ContentSection } from '@monorepo/design-system/src/components/molecules/ContentSection/ContentSection';
import { Label } from '@monorepo/design-system/src/components/atoms/Label/Label';

// --- Metadata (داینامیک) ---
export async function generateMetadata(): Promise<Metadata> {
  const pageData = await aboutUsService.getAboutUsPageData();

  if (!pageData) {
    return {
      title: 'درباره ما | فروشگاه اینترنتی یدکی‌ران',
      description: 'آشنایی با داستان شکل‌گیری، اهداف و تعهدات فروشگاه اینترنتی یدکی‌ران.',
    };
  }

  return {
    title: pageData.metaTitle || 'درباره ما | یدکی‌ران',
    description: pageData.metaDescription,
    alternates: {
      canonical: pageData.canonicalUrl,
    },
  };
}

export default async function AboutPage() {
  const pageData = await aboutUsService.getAboutUsPageData();

  // ✅ اصلاح: اضافه کردن پرانتز و fallback آرایه خالی قبل از فراخوانی .find()
  const mainBanner = (pageData?.banners || []).find(b => String(b.bannerPlace) === "AboutUsMain" || String(b.bannerPlace) === "TrustUsMain");
  const fallbackBanner = "/aboutus.png";

  return (
    <div className="bg-bg-body min-h-screen pb-20">
      
      {/* === بخش ۱: بنر تمام‌عرض (داینامیک) === */}
      <section className="relative w-full h-64 lg:h-80">
        <Image 
            src={mainBanner ? `https://api-yadakirun.yadakchi.com${mainBanner.image}` : fallbackBanner}
            alt={mainBanner?.imageAlt || "درباره فروشگاه یدکی‌ران"}
            fill
            className="object-cover"
            priority
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 flex items-center justify-center z-10">
            <Label as="h1" size="4x" weight="black" className="text-white drop-shadow-md">
              {pageData?.pageName ? `درباره ${pageData.pageName.replace('AboutUs', 'ما')}` : 'درباره ما'}
            </Label>
        </div>
      </section>

      <Container>
        <div className="relative z-10 -mt-16 lg:-mt-24 mb-10">
            <div className="bg-surface rounded-3xl shadow-xl border border-border-secondary p-6 md:p-10 lg:p-14">
                
                <div className="space-y-12">
                    {/* این بخش چون از قبل شرط && دارد، ایمن است */}
                    {pageData?.description && (
                        <ContentSection title="درباره ما">
                            <Label as="p" size="base" className="leading-loose text-justify text-text-secondary whitespace-pre-line">
                                {pageData.description}
                            </Label>
                        </ContentSection>
                    )}
                </div>

            </div>
        </div>
      </Container>
    </div>
  );
}