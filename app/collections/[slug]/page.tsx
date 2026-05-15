import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/shared/ProductCard';
import { notFound } from 'next/navigation';

interface Props {
  params: { slug: string };
}

export default async function CollectionDetailPage({ params }: Props) {
  const { data: collection } = await supabase
    .from('collections')
    .select('*')
    .eq('slug', params.slug)
    .maybeSingle();

  if (!collection) notFound();

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('collection_id', collection.id)
    .eq('is_active', true)
    .order('sort_order');

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero banner */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img
          src={collection.cover_image || 'https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=1920'}
          alt={collection.name}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.3)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 to-transparent" />
        <div className="absolute bottom-10 left-6 md:left-12">
          <span className="auren-label text-off-white/40 tracking-[0.3em] block mb-3">Collection</span>
          <h1 className="auren-heading text-off-white text-[clamp(40px,7vw,96px)]">{collection.name}</h1>
          {collection.description && (
            <p className="text-off-white/40 text-sm mt-3 max-w-[400px]">{collection.description}</p>
          )}
        </div>
      </div>

      {/* Products */}
      <div className="px-6 md:px-12 py-16 max-w-[1600px] mx-auto">
        {(!products || products.length === 0) ? (
          <div className="text-center py-24">
            <p className="text-off-white/30 text-sm">No products in this collection yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
