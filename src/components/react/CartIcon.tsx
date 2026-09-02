import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCartItems, CART_UPDATED_EVENT, toggleCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export const CartIcon: React.FC = () => {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const items = getCartItems();
      const count = items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
      setItemCount(count);
    };

    updateCount();
    window.addEventListener(CART_UPDATED_EVENT, updateCount);
    return () => window.removeEventListener(CART_UPDATED_EVENT, updateCount);
  }, []);

  return (
    <button
      onClick={toggleCart}
      className="relative p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
      aria-label="Open cart"
    >
      <ShoppingCart size={24} />
      {itemCount > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
          {itemCount}
        </span>
      )}
    </button>
  );
};
