import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart } from '../../utils/cart';

export default function CartButton() {
  const [itemCount, setItemCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  const updateCount = () => {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    setItemCount(count);
  };

  useEffect(() => {
    setMounted(true);
    updateCount();
    window.addEventListener('cart-updated', updateCount);
    return () => window.removeEventListener('cart-updated', updateCount);
  }, []);

  const openCart = () => {
    const dialog = document.getElementById('cart-modal') as HTMLDialogElement;
    if (dialog) {
      dialog.showModal();
    }
  };

  if (!mounted) {
    return (
      <button className="relative p-2 text-gray-900 transition hover:text-gray-600">
        <ShoppingCart size={24} />
      </button>
    );
  }

  return (
    <button
      onClick={openCart}
      className="relative p-2 text-gray-900 transition hover:text-gray-600 cursor-pointer"
      aria-label="Open Cart"
    >
      <ShoppingCart size={24} />
      {itemCount > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
          {itemCount}
        </span>
      )}
    </button>
  );
}
