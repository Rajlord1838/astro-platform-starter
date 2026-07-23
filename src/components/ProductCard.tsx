import React from 'react';
import type { Product } from '../types';
import { addToCart } from '../utils/cart';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <div className="flex flex-col bg-gray-900 rounded-xl overflow-hidden shadow-lg transition-transform hover:-translate-y-1">
            <div className="relative aspect-[4/5] overflow-hidden">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform hover:scale-105 duration-500"
                    loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-primary text-primary-content text-xs font-bold px-2 py-1 rounded">
                    {product.category}
                </div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white line-clamp-1" title={product.name}>
                        {product.name}
                    </h3>
                    <span className="font-semibold text-primary">
                        ${product.price.toFixed(2)}
                    </span>
                </div>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
                    {product.description}
                </p>
                <button
                    onClick={handleAddToCart}
                    className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-primary hover:text-primary-content text-white py-2.5 rounded-lg font-semibold transition-colors mt-auto"
                >
                    <ShoppingBag size={18} />
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
