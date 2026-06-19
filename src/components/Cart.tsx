import React, { useState, useEffect } from 'react';
import type { CartStore, CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState<CartStore>({ items: [], total: 0 });

  const loadCart = () => {
    try {
      const cartData = localStorage.getItem('fashion_store_cart');
      if (cartData) {
        setCart(JSON.parse(cartData));
      } else {
         setCart({ items: [], total: 0 });
      }
    } catch (e) {
      console.error('Failed to load cart', e);
    }
  };

  useEffect(() => {
    loadCart();

    const handleCartUpdate = () => loadCart();
    const handleOpenCart = () => setIsOpen(true);
    const handleStorage = (e: StorageEvent) => {
        if (e.key === 'fashion_store_cart') loadCart()
    }

    window.addEventListener('cart-updated', handleCartUpdate);
    window.addEventListener('open-cart', handleOpenCart);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate);
      window.removeEventListener('open-cart', handleOpenCart);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const saveCart = (newCart: CartStore) => {
    localStorage.setItem('fashion_store_cart', JSON.stringify(newCart));
    setCart(newCart);
    window.dispatchEvent(new Event('cart-updated'));
  };

  const updateQuantity = (id: string, delta: number) => {
    const newItems = cart.items.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0);

    const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    saveCart({ items: newItems, total: newTotal });
  };

  const removeItem = (id: string) => {
    const newItems = cart.items.filter(item => item.id !== id);
    const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    saveCart({ items: newItems, total: newTotal });
  };

  const handleCheckout = () => {
      alert("Checkout functionality would go here!");
      saveCart({items: [], total: 0});
      setIsOpen(false);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsOpen(false)}></div>

      <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="pointer-events-auto w-screen max-w-md">
          <div className="flex h-full flex-col bg-white shadow-xl">

            <div className="flex items-center justify-between px-4 py-6 sm:px-6 border-b">
              <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
              <div className="ml-3 flex h-7 items-center">
                <button
                  type="button"
                  className="relative -m-2 p-2 text-gray-400 hover:text-gray-500 outline-none"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="absolute -inset-0.5"></span>
                  <span className="sr-only">Close panel</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              {cart.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
                  <ShoppingBag className="w-16 h-16 text-gray-300" />
                  <p className="text-lg">Your cart is empty.</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-4 text-indigo-600 hover:text-indigo-500 font-medium"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {cart.items.map((item) => (
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
                              <h3>{item.name}</h3>
                              <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="flex items-center border rounded-md">
                                <button
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="px-3 py-1 text-gray-700 font-medium">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex">
                              <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                className="font-medium text-indigo-600 hover:text-indigo-500 flex items-center gap-1"
                              >
                                <Trash2 className="w-4 h-4" />
                                <span>Remove</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {cart.items.length > 0 && (
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${cart.total.toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                <div className="mt-6">
                  <button
                    onClick={handleCheckout}
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Checkout
                  </button>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or{' '}
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
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
  );
}
