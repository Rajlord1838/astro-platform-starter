import React from 'react';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';

interface Props {
  product: Product;
}

export const AddToCartButton: React.FC<Props> = ({ product }) => {
  return (
    <button
      onClick={() => addToCart(product)}
      className="flex items-center justify-center gap-2 bg-neutral-900 text-white px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors w-full"
      aria-label={`Add ${product.name} to cart`}
    >
      <ShoppingCart size={20} />
      <span>Add to Cart</span>
    </button>
  );
};
