import React from 'react';
import type { Product, CartItem } from '../types';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const addToCart = () => {
        const cartStr = localStorage.getItem('fashion_store_cart');
        let cart: CartItem[] = cartStr ? JSON.parse(cartStr) : [];

        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('fashion_store_cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('cart-updated'));
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full text-neutral-900">
            <div className="relative aspect-square w-full">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-4 flex flex-col grow">
                <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
                <p className="text-gray-600 mb-2 flex-grow text-sm">{product.description}</p>
                <div className="flex items-center justify-between mt-auto pt-4">
                    <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                    <button
                        onClick={addToCart}
                        className="bg-neutral-900 text-white px-4 py-2 rounded hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
