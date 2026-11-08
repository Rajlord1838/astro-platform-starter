import React from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';
import { ShoppingCart } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.category}</p>
                    </div>
                    <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-2">{product.description}</p>
                <button
                    onClick={() => addToCart(product)}
                    className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2.5 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                    aria-label={`Add ${product.name} to cart`}
                >
                    <ShoppingCart size={18} />
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
