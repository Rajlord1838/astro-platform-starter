import React from 'react';
import type { Product } from '../data/products';
import { addToCart } from '../utils/cart';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="flex flex-col bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700">
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-white">{product.name}</h3>
          <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
        </div>
        <p className="text-gray-400 text-sm mb-4 flex-grow">{product.description}</p>
        <button
          onClick={handleAddToCart}
          className="w-full py-2 bg-primary text-primary-content font-semibold rounded hover:bg-primary/85 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
