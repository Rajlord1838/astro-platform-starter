import React from 'react';
import { addToCart } from '../utils/cart';
import type { Product } from '../data/products';

interface AddToCartButtonProps {
    product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const handleAdd = () => {
        addToCart(product);
        // Optional: show a quick toast or visual feedback here
    };

    return (
        <button
            onClick={handleAdd}
            className="w-full bg-white text-black py-2 px-4 rounded-md font-semibold hover:bg-gray-200 transition-colors"
        >
            Add to Cart
        </button>
    );
}
