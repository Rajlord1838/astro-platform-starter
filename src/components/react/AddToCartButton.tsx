import React from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';

interface Props {
  product: Product;
}

export default function AddToCartButton({ product }: Props) {
  const handleAdd = () => {
    addToCart(product);
  };

  return (
    <button
      onClick={handleAdd}
      className="w-full px-4 py-2 mt-4 text-sm font-bold text-white transition-colors bg-blue-600 rounded hover:bg-blue-700 cursor-pointer"
    >
      Add to Cart
    </button>
  );
}
