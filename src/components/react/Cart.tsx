import React, { useEffect, useState } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import type { CartItem } from '../../types';
import {
  getCart,
  getCartTotal,
  removeFromCart,
  updateQuantity,
  CART_UPDATED_EVENT,
  TOGGLE_CART_EVENT
} from '../../utils/cart';

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Initial load
    setItems(getCart());

    const handleCartUpdate = () => setItems(getCart());
    const handleToggle = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail !== undefined) {
        setIsOpen(customEvent.detail);
      } else {
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener(CART_UPDATED_EVENT, handleCartUpdate);
    window.addEventListener(TOGGLE_CART_EVENT, handleToggle);

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, handleCartUpdate);
      window.removeEventListener(TOGGLE_CART_EVENT, handleToggle);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 transition-opacity"
        onClick={() => setIsOpen(false)}
      />
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-4 py-3 text-gray-900">
          <h2 className="text-lg font-medium flex items-center gap-2">
            <ShoppingBag size={20} />
            Shopping Cart
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded p-2 hover:bg-gray-100"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-gray-500">
              <ShoppingBag size={48} className="mb-4 text-gray-300" />
              <p>Your cart is empty</p>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-4 text-sm text-gray-900 underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4 text-gray-900">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{item.name}</h3>
                      <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center rounded border border-gray-200">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-2 py-1">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="font-medium text-red-600 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-200 p-4">
            <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
              <p>Subtotal</p>
              <p>${getCartTotal(items).toFixed(2)}</p>
            </div>
            <button
              className="w-full rounded-md border border-transparent bg-gray-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800"
              onClick={() => alert('Checkout not implemented in this demo')}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
