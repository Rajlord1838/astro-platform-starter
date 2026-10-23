import React from 'react';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="flex flex-col bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-800 transition hover:border-gray-700">
            <div className="relative aspect-square">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-gray-900/80 backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded">
                    {product.category}
                </div>
            </div>
            <div className="p-4 flex flex-col grow">
                <h3 className="text-lg font-bold mb-1">{product.name}</h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{product.description}</p>
                <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
                    <button
                        onClick={() => addToCart(product)}
                        className="btn rounded-full p-2 text-primary-content hover:scale-105 transition-transform cursor-pointer"
                        aria-label={`Add ${product.name} to cart`}
                    >
                        <ShoppingCart size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
