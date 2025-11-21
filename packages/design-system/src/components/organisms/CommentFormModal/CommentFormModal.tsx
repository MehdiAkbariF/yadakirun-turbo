"use client";
import React, { useState, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { Label } from '../../atoms/Label/Label';
import { StarRating } from '../../molecules/StarRating/StarRating';
import { NewCommentPayload } from '../../../types/comment.types';
import './CommentFormModal.scss';

interface CommentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: NewCommentPayload) => void;
}

export const CommentFormModal = ({ isOpen, onClose, onSubmit }: CommentFormModalProps) => {
  // استیت‌ها برای مدیریت فرم
  const [formData, setFormData] = useState<NewCommentPayload>({
    author: '',
    content: '',
    rating: 0,
    mobile: ''
  });
  const [error, setError] = useState('');

  // استیت برای مدیریت انیمیشن خروج (چون در CSS معمولی با unmount شدن انیمیشن قطع می‌شود)
  const [showModal, setShowModal] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  // اثر جانبی برای هماهنگی با پراپ isOpen و مدیریت انیمیشن
  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
      setIsAnimatingOut(false);
    } else if (showModal) {
      // شروع انیمیشن خروج
      setIsAnimatingOut(true);
      // صبر می‌کنیم تا انیمیشن CSS تمام شود (300ms) سپس کامپوننت را حذف می‌کنیم
      const timer = setTimeout(() => {
        setShowModal(false);
        setIsAnimatingOut(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, showModal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.author.trim() || !formData.content.trim()) {
      setError('لطفاً نام و متن دیدگاه را وارد کنید.');
      return;
    }
    onSubmit(formData);
    
    // ریست کردن فرم
    setFormData({ author: '', content: '', rating: 0, mobile: '' });
    setError('');
    
    // بستن مودال (که باعث تریگر شدن انیمیشن خروج می‌شود)
    onClose();
  };

  // اگر نباید نمایش داده شود، نال برمی‌گردانیم
  if (!showModal) return null;

  // کلاس‌ها بر اساس وضعیت ورود یا خروج
  const modalClass = `comment-modal ${isAnimatingOut ? 'comment-modal--exiting' : 'comment-modal--entering'}`;
  const backdropClass = `comment-modal-backdrop ${isAnimatingOut ? 'comment-modal-backdrop--exiting' : 'comment-modal-backdrop--entering'}`;

  return (
    <div className="comment-modal-overlay">
      {/* پس‌زمینه تاریک */}
      <div 
        className={backdropClass}
        onClick={onClose}
      />
      
      {/* بدنه مودال */}
      <div className={modalClass}>
        <div className="comment-modal__header">
          <Label size="lg" weight="bold">ثبت دیدگاه جدید</Label>
          <button onClick={onClose} className="comment-modal__close" type="button">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="comment-modal__body">
          
          {/* امتیازدهی */}
          <div className="mb-6 text-center">
            <Label size="sm" className="mb-2 block">امتیاز شما به این محصول</Label>
            <div className="flex justify-center">
              <StarRating 
                rating={formData.rating} 
                size={32} 
                onChange={(r) => setFormData({...formData, rating: r})} 
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
               <Label size="sm" className="mb-1 block">نام و نام خانوادگی</Label>
               <input 
                 className="ds-input" 
                 value={formData.author}
                 onChange={(e) => setFormData({...formData, author: e.target.value})}
                 placeholder="مثال: علی علوی"
               />
            </div>

            <div>
               <Label size="sm" className="mb-1 block">متن دیدگاه</Label>
               <textarea 
                 className="ds-textarea" 
                 rows={4}
                 value={formData.content}
                 onChange={(e) => setFormData({...formData, content: e.target.value})}
                 placeholder="نظر خود را بنویسید..."
               />
            </div>
          </div>

          {error && <Label size="xs" color="disabled" className="mt-3">{error}</Label>}

          <div className="mt-6">
            <button type="submit" className="ds-btn-primary w-full flex items-center justify-center gap-2">
              <Send size={18} />
              ثبت دیدگاه
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};