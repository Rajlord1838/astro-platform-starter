import React from 'react';
import type { Product } from '../data/products';
import { addToCart } from '../utils/cart';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="group relative bg-white text-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 h-80">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="flex flex-col flex-1 p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-gray-900">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{product.category}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
        </div>
        <div className="mt-2 flex-1">
          <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
        </div>
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-black text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
