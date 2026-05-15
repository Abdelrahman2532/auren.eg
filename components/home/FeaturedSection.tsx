import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/shared/ProductCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

async function getFeaturedProducts() {
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('is_featured', true)
    .eq('is_active', true)
    .limit(4);
  return data || [];
}

export default async function FeaturedSection() {
  const products = await getFeaturedProducts();

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <span className="auren-label text-off-white/30 tracking-[0.3em] block mb-3">Featured</span>
          <h2 className="auren-heading text-off-white text-[clamp(36px,5vw,72px)]">
            The Edit
          </h2>
        </div>
        <Link
          href="/shop"
          className="group flex items-center gap-3 auren-label text-off-white/50 hover:text-off-white transition-colors"
        >
          View All
          <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-brown-soft/20" style={{ aspectRatio: '3/4' }} />
              <div className="mt-3 h-3 bg-brown-soft/20 w-3/4" />
              <div className="mt-2 h-3 bg-brown-soft/10 w-1/2" />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
