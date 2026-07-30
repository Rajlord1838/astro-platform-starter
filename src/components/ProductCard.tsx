import React from 'react';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../types';
import { addToCart } from '../utils/cart';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const handleAddToCart = () => {
        addToCart(product);
        // We could show a toast notification here
    };

    return (
        <div className="flex flex-col bg-gray-800/80 rounded-xl overflow-hidden border border-gray-700 hover:border-primary/50 transition-colors group">
            <div className="relative aspect-[3/4] overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-xs px-2 py-1 rounded-full uppercase tracking-wider font-semibold text-gray-200">
                    {product.category}
                </div>
            </div>

            <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white line-clamp-1 flex-1 pr-2" title={product.name}>
                        {product.name}
                    </h3>
                    <span className="text-primary font-bold whitespace-nowrap">
                        ${product.price.toFixed(2)}
                    </span>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                    {product.description}
                </p>

                <button
                    onClick={handleAddToCart}
                    className="mt-auto w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-primary hover:text-primary-content text-white py-2.5 px-4 rounded-lg font-medium transition-colors cursor-pointer"
                >
                    <ShoppingCart size={18} />
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
