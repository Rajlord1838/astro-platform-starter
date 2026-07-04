import React from 'react';
import type { Product } from '../types';
import { addToCart } from '../utils/cartUtils';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <div className="flex flex-col overflow-hidden bg-white rounded-lg shadow-md">
            <div className="relative h-64 overflow-hidden">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
            </div>
            <div className="flex flex-col flex-grow p-4">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                    <span className="font-bold text-gray-900">${product.price.toFixed(2)}</span>
                </div>
                <p className="flex-grow text-sm text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">{product.category}</span>
                    <button
                        onClick={handleAddToCart}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
