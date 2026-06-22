import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { addToCart } from '../utils/cart';
import type { Product } from '../types';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const handleAddToCart = () => {
        addToCart(product);
        // Optional: Show a toast notification here
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:-translate-y-1">
            <div className="relative h-64 overflow-hidden">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                />
            </div>
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">{product.name}</h3>
                    <span className="text-lg font-bold text-blue-600">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                <button
                    onClick={handleAddToCart}
                    className="w-full flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white py-2.5 px-4 rounded-lg font-medium transition-colors"
                >
                    <ShoppingCart size={18} />
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
