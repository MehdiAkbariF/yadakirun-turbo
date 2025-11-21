"use client";
import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Label } from '../../atoms/Label/Label';
import './FeedbackActions.scss';

export const FeedbackActions = () => {
  const [vote, setVote] = useState<'up' | 'down' | null>(null);

  return (
    <div className="feedback-actions">
      <Label size="base" weight="semi-bold">آیا این محتوا مفید بود؟</Label>
      <div className="flex gap-3">
        <button 
          onClick={() => setVote('up')}
          className={`feedback-btn feedback-btn--up ${vote === 'up' ? 'active' : ''}`}
        >
          <ThumbsUp size={20} />
        </button>
        <button 
          onClick={() => setVote('down')}
          className={`feedback-btn feedback-btn--down ${vote === 'down' ? 'active' : ''}`}
        >
          <ThumbsDown size={20} />
        </button>
      </div>
    </div>
  );
};