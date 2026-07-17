import React from 'react';
import type { Product } from '../data/products';
import { addToCart } from '../utils/cart';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 h-64">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-sm text-gray-700 font-medium">{product.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{product.category}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
        </div>
        <p className="text-sm text-gray-500 mt-2 line-clamp-2 flex-grow">{product.description}</p>
        <button
          onClick={() => addToCart(product)}
          className="mt-4 w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center font-medium text-sm"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
