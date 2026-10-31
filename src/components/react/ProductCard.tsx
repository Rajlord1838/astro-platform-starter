import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { addToCart } from '../../utils/cart';
import type { Product } from '../../types';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
                <div className="absolute top-2 right-2">
                    <span className="bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-medium text-gray-700 uppercase tracking-wider">
                        {product.category}
                    </span>
                </div>
            </div>

            <div className="flex flex-col flex-1 p-4">
                <h3 className="font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2 flex-1">{product.description}</p>

                <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                    </span>
                    <button
                        onClick={() => addToCart(product)}
                        className="flex items-center justify-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-black"
                        aria-label={`Add ${product.name} to cart`}
                    >
                        <ShoppingCart className="w-4 h-4" />
                        <span className="text-sm font-medium">Add</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
