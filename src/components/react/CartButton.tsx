import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart } from '../../utils/cart';

export function CartButton() {
  const [itemCount, setItemCount] = useState(0);

  const updateCount = () => {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    setItemCount(count);
  };

  useEffect(() => {
    updateCount();
    window.addEventListener('cart-updated', updateCount);
    return () => window.removeEventListener('cart-updated', updateCount);
  }, []);

  const openCart = () => {
    window.dispatchEvent(new Event('toggle-cart'));
  };

  return (
    <button
      onClick={openCart}
      className="relative p-2 text-white hover:bg-white/10 rounded-full transition-colors flex items-center gap-2"
      aria-label="Shopping Cart"
    >
      <ShoppingCart size={24} />
      {itemCount > 0 && (
        <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
          {itemCount}
        </span>
      )}
    </button>
  );
}
