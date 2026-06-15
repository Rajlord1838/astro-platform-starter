import React from 'react';
import type { Product } from '../types';
import { addToCart } from '../utils/cartStore';

interface Props {
    product: Product;
}

export default function AddToCartButton({ product }: Props) {
    const handleAddToCart = () => {
        addToCart(product);

        // Optional: show some feedback here (e.g. toast notification)
    };

    return (
        <button
            onClick={handleAddToCart}
            className="w-full py-2 px-4 bg-primary text-white font-semibold rounded hover:bg-primary/90 transition-colors cursor-pointer"
        >
            Add to Cart
        </button>
    );
}
