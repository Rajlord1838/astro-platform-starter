import React from 'react';
import type { Product } from '../types';
import { addToCart } from '../utils/cartStore';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white text-gray-900 rounded-lg overflow-hidden shadow-lg transition-transform hover:-translate-y-1">
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{product.category}</div>
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-4 h-10 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-xl">${product.price.toFixed(2)}</span>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            <ShoppingCart size={18} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
