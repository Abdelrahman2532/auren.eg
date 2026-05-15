export default function MarqueeSection() {
  const items = [
    'LUXURY STREETWEAR',
    'SS25 COLLECTION',
    'NOT FOR EVERYONE',
    'LIMITED DROP',
    'PREMIUM QUALITY',
    'CRAFTED TO LAST',
  ];

  const repeated = [...items, ...items];

  return (
    <div className="border-y border-brown-soft/20 py-4 overflow-hidden bg-brown-main/30">
      <div className="flex whitespace-nowrap animate-marquee">
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="auren-label text-off-white/30 px-8 tracking-[0.25em]">{item}</span>
            <span className="text-off-white/15 text-xs">&#9632;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
