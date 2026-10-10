import React from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="flex flex-col bg-neutral-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="relative aspect-square overflow-hidden bg-neutral-800">
                <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <div className="text-sm text-neutral-400 mb-1">{product.category}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
                <p className="text-sm text-neutral-300 mb-4 line-clamp-2 flex-grow">{product.description}</p>
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-bold text-white">${product.price.toFixed(2)}</span>
                    <button
                        onClick={() => addToCart(product)}
                        className="bg-primary hover:bg-primary/90 text-white p-2 rounded-full transition-colors flex items-center justify-center bg-blue-600 hover:bg-blue-700"
                        aria-label={`Add ${product.name} to cart`}
                    >
                        <ShoppingCart size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
