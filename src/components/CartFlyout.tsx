import React, { useState, useEffect, useRef } from 'react';
import { CartItem, getCart, removeFromCart } from '../utils/cart';

export default function CartFlyout() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const flyoutRef = useRef<HTMLDivElement>(null);

  const updateCart = () => {
    setCartItems(getCart());
  };

  useEffect(() => {
    updateCart(); // Load initial cart state

    // Listen for custom event from other components
    window.addEventListener('cart-updated', updateCart);

    // Listen for flyout toggle event
    const handleToggle = () => setIsOpen(prev => !prev);
    window.addEventListener('toggle-cart', handleToggle);

    // Close on click outside
    const handleClickOutside = (e: MouseEvent) => {
      if (flyoutRef.current && !flyoutRef.current.contains(e.target as Node)) {
        // Only close if we didn't click the cart button (handled by toggle-cart)
        const target = e.target as HTMLElement;
        if (!target.closest('[data-cart-button]')) {
          setIsOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('cart-updated', updateCart);
      window.removeEventListener('toggle-cart', handleToggle);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div
      ref={flyoutRef}
      className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-slate-800 rounded-lg shadow-2xl border border-slate-700 z-50 overflow-hidden flex flex-col max-h-[80vh]"
    >
      <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-900/50">
        <h2 className="text-lg font-semibold text-white">Your Cart</h2>
        <button
          onClick={() => setIsOpen(false)}
          className="text-slate-400 hover:text-white transition-colors p-1"
          aria-label="Close cart"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {cartItems.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item.product.id} className="flex gap-4 items-center">
                <div className="h-16 w-16 bg-slate-200 rounded overflow-hidden flex-shrink-0">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-white truncate">{item.product.name}</h4>
                  <div className="text-sm text-slate-400 mt-1">
                    Qty: {item.quantity} × <span className="text-emerald-400">${item.product.price.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-2 text-slate-400 hover:text-red-400 transition-colors rounded-full hover:bg-slate-700/50"
                  aria-label="Remove item"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="p-4 border-t border-slate-700 bg-slate-900/50">
          <div className="flex justify-between items-center mb-4">
            <span className="text-slate-300 font-medium">Subtotal</span>
            <span className="text-xl font-bold text-white">${total.toFixed(2)}</span>
          </div>
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-md font-medium transition-colors">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
