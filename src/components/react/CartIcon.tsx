import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart, toggleCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function CartIcon() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(getCart());

    const handleCartUpdate = (e: Event) => {
      setItems((e as CustomEvent<CartItem[]>).detail);
    };

    window.addEventListener('cart-updated', handleCartUpdate);
    return () => window.removeEventListener('cart-updated', handleCartUpdate);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button
      onClick={() => toggleCart()}
      className="relative p-2 text-gray-400 hover:text-gray-500"
      aria-label="Open cart"
    >
      <ShoppingCart className="h-6 w-6" />
      {totalItems > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-indigo-600 rounded-full">
          {totalItems}
        </span>
      )}
    </button>
  );
}