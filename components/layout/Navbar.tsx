
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, User, Menu, X, Shield } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import CartDrawer from '@/components/cart/CartDrawer';
import { checkAdmin } from '@/lib/isAdmin';

export default function Navbar() {

  const [scrolled, setScrolled] =
    useState(false);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [isAdmin, setIsAdmin] =
    useState(false);

  const { itemCount, openCart } =
    useCartStore();

  const count = itemCount();

  useEffect(() => {

    const onScroll = () =>
      setScrolled(window.scrollY > 60);

    window.addEventListener(
      'scroll',
      onScroll,
      { passive: true }
    );

    return () =>
      window.removeEventListener(
        'scroll',
        onScroll
      );

  }, []);

  useEffect(() => {

    const loadAdmin = async () => {

      const admin =
        await checkAdmin();

      setIsAdmin(admin);
    };

    loadAdmin();

  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[1000] transition-all duration-500"
        style={{
          backgroundColor: scrolled
            ? 'rgba(26,18,14,0.96)'
            : 'transparent',

          backdropFilter: scrolled
            ? 'blur(12px)'
            : 'none',

          borderBottom: scrolled
            ? '1px solid rgba(59,42,34,0.5)'
            : '1px solid transparent',
        }}
      >

        <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">

          {/* MOBILE MENU */}
          <button
            className="md:hidden text-off-white/80 hover:text-off-white transition-colors"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          {/* EMPTY SPACE */}
          <div className="hidden md:block w-[120px]" />

          {/* LOGO */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 text-off-white font-black tracking-[0.25em] text-lg hover:opacity-80 transition-opacity"
          >
            AUREN
          </Link>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-6">

            {/* ADMIN */}
            {isAdmin && (

              <Link
                href="/admin"
                className="text-off-white/70 hover:text-off-white transition-colors"
              >
                <Shield size={18} />
              </Link>

            )}

            {/* ACCOUNT */}
            <Link
              href="/account"
              className="text-off-white/70 hover:text-off-white transition-colors"
            >
              <User size={18} />
            </Link>

            {/* CART */}
            <button
              className="text-off-white/70 hover:text-off-white transition-colors relative"
              onClick={openCart}
              aria-label="Cart"
            >

              <ShoppingBag size={18} />

              {count > 0 && (

                <span className="absolute -top-2 -right-2 bg-off-white text-espresso text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {count > 9 ? '9+' : count}
                </span>

              )}

            </button>

          </div>

        </div>

      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (

        <div className="fixed inset-0 z-[1001] bg-espresso flex flex-col">

          <div className="px-6 h-16 flex items-center justify-between border-b border-brown-soft/30">

            <Link
              href="/"
              className="text-off-white font-black tracking-[0.25em] text-lg"
              onClick={() => setMenuOpen(false)}
            >
              AUREN
            </Link>

            <button
              className="text-off-white/70 hover:text-off-white"
              onClick={() => setMenuOpen(false)}
            >
              <X size={20} />
            </button>

          </div>

          <div className="flex flex-col px-6 py-12 gap-8">

            {/* ADMIN MOBILE */}
            {isAdmin && (

              <Link
                href="/admin"
                className="text-off-white text-3xl font-bold tracking-tight hover:text-off-white/60 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Admin
              </Link>

            )}

            {/* ACCOUNT */}
            <Link
              href="/account"
              className="text-off-white text-3xl font-bold tracking-tight hover:text-off-white/60 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Account
            </Link>

          </div>

        </div>

      )}

      <CartDrawer />
    </>
  );
}

