import React from 'react';
import { addToCart } from '../utils/cart';
import type { Product } from '../data/products';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="aspect-[4/5] relative overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-800 uppercase tracking-wider">
          {product.category}
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 leading-tight">
            {product.name}
          </h3>
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-6 line-clamp-2">
          {product.description}
        </p>

        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors active:scale-[0.98]"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
