import React from 'react';
import type { Product } from '../types';
import { addToCart } from '../utils/cart';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const handleAddToCart = () => {
        addToCart(product);
        // Optional: show a toast notification here
    };

    return (
        <div className="flex flex-col bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-800">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
                loading="lazy"
            />
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white">{product.name}</h3>
                    <span className="text-lg font-semibold text-primary">${product.price.toFixed(2)}</span>
                </div>
                <span className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">{product.category}</span>
                <p className="text-sm text-gray-300 mb-4 flex-grow">{product.description}</p>
                <button
                    onClick={handleAddToCart}
                    className="w-full btn"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
