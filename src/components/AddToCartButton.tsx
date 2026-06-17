import React from 'react';
import type { Product, CartItem } from '../types';

interface AddToCartButtonProps {
    product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const handleAddToCart = () => {
        const cartString = localStorage.getItem('fashion_store_cart');
        let cart: CartItem[] = [];
        if (cartString) {
            cart = JSON.parse(cartString);
        }

        const existingItem = cart.find((item) => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ product, quantity: 1 });
        }

        localStorage.setItem('fashion_store_cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('cart-updated'));
        alert(`Added ${product.name} to cart!`);
    };

    return (
        <button
            onClick={handleAddToCart}
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-md font-medium hover:bg-gray-800 transition-colors"
        >
            Add to Cart
        </button>
    );
}
