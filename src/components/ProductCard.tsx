import React from 'react';
import type { Product, CartItem } from '../types';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const addToCart = () => {
        let cart: CartItem[] = [];
        const cartStr = localStorage.getItem('fashion_store_cart');
        if (cartStr) {
            try {
                cart = JSON.parse(cartStr);
            } catch (e) {
                console.error('Failed to parse cart', e);
            }
        }

        const existingItemIndex = cart.findIndex(item => item.product.id === product.id);
        if (existingItemIndex >= 0) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({ product, quantity: 1 });
        }

        localStorage.setItem('fashion_store_cart', JSON.stringify(cart));
        window.dispatchEvent(new CustomEvent('cart-updated'));
    };

    return (
        <div className="flex flex-col bg-white/10 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 transition-transform hover:-translate-y-1">
            <div className="relative aspect-w-4 aspect-h-5">
                <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-64"
                />
                <div className="absolute top-2 left-2 bg-black/60 text-white px-2 py-1 text-xs font-semibold rounded backdrop-blur-md">
                    {product.category}
                </div>
            </div>
            <div className="p-5 flex flex-col grow">
                <h3 className="text-lg font-bold text-white mb-1">{product.name}</h3>
                <p className="text-primary font-semibold mb-4">${product.price.toFixed(2)}</p>
                <div className="mt-auto">
                    <button
                        onClick={addToCart}
                        className="w-full btn"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
