import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { addToCart } from '../../utils/cart';
import type { Product } from '../../types';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="group relative flex flex-col bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 sm:aspect-none sm:h-80">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:opacity-75 sm:h-full sm:w-full"
        />
      </div>
      <div className="flex flex-1 flex-col p-4 space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">{product.category}</p>
            <h3 className="text-sm font-medium text-gray-900 mt-1">
              {product.name}
            </h3>
          </div>
          <p className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
        <div className="flex-1 flex items-end mt-4">
          <button
            onClick={() => addToCart(product)}
            className="w-full flex items-center justify-center space-x-2 bg-white border border-gray-300 rounded-md py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}