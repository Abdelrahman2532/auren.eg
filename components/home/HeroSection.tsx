
'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import FlashSalePopup from '@/components/FlashSalePopup';
const heroImages = [
  '/images/hero.jpg',
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 2400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <section className="relative h-[35vh] md:h-screen min-h-[520px] md:min-h-[700px] overflow-hidden">

      {/* Background images */}
      {heroImages.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-1500"
          style={{
            opacity: i === current ? 1 : 0,
            transitionDuration: '1.5s',
          }}
        >
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover"
            style={{
              transform: 'scale(1.05)',
              filter: 'brightness(0.35)',
            }}
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-espresso/20 via-transparent to-espresso/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-espresso/40 to-transparent" />

      {/* Content */}
      <div
        className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 pb-10 md:pb-24"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded
            ? 'translateY(0)'
            : 'translateY(16px)',
          transition:
            'opacity 1s ease, transform 1s ease',
        }}
      >

        

        {/* Main heading */}
        <h1 className="auren-heading text-off-white text-[clamp(34px,7vw,85px)] leading-[0.88] mb-6 md:mb-8 max-w-[900px]">
          AUREN
          <br />

          <span className="text-off-white/30">
            NOT FOR
          </span>

          <br />

          <span className="text-off-white/15">
            EVERYONE
          </span>
        </h1>

        {/* CTA */}
        <div className="flex flex-col items-start gap-3 mt-2 md:mt-4">

          {/* BUTTON */}
          <a
            href="#products"
            className="group relative bg-off-white text-espresso px-8 md:px-10 py-3 md:py-4 auren-label overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3 transition-transform duration-300 group-hover:-translate-x-1">
              Shop Now

              <ArrowRight
                size={12}
                className="transition-transform duration-300 group-hover:translate-x-2"
              />
            </span>

            <div className="absolute inset-0 bg-brown-accent translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-400" />
          </a>

          {/* TEXT ONLY */}
          <p className="auren-label text-off-white/50 tracking-[0.25em] uppercase text-[11px] md:text-base">
            Explore Collections
          </p>

        </div>

        {/* Bottom indicators */}
        <div className="flex items-center gap-2 mt-8 md:mt-12">

          {heroImages.map((_, i) => (
            <button
              key={i}
              className="transition-all duration-300"
              onClick={() => setCurrent(i)}
            >
              <div
                className="h-px bg-off-white transition-all duration-300"
                style={{
                  width:
                    i === current
                      ? '32px'
                      : '12px',

                  opacity:
                    i === current
                      ? 0.8
                      : 0.25,
                }}
              />
            </button>
          ))}

        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hidden md:flex absolute bottom-8 right-8 md:right-16 flex-col items-center gap-2"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1s 0.5s ease',
        }}
      >

        <span className="auren-label text-off-white/25 text-[9px] rotate-90 tracking-[0.3em]">
          scroll
        </span>

        <div className="w-px h-12 bg-gradient-to-b from-off-white/30 to-transparent" />

      </div>
      <FlashSalePopup />
    </section>
  );
}

