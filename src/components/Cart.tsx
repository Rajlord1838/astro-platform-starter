import React, { useState, useEffect } from 'react';
import { getCart, removeFromCart, updateQuantity, type CartItem } from '../utils/cart';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  const loadCart = () => {
    setItems(getCart());
  };

  useEffect(() => {
    // Initial load
    loadCart();

    // Listeners
    const handleCartUpdate = () => loadCart();
    const handleToggleCart = () => setIsOpen(prev => !prev);

    window.addEventListener('cart-updated', handleCartUpdate);
    window.addEventListener('toggle-cart', handleToggleCart);

    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate);
      window.removeEventListener('toggle-cart', handleToggleCart);
    };
  }, []);

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-gray-900" />
            <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-400 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
              <ShoppingBag size={48} className="text-gray-300" />
              <p className="text-lg">Your cart is empty</p>
              <button
                onClick={() => setIsOpen(false)}
                className="text-black font-semibold hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 bg-white">
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-gray-900 line-clamp-2">{item.name}</h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-50 transition-colors rounded-l-lg"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-10 text-center font-medium text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-50 transition-colors rounded-r-lg"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <span className="font-bold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-6 bg-gray-50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-600 font-medium">Subtotal</span>
              <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors active:scale-[0.98] shadow-lg shadow-black/10">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
