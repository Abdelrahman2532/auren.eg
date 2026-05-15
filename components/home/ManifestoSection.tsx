export default function ManifestoSection() {
  return (
    <section className="py-32 md:py-48 px-6 md:px-12">
      <div className="max-w-[1000px] mx-auto">
        {/* Label */}
        <span className="auren-label text-off-white/25 tracking-[0.3em] block mb-12">Manifesto</span>

        {/* Main text */}
        <div className="space-y-8">
          <p className="auren-heading text-off-white/90 text-[clamp(28px,4vw,56px)] leading-tight">
            "Silence is the purest
            <span className="text-off-white/30"> form of</span>
            <span className="text-off-white"> expression."</span>
          </p>

          <div className="pl-0 md:pl-32 max-w-[640px]">
            <p className="text-off-white/40 text-sm leading-relaxed">
              AUREN was built for those who don't need validation. For those who understand that the most powerful statement is made without a word. Our garments are for the ones who move with intention — slow, deliberate, and permanent.
            </p>
            <p className="text-off-white/25 text-sm leading-relaxed mt-4">
              Every piece is designed to outlast the season. Built from premium materials with obsessive attention to detail. This is not fashion — it is permanence.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-20 pt-12 border-t border-brown-soft/20">
          {[
            { value: '2024', label: 'Est.' },
            { value: '100%', label: 'Premium Cotton' },
            { value: 'Limited', label: 'Each Drop' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-off-white font-bold text-2xl md:text-3xl tracking-tight">{stat.value}</p>
              <p className="text-off-white/30 text-2xs tracking-widest uppercase mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
