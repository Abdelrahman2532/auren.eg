
/*
  # AUREN E-Commerce Schema

  ## Overview
  Complete e-commerce schema for AUREN luxury streetwear brand.

  ## Tables
  1. `collections` - Product collections/drops
  2. `products` - Product catalog with variants
  3. `product_images` - Multiple images per product
  4. `product_variants` - Size/color variants with stock
  5. `orders` - Customer orders
  6. `order_items` - Line items per order
  7. `wishlists` - User wishlists
  8. `reviews` - Product reviews
  9. `discount_codes` - Promotional codes
  10. `newsletter_subscribers` - Email subscribers

  ## Security
  - RLS enabled on all tables
  - Authenticated users access own data
  - Public read on products/collections
*/

-- Collections
CREATE TABLE IF NOT EXISTS collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  cover_image text DEFAULT '',
  is_active boolean DEFAULT true,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE collections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Collections are publicly viewable"
  ON collections FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin can manage collections"
  ON collections FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can update collections"
  ON collections FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Products
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id uuid REFERENCES collections(id),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  price numeric(10,2) NOT NULL DEFAULT 0,
  compare_at_price numeric(10,2),
  category text DEFAULT '',
  tags text[] DEFAULT '{}',
  is_active boolean DEFAULT true,
  is_featured boolean DEFAULT false,
  is_new boolean DEFAULT false,
  is_bestseller boolean DEFAULT false,
  cover_image text DEFAULT '',
  hover_image text DEFAULT '',
  video_url text DEFAULT '',
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are publicly viewable"
  ON products FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin can manage products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Product Images
CREATE TABLE IF NOT EXISTS product_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url text NOT NULL,
  alt text DEFAULT '',
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Product images are publicly viewable"
  ON product_images FOR SELECT
  USING (true);

CREATE POLICY "Admin can manage product images"
  ON product_images FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Product Variants
CREATE TABLE IF NOT EXISTS product_variants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  size text NOT NULL,
  color text DEFAULT '',
  color_hex text DEFAULT '',
  stock int NOT NULL DEFAULT 0,
  sku text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Variants are publicly viewable"
  ON product_variants FOR SELECT
  USING (true);

CREATE POLICY "Admin can manage variants"
  ON product_variants FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can update variants"
  ON product_variants FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Orders
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  order_number text UNIQUE NOT NULL,
  status text DEFAULT 'pending',
  subtotal numeric(10,2) NOT NULL DEFAULT 0,
  discount_amount numeric(10,2) DEFAULT 0,
  shipping_cost numeric(10,2) DEFAULT 0,
  total numeric(10,2) NOT NULL DEFAULT 0,
  currency text DEFAULT 'USD',
  discount_code text DEFAULT '',
  shipping_address jsonb DEFAULT '{}',
  billing_address jsonb DEFAULT '{}',
  payment_status text DEFAULT 'pending',
  payment_method text DEFAULT '',
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Order Items
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id),
  variant_id uuid REFERENCES product_variants(id),
  product_name text NOT NULL,
  variant_size text DEFAULT '',
  variant_color text DEFAULT '',
  quantity int NOT NULL DEFAULT 1,
  unit_price numeric(10,2) NOT NULL,
  total_price numeric(10,2) NOT NULL,
  image_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create order items"
  ON order_items FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Wishlists
CREATE TABLE IF NOT EXISTS wishlists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, product_id)
);

ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own wishlist"
  ON wishlists FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add to wishlist"
  ON wishlists FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove from wishlist"
  ON wishlists FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Reviews
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating int NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title text DEFAULT '',
  body text DEFAULT '',
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, product_id)
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews are publicly viewable"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Users can create reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews"
  ON reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Discount Codes
CREATE TABLE IF NOT EXISTS discount_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  discount_type text NOT NULL DEFAULT 'percentage',
  discount_value numeric(10,2) NOT NULL DEFAULT 0,
  min_order_amount numeric(10,2) DEFAULT 0,
  max_uses int,
  used_count int DEFAULT 0,
  is_active boolean DEFAULT true,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE discount_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active discount codes are viewable by authenticated users"
  ON discount_codes FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Newsletter Subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  is_active boolean DEFAULT true,
  subscribed_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers FOR INSERT
  WITH CHECK (true);

-- Seed initial collections
INSERT INTO collections (name, slug, description, cover_image, sort_order) VALUES
  ('SS25 COLLECTION', 'ss25-collection', 'Spring Summer 2025 — Silence speaks loudest.', 'https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg', 1),
  ('THE VOID DROP', 'void-drop', 'Limited drop. Darkness in motion.', 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg', 2),
  ('CORE ESSENTIALS', 'core-essentials', 'The foundation. Built to last.', 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg', 3)
ON CONFLICT (slug) DO NOTHING;

-- Seed initial products
INSERT INTO products (name, slug, description, price, compare_at_price, category, tags, is_featured, is_new, is_bestseller, cover_image, hover_image, collection_id)
SELECT
  'SHADOW OVERSIZED TEE',
  'shadow-oversized-tee',
  'Premium heavyweight cotton oversized tee. Garment dyed in deep espresso. The weight speaks before the fabric does.',
  185.00,
  220.00,
  'T-Shirts',
  ARRAY['featured', 'new', 'tee', 'oversized'],
  true,
  true,
  false,
  'https://images.pexels.com/photos/1336873/pexels-photo-1336873.jpeg',
  'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg',
  c.id
FROM collections c WHERE c.slug = 'ss25-collection'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, price, compare_at_price, category, tags, is_featured, is_new, is_bestseller, cover_image, hover_image, collection_id)
SELECT
  'VOID CARGO PANT',
  'void-cargo-pant',
  'Technical ripstop cargo. Relaxed silhouette, articulated knees. Worn by those who move in silence.',
  395.00,
  450.00,
  'Pants',
  ARRAY['featured', 'cargo', 'pants', 'bestseller'],
  true,
  false,
  true,
  'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
  'https://images.pexels.com/photos/2220321/pexels-photo-2220321.jpeg',
  c.id
FROM collections c WHERE c.slug = 'void-drop'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, price, compare_at_price, category, tags, is_featured, is_new, is_bestseller, cover_image, hover_image, collection_id)
SELECT
  'AUREN COACH JACKET',
  'auren-coach-jacket',
  'Washed nylon coach jacket. Tonal branding. Minimal. The kind of piece you wear forever.',
  520.00,
  NULL,
  'Jackets',
  ARRAY['featured', 'jacket', 'outerwear'],
  true,
  true,
  false,
  'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg',
  'https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg',
  c.id
FROM collections c WHERE c.slug = 'ss25-collection'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, price, compare_at_price, category, tags, is_featured, is_new, is_bestseller, cover_image, hover_image, collection_id)
SELECT
  'ESPRESSO HOODIE',
  'espresso-hoodie',
  'French terry heavyweight hoodie. Garment washed for broken-in feel. Dropped shoulders, relaxed fit.',
  295.00,
  NULL,
  'Hoodies',
  ARRAY['bestseller', 'hoodie', 'essential'],
  false,
  false,
  true,
  'https://images.pexels.com/photos/2220321/pexels-photo-2220321.jpeg',
  'https://images.pexels.com/photos/1336873/pexels-photo-1336873.jpeg',
  c.id
FROM collections c WHERE c.slug = 'core-essentials'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, price, compare_at_price, category, tags, is_featured, is_new, is_bestseller, cover_image, hover_image, collection_id)
SELECT
  'SILENT LONGLINE TEE',
  'silent-longline-tee',
  'Elongated hem, side splits, relaxed body. Pure white. Silence in its simplest form.',
  145.00,
  NULL,
  'T-Shirts',
  ARRAY['new', 'tee', 'longline'],
  false,
  true,
  false,
  'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg',
  'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
  c.id
FROM collections c WHERE c.slug = 'core-essentials'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, price, compare_at_price, category, tags, is_featured, is_new, is_bestseller, cover_image, hover_image, collection_id)
SELECT
  'ONYX TRACK PANT',
  'onyx-track-pant',
  'Premium tricot track pant with side stripe. Tapered leg, elastic waistband. Movement without compromise.',
  265.00,
  320.00,
  'Pants',
  ARRAY['bestseller', 'track', 'pants'],
  false,
  false,
  true,
  'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
  'https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg',
  c.id
FROM collections c WHERE c.slug = 'void-drop'
ON CONFLICT (slug) DO NOTHING;

-- Seed product variants
INSERT INTO product_variants (product_id, size, color, color_hex, stock, sku)
SELECT p.id, size, 'Espresso', '#1A120E', 
  CASE size WHEN 'XS' THEN 5 WHEN 'S' THEN 12 WHEN 'M' THEN 18 WHEN 'L' THEN 15 WHEN 'XL' THEN 10 WHEN 'XXL' THEN 6 END,
  p.slug || '-espresso-' || size
FROM products p
CROSS JOIN (VALUES ('XS'), ('S'), ('M'), ('L'), ('XL'), ('XXL')) AS sizes(size)
ON CONFLICT DO NOTHING;
