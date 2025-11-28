// packages/design-system/src/components/molecules/AccordionMenu/AccordionMenu.types.ts
import { ReactNode } from 'react';

export interface AccordionMenuProps {
  title: ReactNode;
  children: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  className?: string; // ✅ این پراپ را اضافه کنید
}