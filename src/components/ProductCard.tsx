import React from 'react';
import type { Product } from '../types';
import { addToCart } from '../utils/cart';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="flex flex-col bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
      <div className="h-64 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
            <span className="text-sm text-gray-500">{product.category}</span>
          </div>
          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
        </div>
        <div className="mt-auto pt-4">
          <button
            onClick={() => addToCart(product)}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/85 text-primary-content font-medium py-2 px-4 rounded transition-colors cursor-pointer"
          >
            <ShoppingCart size={18} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};