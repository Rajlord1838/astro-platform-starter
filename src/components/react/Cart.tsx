import React, { useState, useEffect } from 'react';
import { getCart, removeFromCart, updateQuantity, type CartItem } from '../../utils/cart';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';

export const Cart: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Initial load
    setCartItems(getCart());

    const handleCartUpdate = () => {
      setCartItems(getCart());
    };

    const handleToggleCart = () => {
      setIsOpen(prev => !prev);
    };

    window.addEventListener('cart-updated', handleCartUpdate);
    window.addEventListener('toggle-cart', handleToggleCart);

    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate);
      window.removeEventListener('toggle-cart', handleToggleCart);
    };
  }, []);

  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
      <div className="w-full max-w-md bg-white h-full shadow-xl flex flex-col text-black">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShoppingBag />
            Your Cart
          </h2>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full" aria-label="Close cart">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <ShoppingBag size={48} className="mb-4 opacity-50" />
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li key={item.product.id} className="flex gap-4 border-b pb-4">
                  <div className="w-20 h-20 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col grow justify-between">
                    <div className="flex justify-between">
                      <h3 className="font-semibold line-clamp-1">{item.product.name}</h3>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-400 hover:text-red-500"
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <X size={18} />
                      </button>
                    </div>
                    <div className="flex justify-between items-end">
                      <p className="font-bold">${item.product.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 bg-gray-100 rounded p-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-white rounded"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-6 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-white rounded"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-4 border-t bg-gray-50">
            <div className="flex justify-between items-center mb-4 text-lg font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
