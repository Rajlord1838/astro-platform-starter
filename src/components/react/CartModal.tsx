import React, { useEffect, useState, useRef } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { getCartItems, removeFromCart, updateQuantity, toggleCart, type CartItem } from '../../utils/cart';

export default function CartModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const handleToggle = (e: CustomEvent) => {
      const forceOpen = e.detail?.forceOpen;
      if (forceOpen === true) {
        setIsOpen(true);
      } else if (forceOpen === false) {
        setIsOpen(false);
      } else {
        setIsOpen((prev) => !prev);
      }
    };

    const handleUpdate = () => {
      setItems(getCartItems());
    };

    window.addEventListener('toggle-cart', handleToggle as EventListener);
    window.addEventListener('cart-updated', handleUpdate);

    // Initial load
    handleUpdate();

    return () => {
      window.removeEventListener('toggle-cart', handleToggle as EventListener);
      window.removeEventListener('cart-updated', handleUpdate);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const cartTotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      className="backdrop:bg-black/50 fixed top-0 right-0 m-0 h-full max-h-screen w-full sm:w-[400px] max-w-full bg-white text-gray-900 shadow-xl overflow-hidden rounded-none transition-transform duration-300 open:animate-slide-in-right"
    >
      <div className="flex flex-col h-full bg-white">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShoppingBag size={24} />
            Your Cart
          </h2>
          <button
            onClick={() => toggleCart(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <ShoppingBag size={48} className="mb-4 opacity-50" />
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.product.id} className="flex gap-4 p-2 bg-gray-50 rounded-lg">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-sm line-clamp-2">{item.product.name}</h3>
                      <p className="text-gray-700 font-medium">${item.product.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center bg-white border rounded-md">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                      >
                        <X size={14} /> Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-4 text-lg font-bold">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <button className="w-full btn py-3 text-lg" onClick={() => alert('Checkout not implemented')}>
              Checkout
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
}
