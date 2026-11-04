import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, Minus, Plus, Trash2 } from 'lucide-react';
import { getCart, updateQuantity, removeFromCart, toggleCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function CartModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(getCart());

    const handleCartUpdate = (e: Event) => {
      setItems((e as CustomEvent<CartItem[]>).detail);
    };

    const handleToggleCart = (e: Event) => {
      const forceState = (e as CustomEvent<boolean | undefined>).detail;
      setIsOpen(prev => forceState !== undefined ? forceState : !prev);
    };

    window.addEventListener('cart-updated', handleCartUpdate);
    window.addEventListener('toggle-cart', handleToggleCart);

    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate);
      window.removeEventListener('toggle-cart', handleToggleCart);
    };
  }, []);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => toggleCart(false)} />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl">
            <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                <div className="ml-3 h-7 flex items-center">
                  <button
                    type="button"
                    className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                    onClick={() => toggleCart(false)}
                    aria-label="Close cart"
                  >
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="mt-8">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {items.length === 0 ? (
                      <li className="py-6 text-center text-gray-500">Your cart is empty</li>
                    ) : (
                      items.map((item) => (
                        <li key={item.id} className="py-6 flex">
                          <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-center object-cover"
                            />
                          </div>

                          <div className="ml-4 flex-1 flex flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>{item.name}</h3>
                                <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                            </div>
                            <div className="flex-1 flex items-end justify-between text-sm">
                              <div className="flex items-center border rounded">
                                <button
                                  className="p-1 hover:bg-gray-100"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="px-3 py-1 font-medium">{item.quantity}</span>
                                <button
                                  className="p-1 hover:bg-gray-100"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>

                              <div className="flex">
                                <button
                                  type="button"
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  <Trash2 className="h-5 w-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${total.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
              <div className="mt-6">
                <button
                  className="flex justify-center items-center w-full rounded-md border border-transparent px-6 py-3 text-base font-medium text-white shadow-sm bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={items.length === 0}
                  onClick={() => alert('Checkout functionality would go here!')}
                >
                  Checkout
                </button>
              </div>
              <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                <p>
                  or{' '}
                  <button
                    type="button"
                    className="text-indigo-600 font-medium hover:text-indigo-500"
                    onClick={() => toggleCart(false)}
                  >
                    Continue Shopping<span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}