"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Maximize2, X } from 'lucide-react';
import './ProductGallery.scss';

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export const ProductGallery = ({ images, alt }: ProductGalleryProps) => {
  const [mainImage, setMainImage] = useState(images[0]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // آپدیت کردن تصویر اصلی در صورت تغییر پراپس
  useEffect(() => {
    setMainImage(images[0]);
  }, [images]);

  // جلوگیری از اسکرول صفحه وقتی مودال باز است
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isFullscreen]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // اگر در حالت تمام صفحه هستیم، زوم موس را غیرفعال کن (اختیاری)
    if (isFullscreen || !containerRef.current || !imageRef.current) return;
    
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    imageRef.current.style.transformOrigin = `${x}% ${y}%`;
    imageRef.current.style.transform = 'scale(2)';
  };

  const handleMouseLeave = () => {
    if (imageRef.current) {
      imageRef.current.style.transform = 'scale(1)';
    }
  };

  const toggleFullscreen = (e?: React.MouseEvent) => {
    e?.stopPropagation(); // جلوگیری از تریگر شدن ایونت‌های والد
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      <div className="product-gallery">
        {/* کانتینر اصلی عکس */}
        <div 
          className="product-gallery__main" 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => !isFullscreen && toggleFullscreen()} // کلیک روی عکس هم بازش کنه
        >
          <Image 
            ref={imageRef}
            src={mainImage} 
            alt={alt} 
            fill 
            className="product-gallery__img" 
          />
          
          {/* دکمه اکسپند */}
          <button 
            className="product-gallery__expand-btn"
            onClick={toggleFullscreen}
            type="button"
            aria-label="مشاهده تمام صفحه"
          >
            <Maximize2 size={20} />
          </button>
        </div>
        
        {/* تامنیل‌ها */}
        <div className="product-gallery__thumbnails">
          {images.map((img, idx) => (
            <button 
              key={idx} 
              className={`product-gallery__thumb ${mainImage === img ? 'product-gallery__thumb--active' : ''}`}
              onClick={() => setMainImage(img)}
            >
              <Image src={img} alt={`${alt} ${idx + 1}`} width={80} height={80} className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* مودال تمام صفحه */}
      {isFullscreen && (
        <div className="product-gallery-modal" onClick={toggleFullscreen}>
          <button className="product-gallery-modal__close" onClick={toggleFullscreen}>
            <X size={32} />
          </button>
          
          <div className="product-gallery-modal__content" onClick={(e) => e.stopPropagation()}>
            <Image 
              src={mainImage} 
              alt={alt} 
              fill 
              className="product-gallery-modal__img"
              quality={100} // کیفیت بالا در حالت فول اسکرین
            />
          </div>

          {/* تامنیل‌ها در حالت مودال (اختیاری برای راحتی کاربر) */}
          <div className="product-gallery-modal__thumbs" onClick={(e) => e.stopPropagation()}>
             {images.map((img, idx) => (
                <button 
                  key={idx} 
                  className={`product-gallery-modal__thumb-btn ${mainImage === img ? 'active' : ''}`}
                  onClick={() => setMainImage(img)}
                >
                   <Image src={img} alt="thumb" width={60} height={60} className="object-cover" />
                </button>
             ))}
          </div>
        </div>
      )}
    </>
  );
};