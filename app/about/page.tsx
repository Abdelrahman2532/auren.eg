export const metadata = {
  title: 'About — AUREN',
  description: 'The story behind AUREN — luxury streetwear defined by silence.',
};

export default function AboutPage() {
  return (
    <div className="pt-16 min-h-screen">
      {/* Hero */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="About AUREN"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.25)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-end px-6 md:px-16 pb-16">
          <div>
            <span className="auren-label text-off-white/40 tracking-[0.3em] block mb-4">Our Story</span>
            <h1 className="auren-heading text-off-white text-[clamp(48px,8vw,110px)]">
              About
              <br />
              AUREN
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-24 md:py-36">
        {/* Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <div>
            <span className="auren-label text-off-white/25 tracking-[0.3em] block mb-6">Mission</span>
            <h2 className="auren-heading text-off-white text-[clamp(28px,4vw,52px)] mb-8">
              Built for those who
              <span className="text-off-white/30"> need nothing to prove.</span>
            </h2>
          </div>
          <div className="space-y-5">
            <p className="text-off-white/50 text-sm leading-relaxed">
              AUREN was founded on a single belief: that the most powerful statement is silence. In a world saturated with noise, we create pieces that speak without words.
            </p>
            <p className="text-off-white/35 text-sm leading-relaxed">
              Every garment is constructed from premium materials — heavyweight cottons, technical ripstops, brushed French terry — with an obsessive attention to proportion, weight, and finish. Nothing is accidental.
            </p>
            <p className="text-off-white/25 text-sm leading-relaxed">
              We don't chase trends. We build permanence.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="border-t border-brown-soft/20 pt-16 grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
          {[
            { title: 'Permanence', desc: 'Every piece is designed to outlast the season. We build for the long run.' },
            { title: 'Silence', desc: 'True luxury doesn\'t announce itself. It is felt. AUREN is quiet confidence.' },
            { title: 'Precision', desc: 'From the weight of the fabric to the spacing of the seams — everything is intentional.' },
          ].map((val) => (
            <div key={val.title}>
              <h3 className="text-off-white font-bold text-xl tracking-tight mb-3">{val.title}</h3>
              <p className="text-off-white/35 text-sm leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>

        {/* Full width image */}
        <div className="relative overflow-hidden h-[500px] md:h-[600px]">
          <img
            src="https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="AUREN Campaign"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.5)' }}
          />
        </div>

        {/* Team quote */}
        <div className="text-center py-24">
          <blockquote className="auren-heading text-off-white/60 text-[clamp(24px,4vw,48px)] max-w-[700px] mx-auto">
            "We don't make clothes for the crowd.
            <br />
            <span className="text-off-white">We make them for the individual."</span>
          </blockquote>
          <p className="text-off-white/25 text-xs tracking-widest uppercase mt-6">— AUREN, 2024</p>
        </div>
      </div>
    </div>
  );
}
