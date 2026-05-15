import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Product = {
  id: string;
  collection_id: string | null;
  name: string;
  slug: string;
  description: string;
  price: number;
  compare_at_price: number | null;
  category: string;
  tags: string[];
  is_active: boolean;
  is_featured: boolean;
  is_new: boolean;
  is_bestseller: boolean;
  cover_image: string;
  hover_image: string;
  video_url: string;
  sort_order: number;
  created_at: string;
  collections?: Collection;
  product_variants?: ProductVariant[];
  product_images?: ProductImage[];
};

export type Collection = {
  id: string;
  name: string;
  slug: string;
  description: string;
  cover_image: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
};

export type ProductVariant = {
  id: string;
  product_id: string;
  size: string;
  color: string;
  color_hex: string;
  stock: number;
  sku: string;
};

export type ProductImage = {
  id: string;
  product_id: string;
  url: string;
  alt: string;
  sort_order: number;
};

export type Order = {
  id: string;
  user_id: string;
  order_number: string;
  status: string;
  subtotal: number;
  discount_amount: number;
  shipping_cost: number;
  total: number;
  currency: string;
  discount_code: string;
  shipping_address: Record<string, string>;
  billing_address: Record<string, string>;
  payment_status: string;
  payment_method: string;
  notes: string;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  variant_id: string | null;
  product_name: string;
  variant_size: string;
  variant_color: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  image_url: string;
};

export type Review = {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  title: string;
  body: string;
  is_verified: boolean;
  created_at: string;
};

export type CartItem = {
  product: Product;
  variant: ProductVariant;
  quantity: number;
};
