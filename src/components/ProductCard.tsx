import React, { useState } from 'react';
import { Product, addToCart } from '../utils/cart';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700 transition-transform hover:scale-105">
      <div className="h-64 w-full bg-slate-200 overflow-hidden relative group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
          loading="lazy"
        />
      </div>
      <div className="p-5 flex flex-col grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-white line-clamp-2">{product.name}</h3>
          <span className="text-emerald-400 font-bold text-lg whitespace-nowrap ml-2">${product.price.toFixed(2)}</span>
        </div>
        <div className="mt-auto pt-4">
          <button
            onClick={handleAdd}
            className={`w-full py-2.5 px-4 rounded-md font-medium transition-colors ${
              added
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {added ? 'Added to Cart!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
