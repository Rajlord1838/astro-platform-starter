import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { addToCart } from '../utils/cart';
import type { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="group relative border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
        <img
          src={product.image}
          alt={product.name}
          className="h-64 w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-2 py-1 rounded">
            NEW
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-sm text-gray-500 mb-1">{product.category}</p>
            <h3 className="text-lg font-medium text-gray-900 line-clamp-1">{product.name}</h3>
          </div>
          <p className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</p>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2 flex-grow mb-4">{product.description}</p>

        <button
          onClick={handleAddToCart}
          className="w-full mt-auto flex items-center justify-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
        >
          <ShoppingBag size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
