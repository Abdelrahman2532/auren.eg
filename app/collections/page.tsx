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

export const metadata = {
  title: 'Collections — AUREN',
  description: 'Explore all AUREN collections and drops.',
};

export default async function CollectionsPage() {
  const collections = await getCollections();

  const fallback = [
    { id: '1', name: 'SS25 Collection', slug: 'ss25-collection', description: 'Spring Summer 2025 — Silence speaks loudest.', cover_image: 'https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=1200', sort_order: 1 },
    { id: '2', name: 'The Void Drop', slug: 'void-drop', description: 'Limited drop. Darkness in motion.', cover_image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1200', sort_order: 2 },
    { id: '3', name: 'Core Essentials', slug: 'core-essentials', description: 'The foundation. Built to last.', cover_image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1200', sort_order: 3 },
  ];

  const items = collections.length > 0 ? collections : fallback;

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero */}
      <div className="px-6 md:px-12 py-16 md:py-24 max-w-[1600px] mx-auto">
        <span className="auren-label text-off-white/30 tracking-[0.3em] block mb-4">Drops & Releases</span>
        <h1 className="auren-heading text-off-white text-[clamp(48px,8vw,110px)]">Collections</h1>
      </div>

      {/* Collections grid */}
      <div className="px-6 md:px-12 pb-24 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((col, i) => (
            <Link
              key={col.id}
              href={`/collections/${col.slug}`}
              className="group relative overflow-hidden block"
              style={{ aspectRatio: i === 0 ? '16/9' : '4/3' }}
            >
              <img
                src={(col as any).cover_image || 'https://images.pexels.com/photos/1336873/pexels-photo-1336873.jpeg?auto=compress&cs=tinysrgb&w=1200'}
                alt={col.name}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                style={{ filter: 'brightness(0.4)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent" />
              <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="auren-label text-off-white/40 mb-3 tracking-[0.3em]">{`0${i + 1}`}</p>
                    <h2 className="text-off-white font-bold text-2xl md:text-3xl tracking-tight mb-2">{col.name}</h2>
                    <p className="text-off-white/40 text-sm max-w-[300px]">{(col as any).description}</p>
                  </div>
                  <div className="text-off-white/0 group-hover:text-off-white/70 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight size={28} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
