import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/shared/ProductCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

async function getBestSellers() {
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('is_bestseller', true)
    .eq('is_active', true)
    .limit(3);
  return data || [];
}

export default async function BestSellersSection() {
  const products = await getBestSellers();

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <span className="auren-label text-off-white/30 tracking-[0.3em] block mb-3">Community Picks</span>
          <h2 className="auren-heading text-off-white text-[clamp(36px,5vw,72px)]">
            Best Sellers
          </h2>
        </div>
        <Link href="/shop" className="group flex items-center gap-3 auren-label text-off-white/50 hover:text-off-white transition-colors">
          Shop All <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* 3-column grid with large first card */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* First card — larger */}
          {products[0] && (
            <div className="md:col-span-1 md:row-span-2 flex flex-col">
              <ProductCard product={products[0]} index={0} />
            </div>
          )}
          {products.slice(1).map((p, i) => (
            <ProductCard key={p.id} product={p} index={i + 1} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-brown-soft/20" style={{ aspectRatio: '3/4' }} />
              <div className="mt-3 h-3 bg-brown-soft/20 w-3/4" />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
