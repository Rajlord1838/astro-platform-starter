import { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { getCartItems, subscribeToCart } from '../utils/cart';

export default function CartButton() {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    // Initial load
    const items = getCartItems();
    setItemCount(items.reduce((total, item) => total + item.quantity, 0));

    // Subscribe to changes
    return subscribeToCart(() => {
      const updatedItems = getCartItems();
      setItemCount(updatedItems.reduce((total, item) => total + item.quantity, 0));
    });
  }, []);

  return (
    <button aria-label="Shopping Cart" className="relative p-2 text-gray-700 transition hover:text-black">
      <ShoppingBag className="w-6 h-6" />
      {itemCount > 0 && (
        <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-black rounded-full">
          {itemCount}
        </span>
      )}
    </button>
  );
}
