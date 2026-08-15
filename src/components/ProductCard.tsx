import React from 'react';
import type { Product } from '../types';
import { addToCart } from '../utils/cart';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-transform hover:scale-[1.02]">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
            />
            <div className="flex flex-col p-4 flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                    <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4 flex-grow">{product.description}</p>
                <button
                    onClick={() => addToCart(product)}
                    className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};
