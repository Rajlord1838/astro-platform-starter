import React, { useState, useEffect } from 'react';
import { getCart } from '../utils/cart';
import CartFlyout from './CartFlyout';

export default function CartButton() {
  const [itemCount, setItemCount] = useState(0);
  const [isClient, setIsClient] = useState(false);

  const updateCount = () => {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    setItemCount(count);
  };

  useEffect(() => {
    setIsClient(true);
    updateCount();
    window.addEventListener('cart-updated', updateCount);
    return () => window.removeEventListener('cart-updated', updateCount);
  }, []);

  const toggleCart = () => {
    window.dispatchEvent(new Event('toggle-cart'));
  };

  return (
    <div className="relative">
      <button
        data-cart-button
        onClick={toggleCart}
        className="flex items-center gap-2 p-2 rounded-md bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700"
        aria-label="Toggle cart"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {isClient && itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {itemCount}
          </span>
        )}
      </button>
      <CartFlyout />
    </div>
  );
}
