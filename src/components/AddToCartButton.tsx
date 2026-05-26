import React, { useState } from 'react';
import type { Product } from '../data/products';
import { addToCart } from '../utils/cart';

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

export default function AddToCartButton({ product, className = '' }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);

    // Reset added state after a short delay
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`w-full py-2 px-4 rounded-md font-semibold transition-colors ${
        added
          ? 'bg-green-600 text-white hover:bg-green-700'
          : 'bg-black text-white hover:bg-gray-800'
      } ${className}`}
    >
      {added ? 'Added to Cart ✓' : 'Add to Cart'}
    </button>
  );
}
