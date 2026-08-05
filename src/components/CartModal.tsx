import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { getCart, updateQuantity, removeFromCart, clearCart } from '../utils/cart';
import type { CartItem } from '../types';

export const CartModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const modalRef = useRef<HTMLDialogElement>(null);

  const refreshCart = () => {
    setCartItems(getCart());
  };

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      refreshCart();
      modalRef.current?.showModal();
    };

    const handleCartUpdate = () => {
      refreshCart();
    };

    window.addEventListener('open-cart', handleOpen);
    window.addEventListener('cart-updated', handleCartUpdate);

    return () => {
      window.removeEventListener('open-cart', handleOpen);
      window.removeEventListener('cart-updated', handleCartUpdate);
    };
  }, []);

  const closeCart = () => {
    setIsOpen(false);
    modalRef.current?.close();
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <dialog
      ref={modalRef}
      className="backdrop:bg-black/50 p-0 m-auto rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden bg-white text-gray-900 border-0"
      onClose={() => setIsOpen(false)}
    >
      <div className="flex flex-col h-full max-h-[90vh]">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">Shopping Cart</h2>
          <button
            onClick={closeCart}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-grow">
          {cartItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li key={item.product.id} className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-sm line-clamp-1">{item.product.name}</h3>
                    <p className="text-gray-500 text-sm">${item.product.price.toFixed(2)}</p>

                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-gray-300 rounded">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-2 text-sm w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100 cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="font-semibold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-lg">Total</span>
              <span className="font-bold text-xl">${totalAmount.toFixed(2)}</span>
            </div>
            <button
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded transition-colors cursor-pointer"
              onClick={() => {
                alert('Checkout implemented in next iteration!');
                clearCart();
                closeCart();
              }}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
};