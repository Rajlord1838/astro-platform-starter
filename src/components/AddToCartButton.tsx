import React, { useState } from 'react';
import type { Product } from '../data/products';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    // Read current cart
    const cartData = localStorage.getItem('shopping-cart');
    const cart = cartData ? JSON.parse(cartData) : [];

    // Check if item already in cart
    const existingItemIndex = cart.findIndex((item: any) => item.product.id === product.id);

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push({ product, quantity: 1 });
    }

    // Save back to local storage
    localStorage.setItem('shopping-cart', JSON.stringify(cart));

    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('cart-updated'));

    // Show temporary feedback
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`w-full py-2 px-4 rounded font-semibold transition-colors ${
        added ? 'bg-green-600 text-white' : 'bg-primary text-primary-content hover:bg-primary/85'
      }`}
    >
      {added ? 'Added to Cart!' : 'Add to Cart'}
    </button>
  );
}
