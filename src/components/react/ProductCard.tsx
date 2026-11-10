import React from 'react';
import { Plus } from 'lucide-react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border bg-white transition-all hover:shadow-lg">
      <div className="aspect-[4/5] overflow-hidden bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.category}</p>
          </div>
          <span className="font-bold text-lg leading-none">${product.price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2 flex-1 mb-4">
          {product.description}
        </p>
        <button
          onClick={() => addToCart(product)}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-black py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
        >
          <Plus className="h-4 w-4" /> Add to Cart
        </button>
      </div>
    </div>
  );
}
