import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCartItems, toggleCart } from '../../utils/cart';

export default function CartButton() {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    // Initial load
    updateCount();

    // Listen for cart updates
    const handleCartUpdate = () => updateCount();
    window.addEventListener('cart-updated', handleCartUpdate);

    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate);
    };
  }, []);

  const updateCount = () => {
    const items = getCartItems();
    const count = items.reduce((total, item) => total + item.quantity, 0);
    setItemCount(count);
  };

  return (
    <button
      onClick={() => toggleCart()}
      className="relative p-2 rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
      aria-label="Toggle cart"
    >
      <ShoppingCart size={24} className="text-white" />
      {itemCount > 0 && (
        <span className="absolute top-0 right-0 -mt-1 -mr-1 flex items-center justify-center min-w-[20px] h-[20px] text-xs font-bold text-white bg-primary rounded-full px-1">
          {itemCount}
        </span>
      )}
    </button>
  );
}
