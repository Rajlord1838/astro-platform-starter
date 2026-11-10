import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart, toggleCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function Header() {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    // Initial load
    const cart = getCart();
    setItemCount(cart.reduce((total, item) => total + item.quantity, 0));

    // Listen to updates
    const handleCartUpdate = (e: CustomEvent<CartItem[]>) => {
      setItemCount(e.detail.reduce((total, item) => total + item.quantity, 0));
    };

    window.addEventListener('cart-updated', handleCartUpdate as EventListener);
    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate as EventListener);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <a href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">VogueStore</span>
        </a>
        <button
          onClick={() => toggleCart(true)}
          className="relative rounded-full p-2 hover:bg-gray-100 transition-colors"
          aria-label="Open cart"
        >
          <ShoppingCart className="h-6 w-6" />
          {itemCount > 0 && (
            <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
