import React from 'react';
import type { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = () => {
    const event = new CustomEvent('cart-add', {
      detail: { product }
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden text-gray-900 flex flex-col">
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-sm text-gray-500 mb-1">{product.category}</div>
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{product.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
          <button
            onClick={addToCart}
            className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
