import React from 'react';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg">
      <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none sm:h-96">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105 sm:h-full sm:w-full"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex justify-between">
          <h3 className="text-sm font-medium text-gray-900">
            {product.name}
          </h3>
          <p className="text-sm font-semibold text-gray-900">${product.price.toFixed(2)}</p>
        </div>
        <p className="mt-1 text-xs text-gray-500">{product.category}</p>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{product.description}</p>

        <div className="mt-4 flex flex-1 items-end">
          <button
            onClick={() => addToCart(product)}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
