import React from 'react';
import type { Product } from '../types';
import { addToCart } from '../utils/cart';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const handleAddToCart = () => {
        addToCart(product);
        // Optional: show a toast notification here
    };

    return (
        <div className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-center object-cover sm:w-full sm:h-full"
                />
            </div>
            <div className="flex-1 p-4 space-y-2 flex flex-col">
                <h3 className="text-sm font-medium text-gray-900">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                </h3>
                <p className="text-sm text-gray-500">{product.category}</p>
                <div className="flex-1 flex flex-col justify-end">
                    <p className="text-sm italic text-gray-500 line-clamp-2 mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                        <p className="text-base font-medium text-gray-900">${product.price.toFixed(2)}</p>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault(); // Prevent navigating if wrapped in a link
                                e.stopPropagation();
                                handleAddToCart();
                            }}
                            className="relative z-10 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
