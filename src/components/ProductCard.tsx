import React from 'react';
import type { Product } from '../types';
import { addToCart } from '../utils/cart';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating if wrapped in a link
    addToCart(product);
    // Optional: show a small toast or visual feedback
    const btn = e.currentTarget as HTMLButtonElement;
    const originalText = btn.innerText;
    btn.innerText = 'Added!';
    btn.classList.add('bg-green-600', 'text-white');
    setTimeout(() => {
      btn.innerText = originalText;
      btn.classList.remove('bg-green-600', 'text-white');
    }, 1500);
  };

  return (
    <div className="flex flex-col group rounded-lg overflow-hidden border border-gray-800 bg-gray-900 transition-all hover:border-gray-600">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-gray-900 px-2 py-1 text-xs font-semibold rounded text-white">
          ${product.price.toFixed(2)}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-sm text-gray-400 mb-1">{product.category}</div>
        <h3 className="text-lg font-medium text-white mb-2">{product.name}</h3>
        <p className="text-sm text-gray-300 line-clamp-2 mb-4 flex-grow">{product.description}</p>

        <button
          onClick={handleAddToCart}
          className="w-full py-2 px-4 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
