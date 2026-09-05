import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { getCart, updateQuantity, removeFromCart, type CartItem } from '../../utils/cart';
import { products } from '../../data/products';

export default function CartSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const updateCart = () => setCartItems(getCart());
    const toggleCart = () => setIsOpen((prev) => !prev);

    updateCart();
    window.addEventListener('cart-updated', updateCart);
    window.addEventListener('toggle-cart', toggleCart);

    return () => {
      window.removeEventListener('cart-updated', updateCart);
      window.removeEventListener('toggle-cart', toggleCart);
    };
  }, []);

  const cartTotal = cartItems.reduce((total, item) => {
    const product = products.find((p) => p.id === item.productId);
    return total + (product?.price || 0) * item.quantity;
  }, 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white text-gray-900 shadow-2xl z-50 flex flex-col transform transition-transform">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              <p>Your cart is empty</p>
              <button
                onClick={() => setIsOpen(false)}
                className="btn mt-4"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => {
              const product = products.find((p) => p.id === item.productId);
              if (!product) return null;

              return (
                <div key={item.productId} className="flex gap-4 border-b pb-4">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-20 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between">
                      <h3 className="font-semibold line-clamp-2">{product.name}</h3>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-primary font-medium mt-1">${product.price.toFixed(2)}</p>

                    <div className="flex items-center gap-3 mt-auto pt-2">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="p-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-6 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="p-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-4 border-t bg-gray-50">
            <div className="flex justify-between items-center mb-4 text-lg font-bold">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <button className="btn w-full py-3 text-lg">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
