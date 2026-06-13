import React, { useState, useEffect } from 'react';
import type { CartItem } from '../types';
import { getCartItems, getCartTotal, removeFromCart, updateQuantity, CART_UPDATED_EVENT } from '../utils/cart';

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const loadCartData = () => {
      setItems(getCartItems());
      setTotal(getCartTotal());
    };

    // Initial load
    loadCartData();

    // Listen for updates
    window.addEventListener(CART_UPDATED_EVENT, loadCartData);

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, loadCartData);
    };
  }, []);

  if (!isMounted) {
    return <div className="text-center py-12">Loading cart...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-400 mb-8">Looks like you haven't added any items to your cart yet.</p>
        <a href="/" className="inline-block py-3 px-8 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors">
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-4 p-4 border border-gray-800 bg-gray-900 rounded-lg">
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>

                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between mb-1">
                      <h3 className="font-semibold text-lg">{item.product.name}</h3>
                      <span className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-gray-400">{item.product.category}</p>
                    <p className="text-sm text-gray-400">${item.product.price.toFixed(2)} each</p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-gray-700 rounded">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-3 py-1 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 border-l border-r border-gray-700">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-3 py-1 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-sm text-red-400 hover:text-red-300 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="p-6 border border-gray-800 bg-gray-900 rounded-lg sticky top-6">
            <h2 className="text-xl font-bold mb-4 border-b border-gray-800 pb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-4 border-t border-gray-800 mt-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full py-3 px-4 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
