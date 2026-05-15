'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setExiting(true), 1600);
    const t2 = setTimeout(() => setVisible(false), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center"
      style={{
        backgroundColor: '#1A120E',
        transition: exiting ? 'opacity 0.6s ease, transform 0.6s ease' : 'none',
        opacity: exiting ? 0 : 1,
        transform: exiting ? 'translateY(-8px)' : 'translateY(0)',
        pointerEvents: exiting ? 'none' : 'all',
      }}
    >
      <div className="text-center">
        <div
          className="text-off-white font-black tracking-[0.3em] text-5xl md:text-7xl"
          style={{
            animation: 'fadeUp 0.8s cubic-bezier(0.25,0.46,0.45,0.94) forwards',
            letterSpacing: '0.3em',
          }}
        >
          AUREN
        </div>
        <div
          className="mt-6 flex items-center justify-center gap-1"
          style={{ animation: 'fadeUp 0.8s 0.3s cubic-bezier(0.25,0.46,0.45,0.94) both' }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full bg-off-white/40"
              style={{ animation: `pulse 1s ${i * 0.2}s ease-in-out infinite alternate` }}
            />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes pulse { from { opacity: 0.2; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}
