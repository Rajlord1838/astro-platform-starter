import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';

export default function CartIcon() {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    // Function to calculate total items from localStorage
    const updateCount = () => {
      try {
        const cartString = localStorage.getItem('fashion_store_cart');
        if (cartString) {
          const cart = JSON.parse(cartString);
          const count = cart.reduce((total: number, item: any) => total + item.quantity, 0);
          setItemCount(count);
        } else {
          setItemCount(0);
        }
      } catch (e) {
        console.error("Error parsing cart:", e);
      }
    };

    // Initial load
    updateCount();

    // Listen for custom event when cart updates
    window.addEventListener('cart-updated', updateCount);

    return () => {
      window.removeEventListener('cart-updated', updateCount);
    };
  }, []);

  return (
    <div className="relative flex items-center gap-2">
      <ShoppingCart className="w-5 h-5" />
      <span className="hidden sm:inline">Cart</span>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
          {itemCount}
        </span>
      )}
    </div>
  );
}
