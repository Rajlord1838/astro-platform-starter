import React from 'react';
import { ShoppingBag } from 'lucide-react';
import type { Product, CartItem } from '../types';

interface AddToCartButtonProps {
    product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const addToCart = () => {
        try {
            const stored = localStorage.getItem('fashion_store_cart');
            let cart: CartItem[] = stored ? JSON.parse(stored) : [];

            const existingItem = cart.find(item => item.product.id === product.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ product, quantity: 1 });
            }

            localStorage.setItem('fashion_store_cart', JSON.stringify(cart));
            window.dispatchEvent(new Event('cart-updated'));

            // Optional: Show some toast/feedback
            alert(`Added ${product.name} to cart!`);
        } catch (e) {
            console.error('Failed to add to cart', e);
        }
    };

    return (
        <button
            onClick={addToCart}
            className="flex items-center justify-center w-full gap-2 py-3 px-4 bg-white text-gray-900 font-bold rounded hover:bg-gray-200 transition-colors cursor-pointer"
        >
            <ShoppingBag className="w-5 h-5" />
            Add to Cart
        </button>
    );
}
