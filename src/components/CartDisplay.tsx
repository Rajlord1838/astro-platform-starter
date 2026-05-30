import React, { useState, useEffect } from 'react';
import { getCart, removeFromCart, updateQuantity, CART_UPDATED_EVENT } from '../utils/cart';
import type { CartItem } from '../utils/cart';

export default function CartDisplay() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const refreshCart = () => {
      setItems(getCart());
    };

    // Initial load
    refreshCart();

    // Listen for cross-component/cross-tab updates
    window.addEventListener(CART_UPDATED_EVENT, refreshCart);
    window.addEventListener('storage', (e) => {
      if (e.key === 'fashion_store_cart') refreshCart();
    });

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, refreshCart);
    };
  }, []);

  if (!isClient) return null; // Avoid SSR mismatch

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-600">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white text-gray-900 rounded p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <div className="flex-1 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 py-4 border-b border-gray-200">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">${item.price}</p>

              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-2 py-1 bg-gray-200 rounded text-black"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-2 py-1 bg-gray-200 rounded text-black"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-auto text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center text-xl font-bold">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button className="w-full mt-4 btn btn-lg">
          Checkout
        </button>
      </div>
    </div>
  );
}
