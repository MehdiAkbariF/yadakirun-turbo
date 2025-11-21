import React from 'react';
import { Info } from 'lucide-react';
import { Label } from '../../atoms/Label/Label';
import './QuoteBlock.scss';

export const QuoteBlock = ({ text }: { text: string }) => {
  return (
    <blockquote className="quote-block">
      <div className="quote-block__icon">
        <Info size={24} />
      </div>
      <Label className="quote-block__text" size="sm" color="secondary">
        {text}
      </Label>
    </blockquote>
  );
};