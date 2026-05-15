'use client';

import { useCartStore } from '@/lib/cart-store';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total } = useCartStore();
  const cartTotal = total();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-espresso/70 backdrop-blur-sm z-[2000]"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 h-full w-full max-w-[420px] bg-brown-main z-[2001] flex flex-col transition-transform duration-500"
        style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}
      >
        {/* Header */}
        <div className="px-6 h-16 flex items-center justify-between border-b border-brown-soft/30">
          <div className="flex items-center gap-3">
            <ShoppingBag size={16} className="text-off-white/60" />
            <span className="auren-label text-off-white/80">Cart ({items.length})</span>
          </div>
          <button className="text-off-white/60 hover:text-off-white transition-colors" onClick={closeCart}>
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-6 px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={40} className="text-off-white/20" />
              <p className="text-off-white/40 text-sm">Your cart is empty.</p>
              <button
                className="auren-label text-off-white/60 border-b border-off-white/20 pb-0.5 hover:text-off-white hover:border-off-white transition-colors"
                onClick={closeCart}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-4">
                  <div className="w-20 h-24 bg-brown-soft/30 overflow-hidden flex-shrink-0">
                    <Image
                    src={item.image}
                      alt={item.name}
                      width={80}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-off-white text-xs font-semibold tracking-wide truncate">{item.name}</p>
                    <p className="text-off-white/40 text-2xs mt-1 tracking-widest uppercase">Size: {item.size}</p>
                    <p className="text-off-white/60 text-xs mt-2 font-medium">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        className="w-6 h-6 border border-brown-soft/60 flex items-center justify-center text-off-white/60 hover:text-off-white hover:border-off-white/40 transition-colors"
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                      >
                        <Minus size={10} />
                      </button>
                      <span className="text-off-white text-xs w-4 text-center">{item.quantity}</span>
                      <button
                        className="w-6 h-6 border border-brown-soft/60 flex items-center justify-center text-off-white/60 hover:text-off-white hover:border-off-white/40 transition-colors"
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                  </div>
                  <button
                    className="text-off-white/30 hover:text-off-white transition-colors self-start mt-1"
                    onClick={() => removeItem(item.id, item.size)}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-brown-soft/30 px-6 py-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="auren-label text-off-white/50">Subtotal</span>
              <span className="text-off-white font-semibold text-sm">${cartTotal.toFixed(2)}</span>
            </div>
            <p className="text-off-white/30 text-2xs">Shipping & taxes calculated at checkout</p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full bg-off-white text-espresso py-4 flex items-center justify-center auren-label hover:bg-off-white/90 transition-colors"
            >
              Proceed to Checkout
            </Link>
            <button
              className="w-full border border-brown-soft/50 text-off-white/60 py-3 auren-label hover:border-off-white/30 hover:text-off-white transition-colors"
              onClick={closeCart}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
