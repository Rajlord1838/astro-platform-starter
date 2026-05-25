import React, { useState, useEffect } from 'react';

export default function CartIcon() {
  const [itemCount, setItemCount] = useState(0);

  const updateCartCount = () => {
    const cartData = localStorage.getItem('shopping-cart');
    if (cartData) {
      try {
        const cart = JSON.parse(cartData);
        const count = cart.reduce((total: number, item: any) => total + item.quantity, 0);
        setItemCount(count);
      } catch (e) {
        console.error('Error parsing cart data', e);
      }
    } else {
      setItemCount(0);
    }
  };

  useEffect(() => {
    // Initial check
    updateCartCount();

    // Listen to storage events (cross-tab sync)
    window.addEventListener('storage', (e) => {
      if (e.key === 'shopping-cart') {
        updateCartCount();
      }
    });

    // Listen to custom local event
    window.addEventListener('cart-updated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cart-updated', updateCartCount);
    };
  }, []);

  return (
    <a href="/cart" className="relative inline-flex items-center p-2 text-white hover:opacity-80 transition">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      {itemCount > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
          {itemCount}
        </span>
      )}
    </a>
  );
}
