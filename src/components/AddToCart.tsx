import React from 'react';
import type { Product } from '../data/products';
import { addToCart } from '../utils/cart';

interface AddToCartProps {
  product: Product;
}

export default function AddToCart({ product }: AddToCartProps) {
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="w-full mt-4 btn btn-lg"
    >
      Add to Cart
    </button>
  );
}
