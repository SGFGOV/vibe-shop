/**
 * Shared types between Next.js and MedusaJS backend
 */

// Brand Types
export interface Brand {
  id?: string
  _id?: string
  name: string
  icon: string
  status?: "show" | "hide"
  createdAt?: Date
  updatedAt?: Date
}

// Product Types
export interface ProductPrice {
  originalPrice: number
  price: number
  discount?: number
}

export interface ProductVariant {
  id?: string
  title?: string
  price?: number
  stock?: number
  [key: string]: unknown
}

export interface Product {
  _id?: string
  id?: string
  productId?: string
  sku?: string
  barcode?: string
  name: string
  title?: string
  description?: string
  slug: string
  category: string
  categoryId?: string
  brand?: string
  image: string[]
  prices: ProductPrice
  variants?: ProductVariant[]
  stock?: number
  status?: "show" | "hide"
  theme?: string[]
  tag?: string[]
  videoUrl?: string
  flashSale?: boolean
  isCombination?: boolean
  ratings?: unknown[]
  averageRating?: number
  numOfReviews?: number
  [key: string]: unknown
}

// Category Types
export interface Category {
  _id?: string
  id?: string
  name: string
  slug?: string
  description?: string
  icon?: string
  image?: string
  status?: "show" | "hide"
  parent?: string
  children?: Category[]
  createdAt?: Date
  updatedAt?: Date
}

// Order Types
export interface Order {
  _id?: string
  id?: string
  orderCode?: number
  user?: string
  cart?: unknown[]
  user_info?: {
    name?: string
    email?: string
    contact?: string
    address?: string
    city?: string
    country?: string
    zipCode?: string
  }
  subTotal: number
  shippingCost: number
  discount: number
  taxes: number
  total: number
  shippingOption?: string
  paymentMethod: string
  status?: "Pending" | "Processing" | "Delivered" | "Cancel"
  createdAt?: Date
  updatedAt?: Date
}

// Common Response Types
export interface ApiResponse<T = unknown> {
  message?: string
  error?: string
  data?: T
  [key: string]: unknown
}

