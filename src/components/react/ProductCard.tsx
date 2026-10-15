import React from 'react';
import type { Product } from '../../types';
import { addToCart, toggleCart } from '../../utils/cart';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const handleAddToCart = () => {
        addToCart(product, 1);
        toggleCart(true);
    };

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-lg border border-white/10 bg-white/5 shadow-md">
            <div className="aspect-h-4 aspect-w-3 bg-white/10 sm:aspect-none sm:h-96">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover object-center sm:h-full sm:w-full group-hover:opacity-75 transition-opacity"
                />
            </div>
            <div className="flex flex-1 flex-col space-y-2 p-4">
                <h3 className="text-sm font-medium text-white">
                    {product.name}
                </h3>
                <p className="text-sm text-gray-400">{product.description}</p>
                <div className="flex flex-1 flex-col justify-end">
                    <p className="text-base font-medium text-white">${product.price.toFixed(2)}</p>
                    <button
                        onClick={handleAddToCart}
                        className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
