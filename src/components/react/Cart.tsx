import React, { useState, useEffect } from 'react';
import type { CartItem } from '../../types';

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  const loadCart = () => {
    const cartStr = localStorage.getItem('fashion_store_cart');
    if (cartStr) {
      try {
        setCart(JSON.parse(cartStr));
      } catch (e) {
        console.error("Failed to parse cart data", e);
        setCart([]);
      }
    } else {
        setCart([]);
    }
  };

  useEffect(() => {
    setMounted(true);
    loadCart();

    window.addEventListener('cart-updated', loadCart);
    return () => {
      window.removeEventListener('cart-updated', loadCart);
    };
  }, []);

  const updateQuantity = (id: string, delta: number) => {
    const updatedCart = cart.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0);

    setCart(updatedCart);
    localStorage.setItem('fashion_store_cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cart-updated'));
  };

  const removeItem = (id: string) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('fashion_store_cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cart-updated'));
  };

  if (!mounted) return null; // Avoid hydration mismatch

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-400 mb-8">Looks like you haven't added anything yet.</p>
        <a href="/" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
      <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-4">Shopping Cart</h2>

      <div className="space-y-6">
        {cart.map(item => (
          <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 py-4 border-b border-gray-700 last:border-0">
            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />

            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-gray-400">${item.price.toFixed(2)}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(item.id, -1)}
                className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, 1)}
                className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <div className="text-right sm:w-24 font-bold">
              ${(item.price * item.quantity).toFixed(2)}
            </div>

            <button
              onClick={() => removeItem(item.id)}
              className="text-red-400 hover:text-red-300 transition-colors p-2"
              aria-label="Remove item"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-gray-700 pt-6">
        <div className="flex justify-between items-center text-xl font-bold mb-6">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <button className="w-full bg-blue-600 text-white py-4 rounded-md font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
