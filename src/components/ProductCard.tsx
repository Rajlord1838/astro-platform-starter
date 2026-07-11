import React, { useState } from 'react';
import type { Product } from '../types';
import { addToCart } from '../utils/cart';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = () => {
        setIsAdding(true);
        addToCart(product);
        setTimeout(() => setIsAdding(false), 500);
    };

    return (
        <div className="flex flex-col overflow-hidden bg-white rounded-lg shadow-md text-gray-900 group">
            <div className="relative overflow-hidden aspect-w-1 aspect-h-1 sm:aspect-w-2 sm:aspect-h-3">
                <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 px-2 py-1 text-xs font-semibold text-gray-800 bg-white/90 rounded shadow-sm">
                    {product.category}
                </div>
            </div>
            <div className="flex flex-col flex-grow p-4">
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mt-auto pt-4">
                    <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-colors rounded-md ${
                            isAdding ? 'bg-green-500' : 'bg-gray-900 hover:bg-gray-800'
                        }`}
                    >
                        <ShoppingCart size={16} />
                        {isAdding ? 'Added!' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
}
