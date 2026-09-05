import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { addToCart } from '../../utils/cart';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
}

export default function ProductCard({ id, name, price, category, imageUrl }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105 flex flex-col h-full text-gray-900">
      <div className="relative h-64 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4 flex flex-col grow">
        <div className="text-sm text-primary font-medium mb-1">{category}</div>
        <h3 className="text-lg font-bold mb-2 flex-grow">{name}</h3>
        <div className="flex items-center justify-between mt-auto pt-4">
          <span className="text-xl font-bold">${price.toFixed(2)}</span>
          <button
            onClick={() => addToCart(id)}
            className="btn rounded-full p-3 h-auto"
            aria-label={`Add ${name} to cart`}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
