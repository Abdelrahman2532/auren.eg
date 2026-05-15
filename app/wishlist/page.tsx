'use client';

import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import Link from 'next/link';

export default function WishlistPage() {
  return (
    <div className="pt-16 min-h-screen px-6 md:px-12 py-16 max-w-[1600px] mx-auto">
      <span className="auren-label text-off-white/30 tracking-[0.3em] block mb-3">Saved Items</span>
      <h1 className="auren-heading text-off-white text-[clamp(40px,6vw,88px)] mb-16">Wishlist</h1>

      <div className="flex flex-col items-center justify-center py-24 gap-6">
        <Heart size={48} className="text-off-white/15" />
        <p className="text-off-white/30 text-sm text-center">
          Sign in to save your favourite pieces.
        </p>
        <Link
          href="/account"
          className="auren-label text-off-white border-b border-off-white/30 pb-0.5 hover:border-off-white transition-colors"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
