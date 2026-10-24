import React from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 flex flex-col h-full">
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
            <div className="p-4 flex flex-col grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white leading-tight">{product.name}</h3>
                    <span className="text-primary font-semibold ml-2 whitespace-nowrap">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-gray-400 text-sm mb-4 grow">{product.description}</p>
                <div className="mt-auto">
                    <span className="inline-block bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded mb-4">
                        {product.category}
                    </span>
                    <button
                        onClick={() => addToCart(product)}
                        className="w-full btn"
                        aria-label={`Add ${product.name} to cart`}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
