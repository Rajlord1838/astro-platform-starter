import React from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="aspect-[3/4] overflow-hidden bg-gray-200">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm text-gray-500">{product.category}</p>
          <p className="font-medium text-gray-900">${product.price.toFixed(2)}</p>
        </div>
        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>

        <button
          onClick={() => addToCart(product)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          <ShoppingBag size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
