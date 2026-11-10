import React, { useEffect, useState } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { getCart, updateQuantity, toggleCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    // Initial load
    setCart(getCart());

    const handleToggle = (e: CustomEvent<boolean>) => {
      setIsOpen(e.detail);
    };

    const handleCartUpdate = (e: CustomEvent<CartItem[]>) => {
      setCart(e.detail);
    };

    window.addEventListener('toggle-cart', handleToggle as EventListener);
    window.addEventListener('cart-updated', handleCartUpdate as EventListener);

    return () => {
      window.removeEventListener('toggle-cart', handleToggle as EventListener);
      window.removeEventListener('cart-updated', handleCartUpdate as EventListener);
    };
  }, []);

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 transition-opacity">
      <div className="w-full max-w-md h-full bg-white shadow-xl flex flex-col animate-in slide-in-from-right">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart
          </h2>
          <button
            onClick={() => toggleCart(false)}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
              <ShoppingBag className="h-12 w-12 opacity-20" />
              <p>Your cart is empty.</p>
              <button
                onClick={() => toggleCart(false)}
                className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.product.id} className="flex gap-4 p-2 border rounded-lg">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="h-24 w-20 object-cover rounded-md"
                />
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-sm leading-tight">{item.product.name}</h3>
                    <span className="font-semibold text-sm">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{item.product.category}</p>

                  <div className="mt-auto flex items-center gap-3">
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100 rounded-l-md"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100 rounded-r-md"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => updateQuantity(item.product.id, 0)}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 border-t bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium text-gray-600">Subtotal</span>
              <span className="text-xl font-bold">${total.toFixed(2)}</span>
            </div>
            <button className="w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
