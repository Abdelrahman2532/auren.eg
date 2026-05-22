import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

async function getCollections() {
  const { data } = await supabase
    .from('collections')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');
  return data || [];
}

export default async function CollectionsShowcase() {
  const collections = await getCollections();

  const fallbackCollections = [
   {
    id: '1',
    name: 'White Henley Shirt',
    slug: 'white-henley',
    description: '600 L.E • Sizes S / M / L',
    cover_image: '/images/white-henley.jpg',
  },

  {
    id: '2',
    name: 'Black Henley Shirt',
    slug: 'black-henley',
    description: '600 L.E • Sizes S / M / L',
    cover_image: '/images/black-henley.jpg',
  },
   {
    id: '3',
    name: 'Grey Henley Shirt',
    slug: 'grey-henley',
    description: '600 L.E • Sizes S / M / L',
    cover_image: '/images/grey-henley.png',
  },
  {
    id: '4',
    name: 'White Basic Shirt',
    slug: 'white-basic',
    description: '600 L.E • Sizes S / M / L',
    cover_image: '/images/white-basic.png',
  },
  {
    id: '5',
    name: 'Black Basic Shirt',
    slug: 'black-basic',
    description: '600 L.E • Sizes S / M / L',
    cover_image: '/images/black-basic.png',
  },
  ];

  const items = collections.length > 0 ? collections : fallbackCollections;

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1600px] mx-auto">
      <div className="mb-14">
        <span className="auren-label text-off-white/30 tracking-[0.3em] block mb-3">Drops</span>
        <h2 className="auren-heading text-off-white text-[clamp(36px,5vw,72px)]">Collections</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((col, i) => (
          <Link
            key={col.id}
            href={`/collections/${col.slug}`}
            className="group relative overflow-hidden block"
            style={{ aspectRatio: i === 0 ? '3/4' : '3/4' }}
          >
            <img
              src={col.cover_image || 'https://images.pexels.com/photos/1336873/pexels-photo-1336873.jpeg?auto=compress&cs=tinysrgb&w=800'}
              alt={col.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ filter: 'brightness(0.45)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6">
              <p className="auren-label text-off-white/50 mb-2">{`0${i + 1}`}</p>
              <h3 className="text-off-white font-bold text-xl tracking-tight">{col.name}</h3>
              <p className="text-off-white/40 text-xs mt-1">{(col as any).description}</p>
            </div>

            <div className="absolute top-4 right-4 text-off-white/0 group-hover:text-off-white/60 transition-all duration-300">
              <ArrowUpRight size={20} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
