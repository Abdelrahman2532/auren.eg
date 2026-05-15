'use client';

const galleryImages = [
  {
    src: 'https://images.pexels.com/photos/1336873/pexels-photo-1336873.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'AUREN Campaign 1',
    aspect: '3/4',
  },
  {
    src: 'https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'AUREN Campaign 2',
    aspect: '1/1',
  },
  {
    src: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'AUREN Campaign 3',
    aspect: '3/4',
  },
  {
    src: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'AUREN Campaign 4',
    aspect: '1/1',
  },
  {
    src: 'https://images.pexels.com/photos/2220321/pexels-photo-2220321.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'AUREN Campaign 5',
    aspect: '3/4',
  },
  {
    src: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'AUREN Campaign 6',
    aspect: '1/1',
  },
];

export default function GallerySection() {
  return (
    <section className="py-16 md:py-24">
      <div className="px-6 md:px-12 max-w-[1600px] mx-auto mb-10">
        <span className="auren-label text-off-white/30 tracking-[0.3em] block mb-3">Visual Universe</span>
        <h2 className="auren-heading text-off-white text-[clamp(36px,5vw,72px)]">Lookbook</h2>
      </div>

      {/* Horizontal scrolling gallery */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar px-6 md:px-12 pb-4">
        {galleryImages.map((img, i) => (
          <div
            key={i}
            className="flex-shrink-0 overflow-hidden bg-brown-soft/20"
            style={{
              width: img.aspect === '3/4' ? 'clamp(200px, 22vw, 340px)' : 'clamp(240px, 26vw, 400px)',
              aspectRatio: img.aspect,
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              style={{ filter: 'brightness(0.8)' }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
