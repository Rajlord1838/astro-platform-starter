import React from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';
import { ShoppingCart } from 'lucide-react';

interface AddToCartButtonProps {
    product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <button
            onClick={handleAddToCart}
            className="flex items-center justify-center w-full gap-2 px-4 py-2 mt-4 text-white transition-colors rounded bg-primary hover:bg-primary/90"
        >
            <ShoppingCart size={18} />
            Add to Cart
        </button>
    );
}
