'use client';

import { useCartStore } from '@/lib/cart-store';
import Link from 'next/link';
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCartStore();
  const cartTotal = total();
  const shipping = cartTotal >= 300 ? 0 : 25;

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-16">
        <span className="auren-label text-off-white/30 tracking-[0.3em] block mb-3">Your Selection</span>
        <h1 className="auren-heading text-off-white text-[clamp(40px,6vw,88px)] mb-14">Cart</h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center py-24 gap-6">
            <ShoppingBag size={48} className="text-off-white/15" />
            <p className="text-off-white/30 text-sm">Your cart is empty.</p>
            <Link href="/shop" className="auren-label text-off-white border-b border-off-white/30 pb-0.5 hover:border-off-white transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items */}
            <div className="lg:col-span-2 space-y-0">
              <div className="border-t border-brown-soft/20">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-6 py-6 border-b border-brown-soft/20">
                    <div className="w-24 h-32 bg-brown-soft/20 flex-shrink-0 overflow-hidden">
                      <img
                      src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-off-white/30 text-2xs tracking-widest uppercase mb-1">{item.size}</p>
                          <h3 className="text-off-white text-sm font-semibold tracking-wide">{item.name}</h3>
                          <p className="text-off-white/40 text-2xs mt-1 tracking-widest uppercase">Size: {item.size}</p>
                        </div>
                        <button
                          className="text-off-white/30 hover:text-off-white transition-colors"
                          onClick={() => removeItem(item.id, item.size)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-0 border border-brown-soft/40">
                          <button
                            className="w-8 h-8 flex items-center justify-center text-off-white/60 hover:text-off-white border-r border-brown-soft/40 transition-colors"
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          >
                            <Minus size={10} />
                          </button>
                          <span className="w-10 text-center text-off-white text-sm">{item.quantity}</span>
                          <button
                            className="w-8 h-8 flex items-center justify-center text-off-white/60 hover:text-off-white border-l border-brown-soft/40 transition-colors"
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                        <span className="text-off-white font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div>
              <div className="bg-brown-main/40 border border-brown-soft/20 p-8">
                <h2 className="auren-label text-off-white/60 mb-6">Order Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-off-white/50">Subtotal</span>
                    <span className="text-off-white">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-off-white/50">Shipping</span>
                    <span className="text-off-white">{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-off-white/30 text-2xs">Free shipping on orders over $300</p>
                  )}
                  <div className="border-t border-brown-soft/20 pt-3 flex justify-between font-semibold">
                    <span className="text-off-white">Total</span>
                    <span className="text-off-white text-lg">${(cartTotal + shipping).toFixed(2)}</span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="mt-8 w-full bg-off-white text-espresso py-4 auren-label flex items-center justify-center gap-3 hover:bg-off-white/90 transition-colors"
                >
                  Checkout <ArrowRight size={12} />
                </Link>
                <Link
                  href="/shop"
                  className="mt-3 w-full border border-brown-soft/30 text-off-white/50 py-3 auren-label flex items-center justify-center hover:border-off-white/30 hover:text-off-white transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}