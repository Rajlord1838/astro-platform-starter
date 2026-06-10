import React, { useState } from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';

interface Props {
  product: Product;
}

export const AddToCartButton: React.FC<Props> = ({ product }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className={`w-full py-2 px-4 rounded font-semibold transition-colors ${
        isAdded
          ? 'bg-green-600 text-white hover:bg-green-700'
          : 'bg-black text-white hover:bg-gray-800'
      }`}
    >
      {isAdded ? 'Added to Cart!' : 'Add to Cart'}
    </button>
  );
};
