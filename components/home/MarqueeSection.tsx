export default function MarqueeBar() {
  return (
    <div className="bg-[#2a1810] border-y border-white/10 overflow-hidden py-3">
      <div className="flex whitespace-nowrap animate-marquee min-w-full">

        <span className="mx-8 text-white text-sm tracking-[0.25em] uppercase">
          Free Shipping Over 1800 EGP
        </span>

        <span className="text-white/40">•</span>

        <span className="mx-8 text-white text-sm tracking-[0.25em] uppercase">
          Not For Everyone
        </span>

        <span className="text-white/40">•</span>

        <span className="mx-8 text-white text-sm tracking-[0.25em] uppercase">
          2 Days Returns & Exchanges
        </span>

        <span className="text-white/40">•</span>

        {/* Repeat */}
        <span className="mx-8 text-white text-sm tracking-[0.25em] uppercase">
          Free Shipping Over 1800 EGP
        </span>

        <span className="text-white/40">•</span>

        <span className="mx-8 text-white text-sm tracking-[0.25em] uppercase">
          Not For Everyone
        </span>

        <span className="text-white/40">•</span>

        <span className="mx-8 text-white text-sm tracking-[0.25em] uppercase">
          2 Days Returns & Exchanges
        </span>

      </div>
    </div>
  );
}