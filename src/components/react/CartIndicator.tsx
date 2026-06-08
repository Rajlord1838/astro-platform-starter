import React, { useState, useEffect } from 'react';
import type { CartItem } from '../../types';

export default function CartIndicator() {
  const [itemCount, setItemCount] = useState(0);

  const updateCount = () => {
    const cartStr = localStorage.getItem('fashion_store_cart');
    if (cartStr) {
      try {
        const cart: CartItem[] = JSON.parse(cartStr);
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        setItemCount(count);
      } catch (e) {
        console.error("Failed to parse cart data", e);
      }
    } else {
        setItemCount(0);
    }
  };

  useEffect(() => {
    updateCount();
    window.addEventListener('cart-updated', updateCount);
    return () => {
      window.removeEventListener('cart-updated', updateCount);
    };
  }, []);

  if (itemCount === 0) return null;

  return (
    <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
      {itemCount}
    </div>
  );
}
