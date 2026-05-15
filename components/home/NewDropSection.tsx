import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function NewDropSection() {
  return (
    <section className="py-0 overflow-hidden">
      <div className="relative h-[80vh] min-h-[600px]">
        {/* Background image */}
        <img
          src="https://images.pexels.com/photos/2220321/pexels-photo-2220321.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="New Drop"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.3)' }}
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/80 via-espresso/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 pb-16 md:pb-24 max-w-[1600px] mx-auto">
          <div>
            <span className="auren-label text-brown-accent tracking-[0.3em] block mb-4">New Drop</span>
            <h2 className="auren-heading text-off-white text-[clamp(48px,8vw,110px)] mb-6 max-w-[700px]">
              THE VOID DROP
            </h2>
            <p className="text-off-white/50 text-sm max-w-[400px] leading-relaxed mb-10">
              Darkness in motion. Limited release — technical pieces built for those who operate in the margins.
            </p>

            <div className="flex items-center gap-6">
              <Link
                href="/collections/void-drop"
                className="group relative overflow-hidden border border-off-white/20 text-off-white px-10 py-4 auren-label hover:border-off-white/60 transition-colors flex items-center gap-3"
              >
                Explore Drop
                <ArrowUpRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="/shop"
                className="auren-label text-off-white/40 hover:text-off-white transition-colors border-b border-transparent hover:border-off-white/30 pb-0.5"
              >
                Shop All
              </Link>
            </div>
          </div>
        </div>

        {/* Side text */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:block">
          <span
            className="text-off-white/15 text-[10px] tracking-[0.5em] uppercase"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            Limited Release
          </span>
        </div>
      </div>
    </section>
  );
}
