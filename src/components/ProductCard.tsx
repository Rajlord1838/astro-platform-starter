import React from 'react';
import type { Product } from '../types';
import { addToCart } from '../utils/cart';

interface Props {
    product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
    return (
        <div className="bg-white text-gray-900 rounded-lg shadow-md overflow-hidden flex flex-col h-full">
            <div className="h-48 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold line-clamp-2">{product.title}</h3>
                    <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-3">
                    {product.description}
                </p>
                <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-[#f67280] text-white py-2 px-4 rounded-md font-medium hover:bg-opacity-90 transition-colors"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};