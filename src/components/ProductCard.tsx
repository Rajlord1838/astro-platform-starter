import React from 'react';
import type { Product, CartStore } from '../types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = () => {
    try {
      const cartData = localStorage.getItem('fashion_store_cart');
      let cart: CartStore = cartData ? JSON.parse(cartData) : { items: [], total: 0 };

      const existingItemIndex = cart.items.findIndex(item => item.id === product.id);

      if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += 1;
      } else {
        cart.items.push({ ...product, quantity: 1 });
      }

      cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      localStorage.setItem('fashion_store_cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cart-updated'));
    } catch (e) {
      console.error('Failed to add item to cart', e);
    }
  };

  return (
    <div className="group relative bg-white border rounded-lg overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col flex-1 p-4 justify-between">
        <div>
          <h3 className="text-sm text-gray-700 font-medium">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</p>
          <button
            onClick={addToCart}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            aria-label={`Add ${product.name} to cart`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus">
              <path d="M5 12h14"/>
              <path d="M12 5v14"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
