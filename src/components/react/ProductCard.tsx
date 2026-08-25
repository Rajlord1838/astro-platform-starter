import React from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="flex flex-col bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-800 transition-transform hover:-translate-y-1">
            <div className="relative h-64 overflow-hidden">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex flex-col p-5 grow">
                <div className="flex justify-between items-start mb-2 gap-4">
                    <h3 className="text-xl font-semibold text-white leading-tight">{product.name}</h3>
                    <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-gray-400 text-sm mb-6 grow">{product.description}</p>
                <button
                    onClick={() => addToCart(product)}
                    className="w-full py-2.5 px-4 bg-primary hover:bg-primary/90 text-primary-content font-semibold rounded-md transition-colors"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};
