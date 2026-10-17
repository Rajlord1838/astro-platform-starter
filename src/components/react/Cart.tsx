import React, { useState, useEffect, useRef } from 'react';
import { getCartItems, removeFromCart, updateQuantity, toggleCart } from '../../utils/cart';
import type { CartItem } from '../../types';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    // Initial load
    setItems(getCartItems());

    // Listen for cart updates
    const handleCartUpdate = () => {
      setItems(getCartItems());
    };

    // Listen for toggle cart requests
    const handleToggleCart = (e: Event) => {
      const customEvent = e as CustomEvent;
      const shouldOpen = customEvent.detail.isOpen;
      setIsOpen(shouldOpen);
    };

    window.addEventListener('cart-updated', handleCartUpdate);
    window.addEventListener('toggle-cart', handleToggleCart);

    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate);
      window.removeEventListener('toggle-cart', handleToggleCart);
    };
  }, []);

  useEffect(() => {
    if (isOpen && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    } else if (!isOpen && dialogRef.current && dialogRef.current.open) {
      dialogRef.current.close();
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      className="backdrop:bg-black/50 p-0 m-0 ml-auto mr-0 h-full max-h-screen w-full max-w-md bg-gray-900 text-white shadow-xl transition-[transform,opacity] duration-300 ease-out open:animate-in open:slide-in-from-right closed:animate-out closed:slide-out-to-right"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShoppingBag />
            Your Cart
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <ShoppingBag size={48} className="mb-4 opacity-20" />
              <p>Your cart is empty</p>
              <button
                onClick={handleClose}
                className="mt-4 text-primary hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.product.id} className="flex gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium line-clamp-1">{item.product.name}</h3>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-400 hover:text-red-400 transition-colors"
                          aria-label={`Remove ${item.product.name} from cart`}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <p className="text-gray-400 text-sm">${item.product.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-700 rounded-md">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-800 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-800 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <span className="font-semibold">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-800 bg-gray-900">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400">Subtotal</span>
              <span className="text-xl font-bold">${total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-primary text-gray-900 py-3 rounded-md font-bold hover:bg-primary/90 transition-colors">
              Checkout
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
}
