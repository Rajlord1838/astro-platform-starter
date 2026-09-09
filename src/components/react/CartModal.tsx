import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import type { CartItem } from '../../types';
import { getCart, updateQuantity, removeFromCart, clearCart } from '../../utils/cart';

export function CartModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  const loadCart = () => {
    setItems(getCart());
  };

  useEffect(() => {
    loadCart();

    const handleCartUpdated = () => loadCart();
    const handleToggleCart = () => setIsOpen(prev => !prev);

    window.addEventListener('cart-updated', handleCartUpdated);
    window.addEventListener('toggle-cart', handleToggleCart);

    return () => {
      window.removeEventListener('cart-updated', handleCartUpdated);
      window.removeEventListener('toggle-cart', handleToggleCart);
    };
  }, []);

  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setIsOpen(false)}>
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right text-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShoppingBag size={24} />
            Your Cart ({itemCount})
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-gray-800"
            aria-label="Close cart"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <ShoppingBag size={64} className="mb-4 text-gray-300" />
              <p className="text-lg font-medium">Your cart is empty.</p>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-4 text-blue-600 hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.product.id} className="flex gap-4 py-2 border-b border-gray-100 last:border-0 pb-4">
                  <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-semibold line-clamp-2 pr-2">{item.product.title}</h3>
                        <span className="font-bold whitespace-nowrap">${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">${item.product.price.toFixed(2)} each</p>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-sm font-medium border-x border-gray-300">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-4 text-lg font-bold">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex justify-center items-center gap-2 mb-2"
              onClick={() => {
                alert('Checkout not implemented in this demo.');
                clearCart();
                setIsOpen(false);
              }}
            >
              Checkout
            </button>
            <button
              onClick={clearCart}
              className="w-full text-center text-sm text-gray-500 hover:text-gray-800 py-2 transition-colors"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
