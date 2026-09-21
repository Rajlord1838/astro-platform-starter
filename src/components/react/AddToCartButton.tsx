import React from 'react';
import type { Product } from '../../types';
import { addToCart, toggleCart } from '../../utils/cart';
import { ShoppingCart } from 'lucide-react';

interface Props {
    product: Product;
}

export default function AddToCartButton({ product }: Props) {
    const handleAddToCart = () => {
        addToCart(product);
        toggleCart(); // Automatically open cart to show it was added
    };

    return (
        <button
            onClick={handleAddToCart}
            className="flex items-center justify-center w-full gap-2 py-3 text-sm font-semibold transition-colors bg-white text-gray-900 rounded-md hover:bg-gray-100"
        >
            <ShoppingCart size={18} />
            Add to Cart
        </button>
    );
}
