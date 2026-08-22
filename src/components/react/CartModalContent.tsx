import React, { useState, useEffect } from 'react';
import { getCart, updateQuantity, removeFromCart, clearCart } from '../../utils/cart';
import type { CartItem } from '../../types';
import { X, Minus, Plus, Trash2 } from 'lucide-react';

export default function CartModalContent() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  const loadCart = () => {
    setCartItems(getCart());
  };

  useEffect(() => {
    setMounted(true);
    loadCart();
    window.addEventListener('cart-updated', loadCart);
    return () => window.removeEventListener('cart-updated', loadCart);
  }, []);

  const closeCart = () => {
    const dialog = document.getElementById('cart-modal') as HTMLDialogElement;
    if (dialog) {
      dialog.close();
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full bg-white text-gray-900 rounded-lg max-w-md w-full mx-auto sm:h-auto sm:max-h-[80vh] overflow-hidden shadow-xl">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button onClick={closeCart} className="p-1 transition hover:text-gray-600 cursor-pointer" aria-label="Close cart">
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-gray-500">
            <p>Your cart is empty.</p>
            <button onClick={closeCart} className="mt-4 text-blue-600 underline cursor-pointer">
              Continue Shopping
            </button>
          </div>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item.product.id} className="flex items-center gap-4 py-2 border-b">
                <img src={item.product.image} alt={item.product.name} className="object-cover w-16 h-16 rounded" />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-sm text-gray-500">${item.product.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-2 text-red-500 transition hover:text-red-700 hover:bg-red-50 rounded cursor-pointer"
                  aria-label="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="p-4 border-t bg-gray-50">
          <div className="flex items-center justify-between mb-4 text-lg font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="w-full py-3 font-bold text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700 cursor-pointer">
            Checkout
          </button>
          <button onClick={clearCart} className="w-full mt-2 py-2 text-sm text-gray-500 hover:text-gray-700 cursor-pointer">
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}
