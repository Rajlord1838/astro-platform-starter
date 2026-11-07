import React from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="flex flex-col overflow-hidden bg-gray-900 rounded-lg shadow-lg group">
            <div className="relative overflow-hidden aspect-[4/5] bg-gray-800">
                <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="flex flex-col p-4 grow">
                <div className="text-xs tracking-wider text-gray-400 uppercase mb-1">
                    {product.category}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                    {product.name}
                </h3>
                <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">
                        ${product.price.toFixed(2)}
                    </span>
                    <button
                        onClick={() => addToCart(product)}
                        className="btn py-2 px-4 text-sm"
                        aria-label={`Add ${product.name} to cart`}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
