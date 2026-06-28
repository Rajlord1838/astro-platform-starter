import React, { useState } from 'react';
import type { Product } from '../types';
import { addToCart } from '../utils/cart';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="group flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{product.category}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    <button
                        onClick={handleAddToCart}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
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
