import React, { useEffect, useState } from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';
import { getCart, removeFromCart, updateQuantity, toggleCart } from '../../utils/cart';
import { products } from '../../data/products';
import type { CartItem } from '../../utils/cart';

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Initial load
    setCartItems(getCart());

    // Listeners
    const handleCartUpdate = () => setCartItems(getCart());
    const handleToggleCart = (e: CustomEvent<{open?: boolean}>) => {
      setIsOpen(prev => e.detail?.open !== undefined ? e.detail.open : !prev);
    };

    window.addEventListener('cart-updated', handleCartUpdate);
    window.addEventListener('toggle-cart', handleToggleCart as EventListener);

    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate);
      window.removeEventListener('toggle-cart', handleToggleCart as EventListener);
    };
  }, []);

  const cartProducts = cartItems.map(item => {
    const product = products.find(p => p.id === item.productId);
    return { item, product };
  }).filter(p => p.product !== undefined);

  const subtotal = cartProducts.reduce((sum, { item, product }) => {
    return sum + (product!.price * item.quantity);
  }, 0);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={() => toggleCart(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-xl flex flex-col transform transition-transform text-slate-800">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShoppingBag />
            Your Cart ({totalItems})
          </h2>
          <button
            onClick={() => toggleCart(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartProducts.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              <ShoppingBag size={48} className="mx-auto mb-4 opacity-50" />
              <p>Your cart is empty.</p>
              <button
                onClick={() => toggleCart(false)}
                className="mt-4 text-blue-600 hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartProducts.map(({ item, product }) => (
              <div key={item.productId} className="flex gap-4 p-2 bg-gray-50 rounded-lg">
                <img
                  src={product!.image}
                  alt={product!.name}
                  className="w-20 h-24 object-cover rounded"
                />
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold line-clamp-2">{product!.name}</h3>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="mt-auto flex justify-between items-end">
                    <span className="font-bold">${product!.price.toFixed(2)}</span>
                    <div className="flex items-center gap-3 bg-white border rounded px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="text-gray-500 hover:text-black"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="text-gray-500 hover:text-black"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartProducts.length > 0 && (
          <div className="border-t p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-4 text-lg font-bold">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">Shipping and taxes calculated at checkout.</p>
            <button className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
