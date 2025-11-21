import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Clock, CalendarDays, Layers } from 'lucide-react';
import { Label } from '../../atoms/Label/Label';
import { ArticleRowProps } from './ArticleRow.types';
import './ArticleRow.scss';

export const ArticleRow = ({ 
  title, 
  excerpt, 
  imgSrc, 
  category, 
  date, 
  href, 
  readTime 
}: ArticleRowProps) => {
  return (
    <Link href={href} className="article-row group">
      {/* --- بخش تصویر (سمت راست) --- */}
      <div className="article-row__image-wrapper">
        <Image 
          src={imgSrc} 
          alt={title} 
          fill 
          className="article-row__image" 
        />
        {/* تگ موبایل حذف شد چون ساختار یکسان شده */}
      </div>

      {/* --- بخش محتوا (سمت چپ) --- */}
      <div className="article-row__content">
        
        <div className="article-row__body">
          <Label 
            as="h3" 
            // سایز در CSS کنترل می‌شود (برای موبایل sm برای دسکتاپ lg)
            className="article-row__title group-hover:text-brand-primary transition-colors"
            weight="bold"
          >
            {title}
          </Label>
          
          <Label 
            as="p" 
            className="article-row__excerpt"
            color="secondary"
          >
            {excerpt}
          </Label>
        </div>

        <div className="article-row__footer">
          
          <div className="article-row__meta-group">
            
            {/* تاریخ */}
            <div className="article-row__meta-item">
              <CalendarDays />
              <Label size="xs" color="placeholder">{date}</Label>
            </div>

            {/* فقط در دسکتاپ یا تبلت جداکننده و بقیه موارد نمایش داده شود اگر جا کم بود */}
            <span className="article-row__dot hidden sm:block"></span>

            {/* دسته‌بندی (در موبایل اگر جا نشد مخفی شود یا بماند) */}
            <div className="article-row__meta-item hidden sm:flex">
              <Layers className="text-brand-primary" />
              <Label size="xs" color="primary" weight="medium">{category}</Label>
            </div>

            {readTime && (
              <>
                <span className="article-row__dot hidden sm:block"></span>
                <div className="article-row__meta-item hidden sm:flex">
                  <Clock className="text-brand-accent" />
                  <Label size="xs" color="placeholder">
                    {readTime} دقیقه
                  </Label>
                </div>
              </>
            )}
          </div>

          <div className="article-row__cta">
            <Label size="sm" weight="semi-bold" className="text-brand-primary label">ادامه مطلب</Label>
            <ChevronLeft size={16} className="text-brand-primary" />
          </div>

        </div>
      </div>
    </Link>
  );
};