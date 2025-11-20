// Shared Type Definitions

// Product Types
export interface ProductPrice {
  originalPrice: number;
  price: number;
  discount?: number;
}

export interface ProductVariant {
  id?: string;
  title?: string;
  price?: number;
  stock?: number;
  [key: string]: unknown;
}

export interface Product {
  _id?: string;
  id?: string;
  productId?: string;
  sku?: string;
  barcode?: string;
  name: string;
  title?: string;
  description?: string;
  slug: string;
  category: string;
  categoryId?: string;
  brand?: string;
  image: string[];
  prices: ProductPrice;
  variants?: ProductVariant[];
  stock?: number;
  status?: "show" | "hide";
  theme?: string[];
  tag?: string[];
  videoUrl?: string;
  flashSale?: boolean;
  isCombination?: boolean;
  ratings?: unknown[];
  averageRating?: number;
  numOfReviews?: number;
  [key: string]: unknown;
}

// Brand Types
export interface Brand {
  _id?: string;
  id?: string;
  name: string;
  icon: string;
  status?: "show" | "hide";
  createdAt?: Date;
  updatedAt?: Date;
}

// Category Image Types
export interface CategoryImage {
  id: string;
  url: string;
  file_id?: string;
  type: "thumbnail" | "image";
  category_id: string;
}

// Category Types
export interface Category {
  theme?: string[];
  _id?: string;
  id?: string;
  name: string;
  slug?: string;
  description?: string;
  icon?: string;
  image?: string;
  images?: CategoryImage[];
  colorClass?: string;
  status?: "show" | "hide";
  parent?: string;
  children?: Category[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Order Types
export interface Order {
  _id?: string;
  id?: string;
  orderCode?: number;
  user?: string;
  cart?: unknown[];
  user_info?: {
    name?: string;
    email?: string;
    contact?: string;
    address?: string;
    city?: string;
    country?: string;
    zipCode?: string;
  };
  subTotal: number;
  shippingCost: number;
  discount: number;
  taxes: number;
  total: number;
  shippingOption?: string;
  paymentMethod: string;
  status?: "Pending" | "Processing" | "Delivered" | "Cancel";
  createdAt?: Date;
  updatedAt?: Date;
}

// User/Customer Types
export interface User {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  password?: string;
  role?: "Admin" | "Super Admin" | "Cashier" | "Manager" | "CEO" | "Driver" | "Security Guard" | "Accountant" | "Customer";
  status?: "show" | "hide";
  contact?: string;
  address?: string;
  img?: string;
  username?: string;
  birthday?: Date;
  joiningDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// Blog Types
export interface Blog {
  _id?: string;
  id?: string;
  title: string;
  slug?: string;
  description?: string;
  content?: string;
  image?: string;
  author?: string;
  category?: string;
  tags?: string[];
  theme?: string[];
  link?: string;
  status?: "show" | "hide";
  publishedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// Coupon Types
export interface Coupon {
  _id?: string;
  id?: string;
  code: string;
  discount: number;
  discountType?: "percentage" | "fixed";
  minPurchase?: number;
  maxDiscount?: number;
  validFrom?: Date;
  validUntil?: Date;
  status?: "show" | "hide";
  usageLimit?: number;
  usedCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
  bannerImage?: string;
}

// Staff Types
export interface Staff {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  role?: string;
  status?: "show" | "hide";
  contact?: string;
  address?: string;
  [key: string]: unknown;
}

// Attribute Types
export interface AttributeVariant {
  name?: string;
  status?: "show" | "hide";
}

export interface Attribute {
  _id?: string;
  id?: string;
  title: string;
  name: string;
  variants?: AttributeVariant[];
  option?: "Dropdown" | "Radio" | "Checkbox";
  status?: "show" | "hide";
  createdAt?: Date;
  updatedAt?: Date;
}

// Common Response Types
export interface ApiResponse<T = unknown> {
  message?: string;
  error?: string;
  data?: T;
  [key: string]: unknown;
}

// Pagination Types
export interface PaginationParams {
  limit?: number;
  offset?: number;
  page?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  limit: number;
  offset: number;
}

// Re-export Medusa types for convenience
export type {
  StoreProduct,
  StoreProductCategory,
  StoreCart,
  StoreCustomer,
} from "@medusajs/types";

