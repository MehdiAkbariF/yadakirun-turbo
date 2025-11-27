import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar } from 'lucide-react';
import { BlogCardProps } from './BlogCard.types';
import { Label } from '../../atoms/Label/Label';
import { Badge } from '../../atoms/Badge/Badge'; // ✅ ایمپورت Badge
import { toPersianDigits } from '../../../utils/persian'; // ✅ ایمپورت مبدل اعداد
import './BlogCard.scss';

export const BlogCard = ({
  title,
  excerpt,
  imgSrc,
  category,
  date,
  href,
  readTime,
  className,
  ...props
}: BlogCardProps) => {
  return (
    <Link href={href} className={`blog-card ${className || ''}`} {...props}>
      
      <div className="blog-card__image-wrapper">
        <Image 
          src={imgSrc} 
          alt={title} 
          fill 
          className="blog-card__image" 
        />
        
        {/* ✅ استفاده از Badge برای دسته‌بندی */}
        <div className="blog-card__category">
          <Badge variant="secondary" className="text-xs font-bold shadow-sm" >
            <Label size='xs' color='brand-primary' weight='bold' >{category}</Label>
            
          </Badge>
        </div>
      </div>

      <div className="blog-card__content">
        <div className="blog-card__meta">
          <div className="flex items-center gap-1">
            <Calendar size={14} className="text-text-placeholder" />
            {/* ✅ تبدیل تاریخ به فارسی */}
            <Label size="xs" color="secondary">{toPersianDigits(date)}</Label>
          </div>
          
          {readTime && (
            <div className="flex items-center gap-1">
              <Clock size={14} className="text-text-placeholder" />
              {/* ✅ تبدیل زمان مطالعه به فارسی */}
              <Label size="xs" color="secondary">
                {toPersianDigits(readTime)} دقیقه
              </Label>
            </div>
          )}
        </div>
        
        <Label as="h3" size="sm" weight="bold" className="blog-card__title line-clamp-2">
          {title}
        </Label>
        
        {excerpt && (
          <Label size="sm" color="secondary" className="blog-card__excerpt line-clamp-3">
            {excerpt}
          </Label>
        )}
      </div>
    </Link>
  );
};