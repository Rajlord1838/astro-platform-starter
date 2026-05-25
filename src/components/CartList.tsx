import React, { useState, useEffect } from 'react';
import type { Product } from '../data/products';

interface CartItem {
  product: Product;
  quantity: number;
}

export default function CartList() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const cartData = localStorage.getItem('shopping-cart');
    if (cartData) {
      try {
        setCart(JSON.parse(cartData));
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
  }, []);

  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('shopping-cart', JSON.stringify(newCart));
    window.dispatchEvent(new CustomEvent('cart-updated'));
  };

  const updateQuantity = (productId: string, delta: number) => {
    const newCart = cart.map(item => {
      if (item.product.id === productId) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0);

    updateCart(newCart);
  };

  const removeItem = (productId: string) => {
    const newCart = cart.filter(item => item.product.id !== productId);
    updateCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  if (!isClient) {
    return <div className="text-center py-12">Loading cart...</div>;
  }

  if (cart.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-900 rounded-lg border border-gray-800">
        <svg className="w-16 h-16 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <a href="/" className="btn">Continue Shopping</a>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-grow flex flex-col gap-4">
        {cart.map((item) => (
          <div key={item.product.id} className="flex flex-col sm:flex-row bg-gray-900 rounded-lg p-4 border border-gray-800 items-center gap-6">
            <div className="w-24 h-24 flex-shrink-0 bg-gray-800 rounded overflow-hidden">
              <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
            </div>

            <div className="flex-grow text-center sm:text-left">
              <h3 className="text-lg font-bold">{item.product.name}</h3>
              <p className="text-primary font-semibold">${item.product.price.toFixed(2)}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(item.product.id, -1)}
                className="w-8 h-8 flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded text-xl font-bold"
              >
                -
              </button>
              <span className="w-8 text-center font-bold">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.product.id, 1)}
                className="w-8 h-8 flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded text-xl font-bold"
              >
                +
              </button>
            </div>

            <div className="font-bold text-lg min-w-[80px] text-right">
              ${(item.product.price * item.quantity).toFixed(2)}
            </div>

            <button
              onClick={() => removeItem(item.product.id)}
              className="p-2 text-gray-500 hover:text-red-500 transition-colors"
              title="Remove item"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="lg:w-80 flex-shrink-0">
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 sticky top-6">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>

          <div className="flex justify-between mb-4 text-gray-300">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-6 text-gray-300">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className="border-t border-gray-800 pt-4 mb-8">
            <div className="flex justify-between font-bold text-xl">
              <span>Total</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
          </div>

          <button className="w-full btn btn-lg" onClick={() => alert('Checkout not implemented in this demo.')}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
