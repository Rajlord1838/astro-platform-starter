import React from 'react';
import type { Product } from '../data/products';
import { addToCart } from '../utils/cart';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-center object-cover sm:w-full sm:h-full"
        />
      </div>
      <div className="flex-1 p-4 space-y-2 flex flex-col">
        <h3 className="text-sm font-medium text-gray-900">
          <a href="#">
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </a>
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
        <div className="flex-1 flex flex-col justify-end">
          <p className="text-base font-medium text-gray-900">${product.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="px-4 pb-4 relative z-10">
        <button
          onClick={(e) => {
            e.preventDefault(); // Prevent navigating to the link in the title
            addToCart(product);
          }}
          className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 flex items-center justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
