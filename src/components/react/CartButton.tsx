import React, { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { getCart, CART_UPDATED_EVENT, toggleCart } from '../../utils/cart';

export default function CartButton() {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const items = getCart();
      const count = items.reduce((total, item) => total + item.quantity, 0);
      setItemCount(count);
    };

    updateCount();
    window.addEventListener(CART_UPDATED_EVENT, updateCount);

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, updateCount);
    };
  }, []);

  return (
    <button
      onClick={() => toggleCart()}
      className="relative flex items-center justify-center p-2 text-white hover:opacity-80 transition-opacity"
      aria-label="Open cart"
    >
      <ShoppingBag size={24} />
      {itemCount > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
          {itemCount}
        </span>
      )}
    </button>
  );
}
