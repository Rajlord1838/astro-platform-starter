import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import {
  getCartItems,
  CART_UPDATED_EVENT,
  TOGGLE_CART_EVENT,
  removeFromCart,
  updateQuantity
} from '../../utils/cart';
import type { CartItem } from '../../types';

export const CartModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const handleUpdate = () => setItems(getCartItems());
    const handleToggle = () => setIsOpen(prev => !prev);

    // Initial load
    handleUpdate();

    window.addEventListener(CART_UPDATED_EVENT, handleUpdate);
    window.addEventListener(TOGGLE_CART_EVENT, handleToggle);

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, handleUpdate);
      window.removeEventListener(TOGGLE_CART_EVENT, handleToggle);
    };
  }, []);

  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <ShoppingBag />
            Your Cart
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-neutral-500">
              <ShoppingBag size={48} className="mb-4 opacity-50" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-4 p-4 bg-neutral-50 rounded-lg">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-medium text-neutral-900">{item.product.name}</h3>
                    <p className="text-sm text-neutral-500">${item.product.price.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 hover:bg-white rounded border border-neutral-200 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 hover:bg-white rounded border border-neutral-200 transition-colors"
                    >
                      <Plus size={16} />
                    </button>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="ml-auto text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t bg-neutral-50">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-neutral-700">Total</span>
              <span className="text-xl font-bold">${total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-neutral-900 text-white py-3 rounded-lg font-medium hover:bg-neutral-800 transition-colors">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
