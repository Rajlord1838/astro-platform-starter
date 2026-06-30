import React from 'react';
import type { Product, CartItem } from '../../types';

export default function AddToCartButton({ product }: { product: Product }) {
    const handleAddToCart = () => {
        const cartStr = localStorage.getItem('fashion_store_cart');
        let cart: CartItem[] = [];
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
        window.dispatchEvent(new Event('cart-updated'));
    };

    return (
        <button
            onClick={handleAddToCart}
            className="w-full bg-primary hover:bg-primary/90 text-primary-content font-semibold py-2 px-4 rounded transition-colors"
        >
            Add to Cart
        </button>
    );
}
