'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Minus, Plus, ArrowRight, ChevronDown, Star } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import ProductCard from '@/components/shared/ProductCard';
import type { Product, ProductVariant } from '@/lib/supabase';

type ProductWithRelations = Product & {
  product_variants: ProductVariant[];
  product_images: { id: string; url: string; alt: string; sort_order: number }[];
  collections: { name: string; slug: string } | null;
};

type Props = {
  product: ProductWithRelations;
  related: Product[];
};

export default function ProductDetailClient({ product, related }: Props) {
  const images = [
    product.cover_image,
    product.hover_image,
    ...(product.product_images?.map((i) => i.url) || []),
  ].filter(Boolean);

  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.product_variants?.[0] || null
  );
  const [quantity, setQuantity] = useState(1);
  const [wished, setWished] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState<string | null>('details');
  const { addItem } = useCartStore();

  const variants = product.product_variants || [];
  const sizes = Array.from(new Set(variants.map((v) => v.size)));

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    // cast to any to satisfy CartItem shape expected by addItem
    addItem({ product: product as unknown as Product, variant: selectedVariant, quantity } as any);
  };

  const discount = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : null;

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-8 md:py-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-10">
          <Link href="/shop" className="text-off-white/30 hover:text-off-white/60 transition-colors text-2xs tracking-widest uppercase">
            Shop
          </Link>
          <span className="text-off-white/20">/</span>
          <span className="text-off-white/50 text-2xs tracking-widest uppercase">{product.name}</span>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left: images */}
          <div>
            {/* Main image */}
            <div className="relative overflow-hidden bg-brown-soft/20" style={{ aspectRatio: '3/4' }}>
              <img
                src={images[selectedImg] || 'https://images.pexels.com/photos/1336873/pexels-photo-1336873.jpeg?auto=compress&cs=tinysrgb&w=800'}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
              />
              {/* Badges */}
              {product.is_new && (
                <div className="absolute top-4 left-4">
                  <span className="bg-off-white text-espresso text-[9px] font-bold px-3 py-1.5 tracking-widest uppercase">New</span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 mt-3">
                {images.slice(0, 5).map((img, i) => (
                  <button
                    key={i}
                    className="relative overflow-hidden flex-shrink-0 transition-all duration-200"
                    style={{
                      width: 'calc(20% - 8px)',
                      aspectRatio: '1/1',
                      border: i === selectedImg ? '1px solid rgba(243,238,232,0.6)' : '1px solid rgba(59,42,34,0.3)',
                    }}
                    onClick={() => setSelectedImg(i)}
                  >
                    <img
                      src={img || ''}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: info */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            {/* Collection */}
            {product.collections && (
              <Link
                href={`/collections/${product.collections.slug}`}
                className="auren-label text-off-white/30 hover:text-off-white/60 transition-colors block mb-4"
              >
                {product.collections.name}
              </Link>
            )}

            {/* Name */}
            <h1 className="auren-heading text-off-white text-[clamp(28px,4vw,52px)] mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-off-white text-2xl font-semibold">${product.price.toFixed(0)}</span>
              {product.compare_at_price && (
                <span className="text-off-white/30 text-lg line-through">${product.compare_at_price.toFixed(0)}</span>
              )}
              {discount && (
                <span className="bg-brown-accent/20 text-brown-accent text-[10px] font-bold px-2 py-1 tracking-widest uppercase border border-brown-accent/30">
                  -{discount}% off
                </span>
              )}
            </div>

            {/* Stars placeholder */}
            <div className="flex items-center gap-2 mb-8">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} size={12} fill="rgba(243,238,232,0.4)" className="text-off-white/40" />
              ))}
              <span className="text-off-white/30 text-2xs ml-2">No reviews yet</span>
            </div>

            {/* Size selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="auren-label text-off-white/60">Size</span>
                <button className="text-off-white/30 hover:text-off-white transition-colors text-2xs tracking-widest uppercase border-b border-off-white/20">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => {
                  const variant = variants.find((v) => v.size === size);
                  const outOfStock = !variant || variant.stock === 0;
                  return (
                    <button
                      key={size}
                      disabled={outOfStock}
                      onClick={() => setSelectedVariant(variant || null)}
                      className={`w-14 h-10 border text-xs tracking-wider transition-all duration-200 ${
                        selectedVariant?.size === size
                          ? 'border-off-white bg-off-white text-espresso'
                          : outOfStock
                          ? 'border-brown-soft/20 text-off-white/20 cursor-not-allowed'
                          : 'border-brown-soft/40 text-off-white/60 hover:border-off-white/40 hover:text-off-white'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <span className="auren-label text-off-white/60 block mb-3">Quantity</span>
              <div className="flex items-center gap-0 w-fit border border-brown-soft/40">
                <button
                  className="w-10 h-10 flex items-center justify-center text-off-white/60 hover:text-off-white border-r border-brown-soft/40 transition-colors"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus size={12} />
                </button>
                <span className="w-12 text-center text-off-white text-sm">{quantity}</span>
                <button
                  className="w-10 h-10 flex items-center justify-center text-off-white/60 hover:text-off-white border-l border-brown-soft/40 transition-colors"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 mb-10">
              <button
                onClick={handleAddToCart}
                disabled={!selectedVariant}
                className="w-full bg-off-white text-espresso py-4 auren-label hover:bg-off-white/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {selectedVariant ? 'Add to Cart' : 'Select a Size'}
              </button>
              <button
                onClick={() => setWished(!wished)}
                className="w-full border border-brown-soft/40 text-off-white/60 py-4 auren-label hover:border-off-white/30 hover:text-off-white transition-colors flex items-center justify-center gap-2"
              >
                <Heart size={13} fill={wished ? '#F3EEE8' : 'none'} className={wished ? 'text-off-white' : ''} />
                {wished ? 'Saved to Wishlist' : 'Add to Wishlist'}
              </button>
            </div>

            {/* Accordions */}
            {[
              {
                id: 'details',
                label: 'Product Details',
                content: product.description || 'Premium construction. Designed with obsessive attention to detail.',
              },
              {
                id: 'shipping',
                label: 'Shipping & Returns',
                content: 'Free shipping on orders over $300. Standard delivery 3-7 business days. Free returns within 30 days.',
              },
              {
                id: 'care',
                label: 'Care Instructions',
                content: 'Cold machine wash. Do not tumble dry. Iron on low heat. Do not bleach.',
              },
            ].map((acc) => (
              <div key={acc.id} className="border-t border-brown-soft/20">
                <button
                  className="w-full flex items-center justify-between py-4 text-left"
                  onClick={() => setAccordionOpen(accordionOpen === acc.id ? null : acc.id)}
                >
                  <span className="auren-label text-off-white/60">{acc.label}</span>
                  <ChevronDown
                    size={14}
                    className={`text-off-white/40 transition-transform duration-200 ${accordionOpen === acc.id ? 'rotate-180' : ''}`}
                  />
                </button>
                {accordionOpen === acc.id && (
                  <div className="pb-5">
                    <p className="text-off-white/40 text-sm leading-relaxed">{acc.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-24 md:mt-36">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="auren-label text-off-white/30 tracking-[0.3em] block mb-2">You May Also Like</span>
                <h2 className="auren-heading text-off-white text-3xl">Related Pieces</h2>
              </div>
              <Link href="/shop" className="group flex items-center gap-2 auren-label text-off-white/40 hover:text-off-white transition-colors">
                View All <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
