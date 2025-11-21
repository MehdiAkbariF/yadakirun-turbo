"use client";
import React from 'react';
import { ThumbsUp, ThumbsDown, MoreVertical, User, CheckCircle2 } from 'lucide-react';
import { Label } from '../../atoms/Label/Label';
import { StarRating } from '../StarRating/StarRating';
import { CommentData } from '../../../types/comment.types';
import './CommentCard.scss';

interface CommentCardProps {
  comment: CommentData;
  onLike?: (id: string | number) => void;
  onDislike?: (id: string | number) => void;
  onReport?: (id: string | number) => void;
}

export const CommentCard = ({ comment, onLike, onDislike, onReport }: CommentCardProps) => {
  return (
    <div className="comment-card">
      {/* هدر کارت: اطلاعات کاربر */}
      <div className="comment-card__header">
        <div className="flex items-center gap-3">
          <div className="comment-card__avatar">
            <User size={20} />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Label weight="bold" size="sm">{comment.author}</Label>
              {comment.isBuyer && (
                <span className="comment-card__buyer-badge">
                   <CheckCircle2 size={12} /> خریدار
                </span>
              )}
            </div>
            <Label size="xs" color="placeholder">{comment.date}</Label>
          </div>
        </div>
        
        {/* منوی آپشن (فعلا ساده) */}
        <button className="comment-card__more-btn" onClick={() => onReport?.(comment.id)}>
          <MoreVertical size={18} />
        </button>
      </div>

      {/* امتیاز (اگر باشد) */}
      {comment.rating && comment.rating > 0 && (
        <div className="comment-card__rating">
          <StarRating rating={comment.rating} readOnly size={14} />
        </div>
      )}

      {/* متن نظر */}
      <div className="comment-card__content">
        <Label size="sm" className="leading-relaxed">
          {comment.content}
        </Label>
      </div>

      {/* فوتر: لایک و دیس‌لایک */}
      <div className="comment-card__footer">
        <div className="flex items-center gap-4">
          <button className="comment-card__action-btn" onClick={() => onLike?.(comment.id)}>
            <ThumbsUp size={16} />
            <span>{comment.likes || 0}</span>
          </button>
          <button className="comment-card__action-btn comment-card__action-btn--dislike" onClick={() => onDislike?.(comment.id)}>
            <ThumbsDown size={16} />
            <span>{comment.dislikes || 0}</span>
          </button>
        </div>
      </div>
    </div>
  );
};