'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { SALE_START_TIME, SALE_END_TIME } from '@/lib/cart-store';

export default function FlashSalePopup() {
  const [show, setShow] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // بيظهر بعد ثانيتين
    const timer = setTimeout(() => {
      const now = new Date();
      if (now >= SALE_START_TIME && now <= SALE_END_TIME) {
        setIsActive(true);
        setShow(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = SALE_END_TIME.getTime() - now.getTime();

      if (diff <= 0) {
        setShow(false);
        clearInterval(interval);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-espresso/80 backdrop-blur-sm"
        onClick={() => setShow(false)}
      />

      {/* Popup */}
      <div className="relative bg-brown-main border border-brown-soft/30 p-10 max-w-md w-full text-center">

        {/* Close */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-4 right-4 text-off-white/30 hover:text-off-white transition-colors"
        >
          <X size={16} />
        </button>

        {/* Label */}
        <p className="auren-label text-amber-400 tracking-[0.3em] text-xs mb-4">
          FLASH SALE 🔥
        </p>

        {/* Heading */}
        <h2 className="auren-heading text-off-white text-5xl mb-2">
          35% OFF
        </h2>

        <p className="text-off-white/50 text-sm tracking-wide mb-6">
          على أي طلب من قطعتين أو أكتر
        </p>

        {/* Timer */}
        <div className="bg-espresso/60 border border-brown-soft/20 py-4 px-6 mb-8">
          <p className="text-off-white/30 text-2xs tracking-widest uppercase mb-2">
            ينتهي خلال
          </p>
          <p className="text-off-white font-mono text-3xl tracking-widest">
            {timeLeft}
          </p>
        </div>

        

        {/* CTA */}
        <a
          href="#products"
          onClick={() => setShow(false)}
          className="block w-full bg-off-white text-espresso py-4 auren-label hover:bg-off-white/90 transition-colors"
        >
          shop now
        </a>

      </div>
    </div>
  );
}