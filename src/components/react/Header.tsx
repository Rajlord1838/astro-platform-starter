import React, { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { getCart, toggleCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function Header() {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = (cart: CartItem[]) => {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  };

  useEffect(() => {
    // Initial load
    updateCartCount(getCart());

    // Listen for cart updates
    const handleCartUpdate = (e: CustomEvent<CartItem[]>) => {
      updateCartCount(e.detail);
    };

    window.addEventListener('cart-updated', handleCartUpdate as EventListener);

    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate as EventListener);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-12">
        <a href="/" className="text-xl font-bold tracking-tight text-gray-900 no-underline">
          FASHION<span className="font-light">STORE</span>
        </a>

        <button
          onClick={() => toggleCart(true)}
          className="relative flex items-center justify-center rounded-full p-2 text-gray-700 transition hover:bg-gray-100"
          aria-label="Open cart"
        >
          <ShoppingBag className="h-6 w-6" />
          {cartCount > 0 && (
            <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
