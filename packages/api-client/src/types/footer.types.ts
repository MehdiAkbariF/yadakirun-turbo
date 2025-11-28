// اینترفیس‌ها بر اساس ریسپانس API شما

export interface SaleService {
    title: string;
    description: string;
    logoUrl: string;
  }
  
  export interface FooterLink {
    title: string;
    url: string;
    // سایر فیلدهای احتمالی
  }
  
  export interface FooterData {
    saleServices: SaleService[];
    footerLinks: FooterLink[];
  }