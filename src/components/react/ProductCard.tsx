import React from 'react';
import type { Product } from '../../data/products';
import { addToCart } from '../../utils/cart';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full text-slate-800 transition-transform hover:-translate-y-1 hover:shadow-lg">
      <div className="h-64 overflow-hidden relative group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-semibold shadow">
          {product.category}
        </div>
      </div>
      <div className="p-4 flex flex-col grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold">{product.name}</h3>
          <span className="font-semibold text-lg">${product.price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-gray-600 mb-4 grow">{product.description}</p>
        <button
          onClick={() => addToCart(product.id)}
          className="mt-auto w-full bg-slate-900 text-white py-2 px-4 rounded flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
