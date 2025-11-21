import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Clock, CalendarDays, Layers } from 'lucide-react'; // ایمپورت آیکون‌های جدید
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
      {/* --- بخش تصویر --- */}
      <div className="article-row__image-wrapper">
        <Image 
          src={imgSrc} 
          alt={title} 
          fill 
          className="article-row__image" 
        />
        {/* تگ دسته‌بندی روی عکس (فقط در موبایل نمایش داده می‌شود) */}
        <span className="article-row__mobile-tag lg:hidden">
          {category}
        </span>
      </div>

      {/* --- بخش محتوا --- */}
      <div className="article-row__content">
        
        {/* بدنه اصلی: تیتر و خلاصه */}
        <div className="article-row__body">
          <Label 
            as="h3" 
            size="lg" 
            weight="bold" 
            className="article-row__title group-hover:text-brand-primary transition-colors"
          >
            {title}
          </Label>
          
          <Label 
            as="p" 
            size="sm" 
            color="secondary" 
            className="article-row__excerpt"
          >
            {excerpt}
          </Label>
        </div>

        {/* فوتر کارت: متا دیتا و دکمه */}
        <div className="article-row__footer">
          
          {/* گروه اطلاعات متا (سمت راست) */}
          <div className="article-row__meta-group">
            
            {/* تاریخ */}
            <div className="article-row__meta-item">
              <CalendarDays size={14} className="text-text-placeholder" />
              <Label size="xs" color="placeholder">{date}</Label>
            </div>

            {/* جداکننده نقطه‌ای */}
            <span className="article-row__dot"></span>

            {/* دسته‌بندی */}
            <div className="article-row__meta-item">
              <Layers size={14} className="text-brand-primary" />
              <Label size="xs" color="primary" weight="medium">{category}</Label>
            </div>

            {/* زمان مطالعه (اگر موجود باشد) */}
            {readTime && (
              <>
                <span className="article-row__dot hidden sm:block"></span>
                <div className="article-row__meta-item hidden sm:flex">
                  <Clock size={14} className="text-brand-accent" />
                  <Label size="xs" color="placeholder">
                    {readTime} دقیقه <span className="hidden xl:inline">زمان مطالعه</span>
                  </Label>
                </div>
              </>
            )}
          </div>

          {/* دکمه ادامه مطلب (سمت چپ - چسبیده به انتها) */}
          <div className="article-row__cta">
            <Label size="sm" weight="semi-bold" className="text-brand-primary">ادامه مطلب</Label>
            <ChevronLeft size={16} className="text-brand-primary" />
          </div>

        </div>
      </div>
    </Link>
  );
};