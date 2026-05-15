'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, Plus } from 'lucide-react';
import type { Product } from '@/lib/supabase';

type Props = {
  product: Product;
  index?: number;
};

export default function ProductCard({ product, index = 0 }: Props) {
  const [hovered, setHovered] = useState(false);
  const [wished, setWished] = useState(false);

  const discount = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : null;

  return (
    <div
      className="group relative"
      style={{
        animationDelay: `${index * 80}ms`,
        animation: 'fadeUp 0.6s cubic-bezier(0.25,0.46,0.45,0.94) both',
      }}
    >
      <Link href={`/products/${product.slug}`}>
        {/* Image container */}
        <div
          className="relative overflow-hidden bg-brown-soft/20 mb-4"
          style={{ aspectRatio: '3/4' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Main image */}
          <img
            src={product.cover_image || 'https://images.pexels.com/photos/1336873/pexels-photo-1336873.jpeg?auto=compress&cs=tinysrgb&w=600'}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
            style={{
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
              opacity: hovered && product.hover_image ? 0 : 1,
            }}
          />
          {/* Hover image */}
          {product.hover_image && (
            <img
              src={product.hover_image}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
              style={{
                transform: hovered ? 'scale(1.04)' : 'scale(1.08)',
                opacity: hovered ? 1 : 0,
              }}
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.is_new && (
              <span className="bg-off-white text-espresso text-[9px] font-bold px-2 py-1 tracking-widest uppercase">
                New
              </span>
            )}
            {discount && discount > 0 && (
              <span className="bg-brown-accent text-off-white text-[9px] font-bold px-2 py-1 tracking-widest uppercase">
                -{discount}%
              </span>
            )}
          </div>

          {/* Quick actions overlay */}
          <div
            className="absolute inset-0 flex items-end justify-between px-3 pb-3 transition-opacity duration-300"
            style={{ opacity: hovered ? 1 : 0 }}
          >
            <Link
              href={`/products/${product.slug}`}
              className="bg-off-white/10 backdrop-blur-sm border border-off-white/20 text-off-white text-[10px] tracking-widest uppercase px-4 py-2.5 hover:bg-off-white hover:text-espresso transition-all duration-200 flex items-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <Plus size={10} />
              Quick View
            </Link>
          </div>
        </div>
      </Link>

      {/* Product info */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-off-white/30 text-2xs tracking-widest uppercase mb-1">{product.category}</p>
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-off-white text-xs font-medium tracking-wide hover:text-off-white/70 transition-colors truncate">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-off-white/80 text-sm font-semibold">${product.price.toFixed(0)}</span>
            {product.compare_at_price && (
              <span className="text-off-white/30 text-xs line-through">${product.compare_at_price.toFixed(0)}</span>
            )}
          </div>
        </div>

        {/* Wishlist */}
        <button
          className="mt-1 text-off-white/30 hover:text-off-white transition-colors"
          onClick={() => setWished(!wished)}
          aria-label="Add to wishlist"
        >
          <Heart size={14} fill={wished ? '#F3EEE8' : 'none'} className={wished ? 'text-off-white' : ''} />
        </button>
      </div>
    </div>
  );
}
