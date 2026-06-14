import React, { useState } from 'react';
import type { Product } from '../data/products';

interface Props {
  product: Product;
}

export default function AddToCartButton({ product }: Props) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    try {
      const cartString = localStorage.getItem('fashion_store_cart');
      let cart = cartString ? JSON.parse(cartString) : [];

      const existingItemIndex = cart.findIndex((item: any) => item.product.id === product.id);

      if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
      } else {
        cart.push({ product, quantity: 1 });
      }

      localStorage.setItem('fashion_store_cart', JSON.stringify(cart));

      // Dispatch custom event to update cart icon
      window.dispatchEvent(new Event('cart-updated'));

      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    } catch (e) {
      console.error("Error adding to cart:", e);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdded}
      className={`flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white sm:w-full transition-colors ${
        isAdded ? 'bg-green-600 hover:bg-green-700' : 'bg-black hover:bg-gray-800'
      }`}
    >
      {isAdded ? 'Added to Cart!' : 'Add to Cart'}
    </button>
  );
}
