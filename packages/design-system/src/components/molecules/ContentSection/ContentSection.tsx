// packages/design-system/src/components/molecules/ContentSection/ContentSection.tsx
import React from 'react';
import { ContentSectionProps } from './ContentSection.types';
import { Label } from '../../atoms/Label/Label';
import './ContentSection.scss';

export const ContentSection = ({
  title,
  titleAs = 'h2',
  children,
  className,
}: ContentSectionProps) => {
  const classNames = ['content-section', className].filter(Boolean).join(' ');

  return (
    <section className={classNames}>
      <div className="content-section__title-wrapper">
        <Label as={titleAs} size="2x" weight="extra-bold" color="primary">
          {title}
        </Label>
      </div>
      <div className="content-section__body">
        {children}
      </div>
    </section>
  );
};