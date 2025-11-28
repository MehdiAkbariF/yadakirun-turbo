export interface CarMenuItem {
    id: number;
    modelName: string;
    englishName: string;
    imageUrl: string;
  }
  
  export interface CarManufacturerMenuItem {
    id: number;
    name: string;
    englishName: string;
    logoUrl: string | null;
    cars: CarMenuItem[];
  }
  
  export interface ProductCategoryMenuItem {
    id: number;
    name: string;
    englishName: string;
  }
  
  export interface MenuData {
    carManufacturers: CarManufacturerMenuItem[];
    productCategories: ProductCategoryMenuItem[];
  }