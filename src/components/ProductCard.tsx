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
        alert(`Added ${product.name} to cart!`);
    };

    return (
        <div className="flex flex-col bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-800 transition-transform hover:-translate-y-1">
            <div className="relative h-64 overflow-hidden bg-gray-800">
                <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform hover:scale-105"
                    loading="lazy"
                />
                <div className="absolute top-2 right-2 bg-gray-900/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-primary">
                    {product.category}
                </div>
            </div>

            <div className="flex flex-col flex-grow p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white line-clamp-1" title={product.name}>
                        {product.name}
                    </h3>
                    <span className="text-lg font-bold text-primary whitespace-nowrap ml-2">
                        ${product.price.toFixed(2)}
                    </span>
                </div>

                <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-2">
                    {product.description}
                </p>

                <button
                    onClick={handleAddToCart}
                    className="mt-auto flex items-center justify-center gap-2 w-full bg-primary text-primary-content font-semibold py-2.5 px-4 rounded transition-colors hover:bg-primary/85"
                >
                    <ShoppingCart size={18} />
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
