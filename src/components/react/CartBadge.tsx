import React, { useState, useEffect } from 'react';
import { getCartItems, toggleCart } from '../../utils/cart';
import { ShoppingCart } from 'lucide-react';

export default function CartBadge() {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const items = getCartItems();
      const count = items.reduce((sum, item) => sum + item.quantity, 0);
      setItemCount(count);
    };

    // Initial load
    updateCount();

    // Listen for updates
    window.addEventListener('cart-updated', updateCount);
    return () => window.removeEventListener('cart-updated', updateCount);
  }, []);

  return (
    <button
      onClick={() => toggleCart(true)}
      className="relative p-2 text-white hover:text-primary transition-colors focus:outline-none"
      aria-label="Open cart"
    >
      <ShoppingCart size={24} />
      {itemCount > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-gray-900 transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full">
          {itemCount}
        </span>
      )}
    </button>
  );
}
