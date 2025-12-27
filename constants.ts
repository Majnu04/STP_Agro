import { Category, NavItem, Product, Stat } from "./types";

export const NAV_ITEMS: NavItem[] = [];

export const CATEGORIES: Category[] = [
  { id: 1, name: "Seeds", image: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=400&h=400&fit=crop&q=80" },
  { id: 2, name: "Nutrition", image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=400&fit=crop&q=80" },
  { id: 3, name: "Protection", image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=400&fit=crop&q=80" },
  { id: 4, name: "Sprayers", image: "https://images.unsplash.com/photo-1625246175116-32e7baf0d73a?w=400&h=400&fit=crop&q=80" },
  { id: 5, name: "Implements", image: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=400&h=400&fit=crop&q=80" },
  { id: 6, name: "Traps", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop&q=80" },
  { id: 7, name: "Tarpaulins", image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=400&fit=crop&q=80" },
  { id: 8, name: "Irrigation", image: "https://images.unsplash.com/photo-1625246292665-1a28f431e90d?w=400&h=400&fit=crop&q=80" },
];

export const FILTER_CROPS = ['Tomato', 'Cotton', 'Wheat', 'Paddy', 'Chili'];
export const FILTER_CONCERNS = ['Pest Control', 'Growth', 'Yield', 'Soil Health'];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Seminis Tomato Hybrid Seeds",
    category: "Seeds",
    price: 450,
    originalPrice: 800,
    discount: 43,
    image: "https://picsum.photos/seed/tomato-seeds/400/400",
    rating: 4.5,
    reviews: 120,
    inStock: true,
    crops: ["Tomato"],
    concerns: ["Yield", "Growth"]
  },
  {
    id: 2,
    name: "UPL Saaf Fungicide (500g)",
    category: "Protection",
    price: 650,
    originalPrice: 750,
    discount: 13,
    image: "https://picsum.photos/seed/fungicide/400/400",
    rating: 4.8,
    reviews: 85,
    inStock: true,
    crops: ["Tomato", "Chili", "Paddy", "Cotton"],
    concerns: ["Pest Control", "Disease"]
  },
  {
    id: 3,
    name: "Knapsack Battery Sprayer 16L",
    category: "Equipment",
    price: 2800,
    originalPrice: 4500,
    discount: 37,
    image: "https://picsum.photos/seed/sprayer/400/400",
    rating: 4.2,
    reviews: 45,
    inStock: true,
    crops: ["Cotton", "Paddy", "Wheat"], 
    concerns: ["Pest Control", "Growth"]
  },
  {
    id: 4,
    name: "NPK 19:19:19 Water Soluble",
    category: "Nutrition",
    price: 180,
    originalPrice: 250,
    discount: 28,
    image: "https://picsum.photos/seed/npk-fertilizer/400/400",
    rating: 4.6,
    reviews: 210,
    inStock: true,
    crops: ["Tomato", "Cotton", "Wheat", "Paddy", "Chili"],
    concerns: ["Growth", "Yield", "Soil Health"]
  },
  {
    id: 5,
    name: "Roundup Herbicide (1L)",
    category: "Protection",
    price: 480,
    originalPrice: 550,
    discount: 12,
    image: "https://picsum.photos/seed/herbicide/400/400",
    rating: 4.3,
    reviews: 98,
    inStock: false,
    crops: ["Cotton"],
    concerns: ["Pest Control"]
  },
  {
    id: 6,
    name: "Syngenta Cauliflower Seeds",
    category: "Seeds",
    price: 520,
    originalPrice: 600,
    discount: 13,
    image: "https://picsum.photos/seed/cauliflower/400/400",
    rating: 4.7,
    reviews: 156,
    inStock: true,
    crops: ["Cauliflower"],
    concerns: ["Yield"]
  },
  {
    id: 7,
    name: "Solar Insect Trap",
    category: "Equipment",
    price: 1200,
    originalPrice: 1800,
    discount: 33,
    image: "https://picsum.photos/seed/solar-trap/400/400",
    rating: 4.0,
    reviews: 32,
    inStock: true,
    crops: ["Cotton", "Tomato", "Paddy"],
    concerns: ["Pest Control"]
  },
  {
    id: 8,
    name: "Coromandel Urea (50kg)",
    category: "Nutrition",
    price: 266,
    originalPrice: 300,
    discount: 11,
    image: "https://picsum.photos/seed/urea-fertilizer/400/400",
    rating: 4.9,
    reviews: 500,
    inStock: true,
    crops: ["Wheat", "Paddy", "Maize", "Cotton"],
    concerns: ["Growth", "Yield", "Soil Health"]
  },
];

export const BRANDS = [
  "Bayer", "Syngenta", "UPL", "Dupont", "Seminis", "FMC", "Tata Rallis", "Dhanuka"
];

export const STATS: Stat[] = [
  { id: 1, label: "Trusted Brands", value: "400+", icon: "Award", countTo: 400, suffix: "+" },
  { id: 2, label: "Quality Products", value: "9,000+", icon: "ShoppingBag", countTo: 9000, suffix: "+" },
  { id: 3, label: "Happy Farmers", value: "30M+", icon: "Users", countTo: 30, suffix: "M+" },
  { id: 4, label: "Pincode Delivery", value: "95%", icon: "Truck", countTo: 95, suffix: "%" },
];