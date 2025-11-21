"use client";

import React from "react";
import { NewsSlider } from "@monorepo/design-system/src/components/molecules/NewsSlider/NewsSlider";
import { Label } from "@monorepo/design-system/src/components/atoms/Label/Label";
import { useMediaQuery } from "@/src/hooks/useMediaQuery";
import { NewsCardProps } from "@monorepo/design-system/src/components/atoms/NewsCard/NewsCard.types";

interface NewsSectionProps {
  title: string;
  items: Omit<NewsCardProps, 'className'>[];
  uniqueId: string;
}

export const NewsSection = ({ title, items, uniqueId }: NewsSectionProps) => {
  const isMobile = useMediaQuery("(max-width: 1023px)");

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto py-12">
      <div className="mb-8 text-right border-r-4 border-accent pr-4 pt-2">
        <Label as="h2" size="xl" weight="extra-bold">{title}</Label>
      </div>
      <NewsSlider 
        items={items} 
        direction={isMobile ? 'vertical' : 'horizontal'}
        uniqueId={uniqueId}
      />
      {/* ✅✅✅ استایل‌های اضافی حذف شدند ✅✅✅ */}
      <style jsx global>{`
        .swiper-button-next, .swiper-button-prev {
            color: var(--color-text-primary);
            transition: color 0.2s;
        }
        .swiper-button-next:hover, .swiper-button-prev:hover {
            color: var(--color-brand-primary);
        }
      `}</style>
    </section>
  );
};