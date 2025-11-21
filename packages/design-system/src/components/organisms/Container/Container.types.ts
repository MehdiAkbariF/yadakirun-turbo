// packages/design-system/src/components/organisms/Container/Container.types.ts
import { ReactNode, ElementType } from 'react';

export interface ContainerProps {
  children: ReactNode;
  /**
   * آیا این کانتینر باید به عنوان یک بخش مجزا با پس‌زمینه و پدینگ عمودی رندر شود؟
   * @default false
   */
  asSection?: boolean;
  /**
   * تگ HTML که باید برای کانتینر استفاده شود
   * @default 'div'
   */
  as?: ElementType;
  className?: string;
}