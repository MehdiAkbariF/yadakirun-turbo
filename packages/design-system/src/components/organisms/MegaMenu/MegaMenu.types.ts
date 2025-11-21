// packages/design-system/src/components/organisms/MegaMenu/MegaMenu.types.ts
export interface SubItem {
  id: string;
  title: string;
  href: string;
}

export interface CategoryItem {
  id: string;
  title: string;
  href: string;
}

export interface BrandItem {
  id: string;
  title: string;
  href: string;
  subItems: SubItem[];
}

export interface MegaMenuProps {
  /**
   * متنی که به عنوان فعال‌کننده منو نمایش داده می‌شود
   */
  triggerText: string;
  /**
   * لیستی از دسته‌بندی‌های قطعات
   */
  categories: CategoryItem[];
  /**
   * لیستی از برندهای خودرو
   */
  brands: BrandItem[];
}