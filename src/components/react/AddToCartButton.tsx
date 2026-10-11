import React from 'react';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../../data/products';
import { addToCart } from '../../utils/cart';

interface Props {
  product: Product;
}

export default function AddToCartButton({ product }: Props) {
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="btn w-full mt-4 flex items-center justify-center gap-2"
      aria-label={`Add ${product.name} to cart`}
    >
      <ShoppingCart size={18} />
      Add to Cart
    </button>
  );
}
