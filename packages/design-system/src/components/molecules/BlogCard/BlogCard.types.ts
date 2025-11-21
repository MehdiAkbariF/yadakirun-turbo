import { AnchorHTMLAttributes } from 'react'; // ✅ تغییر از HTMLAttributes به AnchorHTMLAttributes

// ✅ تغییر از HTMLDivElement به HTMLAnchorElement
export interface BlogCardProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  title: string;
  excerpt?: string;
  imgSrc: string;
  category: string;
  date: string;
  href: string; // هرچند href در AnchorHTMLAttributes هست، اما اینجا اجباریش می‌کنیم
  readTime?: string | number;
}