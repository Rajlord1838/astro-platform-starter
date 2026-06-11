import React, { useState, useEffect } from 'react';
import type { CartItem } from '../types';
import { getCart, CART_UPDATE_EVENT, removeFromCart, updateQuantity } from '../utils/cart';

export const CartContent: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const loadCart = () => {
      setCartItems(getCart());
    };

    loadCart();
    window.addEventListener(CART_UPDATE_EVENT, loadCart);

    return () => {
      window.removeEventListener(CART_UPDATE_EVENT, loadCart);
    };
  }, []);

  const closeCart = () => {
    const modal = document.getElementById('cart-modal') as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  };

  const totalCost = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
        <button onClick={closeCart} className="text-gray-500 hover:text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Your cart is empty.</p>
          <button onClick={closeCart} className="text-blue-600 hover:underline">Continue Shopping</button>
        </div>
      ) : (
        <>
          <div className="max-h-96 overflow-y-auto pr-2 mb-6 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 py-2 border-b last:border-0">
                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{item.name}</h4>
                  <p className="text-gray-600 text-sm">${item.price.toFixed(2)}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded text-gray-600 hover:bg-gray-300"
                    >-</button>
                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded text-gray-600 hover:bg-gray-300"
                    >+</button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-semibold text-gray-800">Total:</span>
              <span className="text-2xl font-bold text-gray-900">${totalCost.toFixed(2)}</span>
            </div>
            <button className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 px-4 rounded transition-colors">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};
