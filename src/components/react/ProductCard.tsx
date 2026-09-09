import React from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white text-gray-900 rounded-lg shadow-md overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow">
      <div className="h-64 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold line-clamp-1">{product.title}</h3>
          <span className="font-semibold text-primary ml-2">${product.price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow">{product.description}</p>

        <button
          onClick={() => addToCart(product)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
