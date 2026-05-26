import React, { useState, useEffect } from 'react';
import { getCartItems, updateQuantity, removeFromCart, getCartTotal, type CartItem } from '../utils/cart';

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  const loadCart = () => {
    setItems(getCartItems());
    setTotal(getCartTotal());
  };

  useEffect(() => {
    loadCart();

    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener('cart-updated', handleCartUpdate as EventListener);
    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate as EventListener);
    };
  }, []);

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <a href="/" className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors">
          Start Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.product.id} className="flex flex-col sm:flex-row items-center gap-4 py-4 border-b border-gray-100">
            <img
              src={item.product.imageUrl}
              alt={item.product.name}
              className="w-24 h-24 object-cover rounded-md"
            />

            <div className="flex-grow text-center sm:text-left">
              <h3 className="font-semibold text-lg">{item.product.name}</h3>
              <p className="text-gray-500">${item.product.price.toFixed(2)}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              >
                -
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              >
                +
              </button>
            </div>

            <div className="text-right sm:w-24 font-semibold">
              ${(item.product.price * item.quantity).toFixed(2)}
            </div>

            <button
              onClick={() => handleRemove(item.product.id)}
              className="text-red-500 hover:text-red-700"
              aria-label="Remove item"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-xl">
          <span className="text-gray-500">Total: </span>
          <span className="font-bold">${total.toFixed(2)}</span>
        </div>
        <button className="w-full sm:w-auto bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors font-semibold text-lg">
          Checkout
        </button>
      </div>
    </div>
  );
}
