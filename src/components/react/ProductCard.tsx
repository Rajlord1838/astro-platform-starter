import React from 'react';
import type { Product } from '../../types';
import { addToCart, toggleCart } from '../../utils/cart';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const handleAddToCart = () => {
        addToCart(product);
        toggleCart();
    };

    return (
        <div className="flex flex-col overflow-hidden bg-gray-900 rounded-lg shadow-lg shadow-black/50">
            <div className="aspect-w-3 aspect-h-4">
                <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-64"
                />
            </div>
            <div className="flex flex-col flex-1 p-4">
                <h3 className="text-lg font-bold text-white">{product.name}</h3>
                <p className="mt-1 text-sm text-gray-300 line-clamp-2">
                    {product.description}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4">
                    <span className="text-xl font-bold text-primary">
                        ${product.price.toFixed(2)}
                    </span>
                    <button
                        onClick={handleAddToCart}
                        className="btn sm:min-w-0 px-4 py-2"
                        aria-label={`Add ${product.name} to cart`}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
