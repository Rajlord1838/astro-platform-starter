import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { getCart, subscribeToCart } from '../utils/cartStore';

export default function CartButton() {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const cart = getCart();
      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      setItemCount(count);
    };

    updateCount();
    const unsubscribe = subscribeToCart(updateCount);
    return unsubscribe;
  }, []);

  const openCart = () => {
    const dialog = document.getElementById('cart-modal') as HTMLDialogElement;
    if (dialog) {
      dialog.showModal();
    }
  };

  return (
    <button
      onClick={openCart}
      className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
      aria-label="Open cart"
    >
      <ShoppingBag size={24} />
      {itemCount > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full translate-x-1 -translate-y-1">
          {itemCount}
        </span>
      )}
    </button>
  );
}
