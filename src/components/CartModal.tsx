import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { getCart, subscribeToCart, updateQuantity, clearCart } from '../utils/cartStore';
import type { CartItem } from '../types';

export default function CartModal() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const updateCart = () => {
      setCart(getCart());
    };

    updateCart();
    const unsubscribe = subscribeToCart(updateCart);
    return unsubscribe;
  }, []);

  const closeCart = () => {
    const dialog = document.getElementById('cart-modal') as HTMLDialogElement;
    if (dialog) {
      dialog.close();
    }
  };

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = () => {
    alert('Thank you for your purchase!');
    clearCart();
    closeCart();
  };

  return (
    <div className="flex flex-col h-full text-gray-900">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <ShoppingBag size={24} />
          Your Cart
        </h2>
        <button
          onClick={closeCart}
          className="p-1 rounded hover:bg-gray-100 transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
            <ShoppingBag size={48} className="text-gray-300" />
            <p>Your cart is empty.</p>
            <button
              onClick={closeCart}
              className="px-6 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item.product.id} className="flex gap-4 p-2 bg-gray-50 rounded-lg">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-sm">{item.product.name}</h3>
                    <p className="font-bold text-sm">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <p className="text-xs text-gray-500">{item.product.category}</p>

                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 rounded-full border border-gray-300 hover:bg-gray-200 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 rounded-full border border-gray-300 hover:bg-gray-200 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {cart.length > 0 && (
        <div className="p-4 border-t bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium">Total</span>
            <span className="text-xl font-bold">${total.toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
