import { useState } from 'react';
import type { Product } from '../data/products';
import { addToCart } from '../utils/cart';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="flex flex-col overflow-hidden bg-white rounded-lg shadow-sm group border border-gray-100 hover:shadow-md transition-shadow">
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
            <span className="px-2 py-1 text-xs font-semibold tracking-wider text-gray-800 uppercase bg-white rounded">
                {product.category}
            </span>
        </div>
      </div>
      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mt-auto pt-4">
          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className={`px-4 py-2 text-sm font-medium transition-colors rounded ${
              isAdded
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {isAdded ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
