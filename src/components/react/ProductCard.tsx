import React from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative pb-[100%] overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
                <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    <button
                        onClick={handleAddToCart}
                        className="btn bg-primary text-primary-content px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors"
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
}
