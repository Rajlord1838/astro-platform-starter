import React, { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { getCart, toggleCart } from '../../utils/cart';

export default function CartButton() {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
      setItemCount(count);
    };

    updateCount();
    window.addEventListener('cart-updated', updateCount);

    return () => window.removeEventListener('cart-updated', updateCount);
  }, []);

  return (
    <button
      onClick={() => toggleCart(true)}
      className="relative p-2 text-white hover:bg-white/10 rounded-full transition-colors flex items-center justify-center"
      aria-label="Open cart"
    >
      <ShoppingBag size={24} />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
          {itemCount}
        </span>
      )}
    </button>
  );
}
