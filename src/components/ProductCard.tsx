import React from 'react';
import type { Product } from '../types';
import { addToCart } from '../utils/cart';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="flex flex-col overflow-hidden rounded-lg bg-gray-900 shadow">
            <div className="flex-shrink-0">
                <img className="h-48 w-full object-cover" src={product.image} alt={product.name} />
            </div>
            <div className="flex flex-1 flex-col justify-between p-6">
                <div className="flex-1">
                    <p className="text-sm font-medium text-primary">
                        {product.category}
                    </p>
                    <a href="#" className="mt-2 block">
                        <p className="text-xl font-semibold text-white">{product.name}</p>
                        <p className="mt-3 text-base text-gray-300">{product.description}</p>
                    </a>
                </div>
                <div className="mt-6 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-white">${product.price.toFixed(2)}</span>
                    </div>
                    <button
                        onClick={() => addToCart(product)}
                        className="btn"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};
