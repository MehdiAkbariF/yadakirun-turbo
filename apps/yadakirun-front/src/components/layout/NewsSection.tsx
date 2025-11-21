"use client";

import React from "react";
import { NewsSlider } from "@monorepo/design-system/src/components/molecules/NewsSlider/NewsSlider";
import { Label } from "@monorepo/design-system/src/components/atoms/Label/Label";
import { NewsCardProps } from "@monorepo/design-system/src/components/atoms/NewsCard/NewsCard.types";

interface NewsSectionProps {
  title: string;
  items: Omit<NewsCardProps, 'className'>[];
  uniqueId: string;
}

export const NewsSection = ({ title, items, uniqueId }: NewsSectionProps) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto py-12">
      <div className="mb-8 text-right border-r-4 border-brand-accent pr-4 pt-2">
        <Label as="h2" size="xl" weight="extra-bold">{title}</Label>
      </div>
      
      {/* ✅ همیشه horizontal باشد تا در موبایل هم اسکرول افقی داشته باشیم */}
      <NewsSlider 
        items={items} 
        direction="horizontal" 
        uniqueId={uniqueId}
      />

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