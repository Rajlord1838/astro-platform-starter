import React from 'react';
import type { Product } from '../../types';
import { addToCart, toggleCartModal } from '../../utils/cart';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const handleAddToCart = () => {
        addToCart(product);
        toggleCartModal();
    };

    return (
        <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden text-gray-900 transition-transform hover:scale-[1.02] duration-300">
            <div className="relative pt-[125%]">
                <img
                    src={product.image}
                    alt={product.name}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                />
            </div>

            <div className="flex flex-col flex-1 p-4">
                <p className="text-sm text-gray-500 mb-1 uppercase tracking-wider">{product.category}</p>
                <h3 className="text-lg font-bold mb-2 leading-tight flex-1">{product.name}</h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                    <button
                        onClick={handleAddToCart}
                        className="btn"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
