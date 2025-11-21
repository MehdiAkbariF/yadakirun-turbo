"use client";
import React, { useState, useMemo } from 'react';
import { MessageSquare, Filter, PenLine } from 'lucide-react';
import { Label } from '../../atoms/Label/Label';
import { CommentCard } from '../../molecules/CommentCard/CommentCard';
import { StarRating } from '../../molecules/StarRating/StarRating';
import { Pagination } from '../../molecules/Pagination/Pagination';
import { CommentFormModal } from '../CommentFormModal/CommentFormModal';
import { CommentData, ProductStats, NewCommentPayload } from '../../../types/comment.types';
import './CommentsSection.scss';

interface CommentsSectionProps {
  comments: CommentData[];
  stats: ProductStats;
  title?: string;
  onAddComment: (data: NewCommentPayload) => void;
  className?: string;
}

const COMMENTS_PER_PAGE = 5;

export const CommentsSection = ({ 
  comments, 
  stats, 
  title = "دیدگاه‌ها و امتیازات",
  onAddComment,
  className 
}: CommentsSectionProps) => {
  
  const [sort, setSort] = useState<'newest' | 'helpful' | 'buyer'>('newest');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // لاجیک مرتب‌سازی و فیلتر
  const displayedComments = useMemo(() => {
    let sorted = [...comments];
    
    if (sort === 'buyer') {
      sorted = sorted.filter(c => c.isBuyer);
    } else if (sort === 'helpful') {
      sorted = sorted.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    } else {
      // newest (فرض بر اینکه id بزرگتر جدیدتر است یا تاریخ مقایسه شود)
      sorted = sorted.sort((a, b) => Number(b.id) - Number(a.id));
    }

    return sorted;
  }, [comments, sort]);

  // لاجیک صفحه‌بندی
  const totalPages = Math.ceil(displayedComments.length / COMMENTS_PER_PAGE);
  const paginatedComments = displayedComments.slice((page - 1) * COMMENTS_PER_PAGE, page * COMMENTS_PER_PAGE);

  return (
    <section className={`comments-section ${className || ''}`} id="comments">
      
      {/* هدر بخش */}
      <div className="comments-section__header">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="text-brand-primary" />
            <Label as="h2" size="xl" weight="bold">{title}</Label>
          </div>
          <Label size="sm" color="secondary">
            امتیاز {stats.averageRating} از 5 توسط {stats.reviewCount} کاربر
          </Label>
        </div>
        
        <button onClick={() => setIsModalOpen(true)} className="ds-btn-outline">
          <PenLine size={18} />
          ثبت دیدگاه
        </button>
      </div>

      {/* خلاصه آمار (امتیاز) */}
      <div className="comments-section__stats">
        <div className="flex items-center gap-4">
          <span className="text-4xl font-bold text-brand-primary">{stats.averageRating}</span>
          <div>
            <StarRating rating={stats.averageRating} readOnly size={20} />
            <Label size="xs" color="secondary" className="mt-1">بر اساس {stats.reviewCount} نظر</Label>
          </div>
        </div>
      </div>

      {/* فیلترها */}
      <div className="comments-section__filters">
        <div className="flex items-center gap-2 text-text-secondary">
          <Filter size={16} />
          <Label size="sm" weight="medium">مرتب‌سازی:</Label>
        </div>
        <div className="flex gap-4">
          {[
            { id: 'newest', label: 'جدیدترین' },
            { id: 'buyer', label: 'دیدگاه خریداران' },
            { id: 'helpful', label: 'مفیدترین' }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => { setSort(item.id as any); setPage(1); }}
              className={`filter-btn ${sort === item.id ? 'filter-btn--active' : ''}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* لیست کامنت‌ها */}
      <div className="comments-section__list space-y-4">
        {paginatedComments.length > 0 ? (
          paginatedComments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))
        ) : (
          <div className="text-center py-10 bg-bg-secondary rounded-lg">
            <Label color="secondary">هنوز دیدگاهی برای این بخش ثبت نشده است.</Label>
          </div>
        )}
      </div>

      {/* صفحه‌بندی (فقط اگر نیاز باشد) */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          {/* توجه: اینجا باید کامپوننت Pagination را طوری تغییر دهید که با state کار کند نه با URL، 
              یا اینکه نسخه کلاینت‌ساید Pagination را جدا بسازید. 
              در اینجا فرض کردم کامپوننت قابلیت هندل کردن onPageChange را دارد. */}
          <div className="flex gap-2">
             {/* یک Pagination ساده کلاینت‌ساید موقت */}
             {Array.from({length: totalPages}, (_, i) => i + 1).map(p => (
                <button 
                  key={p} 
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg border ${page === p ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white border-border-primary'}`}
                >
                  {p}
                </button>
             ))}
          </div>
        </div>
      )}

      {/* مودال ثبت نظر */}
      <CommentFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={onAddComment}
      />
    </section>
  );
};