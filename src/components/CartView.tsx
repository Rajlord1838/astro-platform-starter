import React, { useState, useEffect } from 'react';
import { getCart, removeFromCart, updateQuantity, getCartTotal, subscribeToCart, type CartItem } from '../utils/cart';

export default function CartView() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const updateState = () => {
      setCartItems(getCart());
      setTotal(getCartTotal());
    };

    updateState();
    const unsubscribe = subscribeToCart(updateState);
    return unsubscribe;
  }, []);

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <a href="/" className="btn">Continue Shopping</a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Shopping Cart</h2>

      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
        <div className="divide-y divide-gray-700">
          {cartItems.map((item) => (
            <div key={item.id} className="p-6 flex flex-col sm:flex-row items-center gap-6">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />

              <div className="flex-grow text-center sm:text-left">
                <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                <div className="text-primary font-bold mt-2">${item.price.toFixed(2)}</div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center bg-gray-900 rounded border border-gray-700">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-1 text-gray-400 hover:text-white"
                  >-</button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1 text-gray-400 hover:text-white"
                  >+</button>
                </div>

                <div className="w-20 text-right font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 hover:text-red-300 ml-2"
                  title="Remove item"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 p-6 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-2xl font-bold">
            Total: <span className="text-primary">${total.toFixed(2)}</span>
          </div>
          <button className="btn btn-lg w-full sm:w-auto">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
