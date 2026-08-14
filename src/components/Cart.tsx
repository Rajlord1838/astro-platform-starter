import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { getCart, getCartTotal, getCartCount, removeFromCart, updateQuantity, CART_UPDATED_EVENT, type CartItem } from '../utils/cart';

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const updateCartState = () => {
      setCartItems(getCart());
      setCartTotal(getCartTotal());
      setCartCount(getCartCount());
    };

    updateCartState();
    window.addEventListener(CART_UPDATED_EVENT, updateCartState);

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, updateCartState);
    };
  }, []);

  if (!isClient) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-gray-700 hover:text-black transition-colors"
        aria-label="Open cart"
      >
        <ShoppingCart size={24} />
        {cartCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
            {cartCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0 bg-black/50 transition-opacity"
              aria-hidden="true"
              onClick={() => setIsOpen(false)}
            />

            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="absolute -inset-0.5"></span>
                          <span className="sr-only">Close panel</span>
                          <X size={24} aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {cartItems.length === 0 ? (
                            <li className="py-6 text-center text-gray-500">
                              Your cart is empty.
                            </li>
                          ) : (
                            cartItems.map((item) => (
                              <li key={item.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href="#">{item.name}</a>
                                      </h3>
                                      <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div className="flex items-center border rounded">
                                      <button
                                        className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        aria-label="Decrease quantity"
                                      >
                                        <Minus size={16} />
                                      </button>
                                      <span className="px-3 py-1 font-medium text-gray-900">{item.quantity}</span>
                                      <button
                                        className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        aria-label="Increase quantity"
                                      >
                                        <Plus size={16} />
                                      </button>
                                    </div>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-red-600 hover:text-red-500 flex items-center gap-1"
                                        onClick={() => removeFromCart(item.id)}
                                      >
                                        <Trash2 size={16} />
                                        <span>Remove</span>
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

                  {cartItems.length > 0 && (
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${cartTotal.toFixed(2)}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800"
                          onClick={(e) => { e.preventDefault(); alert('Checkout functionality not implemented yet.'); }}
                        >
                          Checkout
                        </a>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{' '}
                          <button
                            type="button"
                            className="font-medium text-black hover:text-gray-800"
                            onClick={() => setIsOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
