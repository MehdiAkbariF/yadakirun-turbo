import React from 'react';
import { Card } from '../../atoms/Card/Card';
import { CardGridProps } from './CardGrid.types';
import './CardGrid.scss';

export const CardGrid = ({ items, columns = 7, className, scrollable = false }: CardGridProps) => {
  const classNames = [
    'card-grid', 
    scrollable ? 'card-grid--scrollable' : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div className={classNames} style={{ '--grid-columns': columns } as React.CSSProperties}>
      {items.map((item, index) => (
        <Card key={item.href + index} {...item} />
      ))}
    </div>
  );
};