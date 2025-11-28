export type Language = 'en' | 'te' | 'hi';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  crops?: string[];
  concerns?: string[];
}

export interface Category {
  id: number;
  name: string;
  image: string;
  subcategories?: string[];
}

export interface NavItem {
  label: string;
  hasMegaMenu?: boolean;
  subItems?: { title: string; items: string[] }[];
}

export interface Stat {
  id: number;
  label: string;
  value: string;
  icon: string;
  countTo?: number;
  suffix?: string;
}