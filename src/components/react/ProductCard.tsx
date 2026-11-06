import React from 'react';
import { addToCart, toggleCart } from '../../utils/cart';
import type { Product } from '../../types';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const handleAddToCart = () => {
        addToCart(product);
        toggleCart(true);
    };

    return (
        <div className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
            <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="flex flex-1 flex-col p-4">
                <p className="text-sm text-gray-500">{product.category}</p>
                <h3 className="mt-1 text-lg font-medium text-gray-900">{product.name}</h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                    <p className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</p>
                    <button
                        onClick={handleAddToCart}
                        className="rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
