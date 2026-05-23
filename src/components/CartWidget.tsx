import React, { useState, useEffect } from 'react';
import { getCart, getCartCount, getCartTotal, CART_UPDATED_EVENT } from '../utils/cart';

export default function CartWidget() {
  const [itemCount, setItemCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const updateCartState = () => {
      const cart = getCart();
      setItemCount(getCartCount(cart));
      setTotalPrice(getCartTotal(cart));
    };

    // Initial state load from local storage
    updateCartState();

    // Listen for cart updates
    window.addEventListener(CART_UPDATED_EVENT, updateCartState);

    // Also listen for storage events to sync across tabs
    window.addEventListener('storage', (e) => {
      if (e.key === 'fashion-store-cart') {
        updateCartState();
      }
    });

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, updateCartState);
      window.removeEventListener('storage', updateCartState);
    };
  }, []);

  // Avoid hydration mismatch by not rendering the cart state until mounted on the client
  if (!isMounted) {
    return (
      <div className="flex items-center gap-2 text-sm font-medium opacity-0">
        <span className="bg-white text-black px-2 py-1 rounded-full">0</span>
        <span>$0.00</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-sm font-medium">
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {itemCount}
            </span>
          )}
        </div>
        <span className="ml-2">${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
}
