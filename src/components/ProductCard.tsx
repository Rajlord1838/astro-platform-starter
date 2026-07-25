import React from 'react';
import type { Product } from '../types';
import { AddToCartButton } from './AddToCartButton';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    return (
        <div className="flex flex-col overflow-hidden rounded-lg shadow-lg bg-white text-gray-900 border border-gray-200">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
            />
            <div className="flex flex-col flex-1 p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold leading-tight">{product.name}</h3>
                    <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">{product.category}</p>
                <p className="text-sm text-gray-700 flex-1">{product.description}</p>
                <div className="mt-6">
                    <AddToCartButton product={product} />
                </div>
            </div>
        </div>
    );
};
