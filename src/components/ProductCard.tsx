import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
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
        <div className="flex flex-col bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-800 transition-transform hover:-translate-y-1">
            <div className="relative h-64 overflow-hidden group">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            <div className="flex flex-col flex-1 p-5">
                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-white line-clamp-1">{product.name}</h2>
                    <span className="text-lg font-semibold text-gray-300">${product.price.toFixed(2)}</span>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                    {product.description}
                </p>

                <button
                    onClick={handleAddToCart}
                    className={`flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg font-semibold transition-colors duration-200 ${
                        isAdded
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : 'bg-white text-gray-900 hover:bg-gray-200'
                    }`}
                >
                    <ShoppingCart size={18} />
                    {isAdded ? 'Added to Cart' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
}
