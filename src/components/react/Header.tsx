import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCartItemCount, toggleCart } from '../../utils/cart';

export default function Header() {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    // Initial count
    setItemCount(getCartItemCount());

    // Listen for cart updates
    const handleCartUpdate = () => {
      setItemCount(getCartItemCount());
    };

    window.addEventListener('cart-updated', handleCartUpdate);
    return () => window.removeEventListener('cart-updated', handleCartUpdate);
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="text-xl font-bold text-gray-900">
              Fashion Store
            </a>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => toggleCart(true)}
              className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-label="Open cart"
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
