import React, { useState } from 'react';
import type { Product, CartItem } from '../../types';

interface Props {
  product: Product;
}

export default function AddToCartButton({ product }: Props) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    const existingCart = localStorage.getItem('fashion_store_cart');
    let cart: CartItem[] = existingCart ? JSON.parse(existingCart) : [];

    const existingItemIndex = cart.findIndex((item) => item.id === product.id);
    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('fashion_store_cart', JSON.stringify(cart));

    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('cart-updated'));

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`w-full py-3 px-6 rounded-md font-medium transition-colors ${
        added
          ? 'bg-green-600 text-white hover:bg-green-700'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
    >
      {added ? 'Added to Cart!' : 'Add to Cart'}
    </button>
  );
}
