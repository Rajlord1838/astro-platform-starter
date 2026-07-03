import React, { useState } from 'react';
import type { Product } from '../types';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const [added, setAdded] = useState(false);

    const addToCart = () => {
        const cartString = localStorage.getItem('fashion_store_cart');
        const cart: Product[] = cartString ? JSON.parse(cartString) : [];

        cart.push(product);
        localStorage.setItem('fashion_store_cart', JSON.stringify(cart));

        // Dispatch custom event to notify other components
        window.dispatchEvent(new Event('cart-updated'));

        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="flex flex-col overflow-hidden bg-white rounded-lg shadow-sm group">
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-200">
                <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                />
            </div>
            <div className="flex flex-col flex-grow p-4">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                    <p className="font-semibold text-gray-900">${product.price.toFixed(2)}</p>
                </div>
                <p className="flex-grow mb-4 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                <button
                    onClick={addToCart}
                    className={`btn w-full mt-auto ${added ? 'bg-green-600 hover:bg-green-700' : ''}`}
                    disabled={added}
                >
                    {added ? 'Added to Cart!' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
}
