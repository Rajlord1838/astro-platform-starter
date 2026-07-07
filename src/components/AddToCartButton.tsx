import React from 'react';
import type { Product, CartItem } from '../types';

interface AddToCartButtonProps {
    product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const handleAddToCart = () => {
        try {
            const storedCart = localStorage.getItem('fashion_store_cart');
            let cart: CartItem[] = [];

            if (storedCart) {
                cart = JSON.parse(storedCart);
            }

            const existingItemIndex = cart.findIndex(item => item.product.id === product.id);

            if (existingItemIndex >= 0) {
                cart[existingItemIndex].quantity += 1;
            } else {
                cart.push({ product, quantity: 1 });
            }

            localStorage.setItem('fashion_store_cart', JSON.stringify(cart));
            window.dispatchEvent(new Event('cart-updated'));
        } catch (e) {
            console.error('Failed to update cart', e);
        }
    };

    return (
        <button
            className="w-full py-2 mt-4 font-semibold text-white transition-colors rounded bg-primary hover:bg-primary/85"
            onClick={handleAddToCart}
        >
            Add to Cart
        </button>
    );
}
