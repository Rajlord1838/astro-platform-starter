import React from 'react';
import type { Product, CartItem } from '../types';

interface ProductCardProps {
    product: Product;
}

const CART_STORAGE_KEY = 'fashion_store_cart';

export default function ProductCard({ product }: ProductCardProps) {
    const addToCart = () => {
        try {
            const stored = localStorage.getItem(CART_STORAGE_KEY);
            let cart: CartItem[] = stored ? JSON.parse(stored) : [];

            const existingItemIndex = cart.findIndex(item => item.product.id === product.id);
            if (existingItemIndex >= 0) {
                cart[existingItemIndex].quantity += 1;
            } else {
                cart.push({ product, quantity: 1 });
            }

            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
            window.dispatchEvent(new Event('cart-updated'));

            // Optional: Show some feedback to user
        } catch (e) {
            console.error('Failed to add to cart', e);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full text-gray-900 border border-gray-100 transition-transform hover:-translate-y-1 hover:shadow-lg duration-300">
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                />
                <span className="absolute top-2 left-2 bg-white/90 px-2 py-1 text-xs font-semibold tracking-wider uppercase rounded">
                    {product.category}
                </span>
            </div>

            <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-semibold mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-xl font-bold mb-3">${product.price.toFixed(2)}</p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">{product.description}</p>

                <button
                    onClick={addToCart}
                    className="w-full bg-black hover:bg-gray-800 text-white font-medium py-2.5 px-4 rounded transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
