'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ArrowRight } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    const { error } = await supabase.from('newsletter_subscribers').insert({ email });
    if (error && error.code !== '23505') {
      setStatus('error');
    } else {
      setStatus('success');
      setEmail('');
    }
  };

  return (
    <section className="py-24 md:py-36 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-brown-main/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brown-main/20 to-transparent" />

      <div className="relative max-w-[700px] mx-auto px-6 text-center">
        <span className="auren-label text-off-white/30 tracking-[0.3em] block mb-6">Stay in the Loop</span>
        <h2 className="auren-heading text-off-white text-[clamp(36px,6vw,80px)] mb-4">
          The Drop List
        </h2>
        <p className="text-off-white/40 text-sm mb-12 leading-relaxed">
          Be the first to know about new drops, exclusive restocks, and campaigns before the public.
        </p>

        {status === 'success' ? (
          <div className="border border-brown-accent/40 px-8 py-5 text-off-white/60 text-sm tracking-wider">
            You&apos;re on the list. Welcome to AUREN.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-0 max-w-[480px] mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 bg-brown-soft/30 border border-brown-soft/40 border-r-0 text-off-white placeholder:text-off-white/25 px-5 py-4 text-sm focus:outline-none focus:border-off-white/30 transition-colors"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-off-white text-espresso px-6 py-4 auren-label hover:bg-off-white/90 transition-colors flex items-center gap-2 flex-shrink-0 disabled:opacity-60"
            >
              {status === 'loading' ? '...' : <><span className="hidden sm:inline">Subscribe</span><ArrowRight size={14} /></>}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="text-red-400/70 text-xs mt-3">Something went wrong. Please try again.</p>
        )}

        <p className="text-off-white/20 text-2xs tracking-widest mt-6 uppercase">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
