import React from 'react';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../types';
import { addToCart } from '../utils/cart';

interface Props {
    product: Product;
}

export default function AddToCartButton({ product }: Props) {
    const handleAddToCart = () => {
        addToCart(product);

        // Dispatch custom event to notify other components (like CartIcon)
        window.dispatchEvent(new Event('cart-updated'));
    };

    return (
        <button
            onClick={handleAddToCart}
            className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-medium text-white transition-colors bg-black rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
        </button>
    );
}
