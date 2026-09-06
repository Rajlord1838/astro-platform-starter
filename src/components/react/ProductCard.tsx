import React from 'react';
import type { Product } from '../../data/products';
import { addToCart } from '../../utils/cart';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="group relative border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-lg bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="p-4 flex flex-col justify-between h-40">
        <div>
          <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</p>
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
