import React, { useState } from 'react';
import { addToCart } from '../utils/cart';
import type { Product } from '../data/products';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`w-full py-2 px-4 rounded font-semibold transition-colors ${
        isAdded
          ? 'bg-green-500 text-white hover:bg-green-600'
          : 'bg-white text-black hover:bg-gray-200'
      }`}
    >
      {isAdded ? 'Added to Cart!' : 'Add to Cart'}
    </button>
  );
}
