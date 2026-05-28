import React, { useState, useEffect } from 'react';
import type { Product } from '../utils/mockData';

interface CartItem {
  product: Product;
  quantity: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart from local storage and setup event listener for cross-component sync
  useEffect(() => {
    const loadCart = () => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch (e) {
          console.error("Failed to parse cart data", e);
        }
      }
    };

    // Initial load
    loadCart();

    // Listen for custom event from ProductCard or other components
    window.addEventListener('cart-updated', loadCart);

    return () => {
      window.removeEventListener('cart-updated', loadCart);
    };
  }, []);

  const updateQuantity = (productId: string, change: number) => {
    const updatedCart = [...cartItems];
    const itemIndex = updatedCart.findIndex(item => item.product.id === productId);

    if (itemIndex >= 0) {
      updatedCart[itemIndex].quantity += change;

      // Remove if quantity goes to 0
      if (updatedCart[itemIndex].quantity <= 0) {
        updatedCart.splice(itemIndex, 1);
      }

      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const removeItem = (productId: string) => {
    const updatedCart = cartItems.filter(item => item.product.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  return (
    <div className="relative">
      {/* Floating Cart Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-colors z-50 flex items-center justify-center"
        aria-label="Shopping Cart"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-white text-primary text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow">
            {totalItems}
          </span>
        )}
      </button>

      {/* Cart Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-xl flex flex-col text-gray-900 animate-slide-in-right">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold">Your Cart</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">
                  <p className="mb-4">Your cart is empty.</p>
                  <button onClick={() => setIsOpen(false)} className="text-primary hover:underline">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {cartItems.map((item) => (
                    <li key={item.product.id} className="flex gap-4">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover object-center" />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{item.product.name}</h3>
                            <p className="ml-4">${(item.product.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">${item.product.price.toFixed(2)} each</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex items-center border rounded">
                            <button onClick={() => updateQuantity(item.product.id, -1)} className="px-2 py-1 text-gray-600 hover:bg-gray-100">-</button>
                            <span className="px-2 font-medium">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product.id, 1)} className="px-2 py-1 text-gray-600 hover:bg-gray-100">+</button>
                          </div>
                          <button type="button" onClick={() => removeItem(item.product.id)} className="font-medium text-primary hover:text-primary/80">
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 p-6">
                <div className="flex justify-between text-lg font-medium text-gray-900 mb-4">
                  <p>Subtotal</p>
                  <p>${totalPrice.toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500 mb-6">Shipping and taxes calculated at checkout.</p>
                <button className="w-full bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors">
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
