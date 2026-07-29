import React from 'react';
import type { Product } from '../types';
import { addToCart } from '../utils/cart';
import { ShoppingCart } from 'lucide-react';

interface AddToCartButtonProps {
    product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    return (
        <button
            onClick={() => addToCart(product)}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-content hover:bg-primary/80 transition-colors font-medium"
        >
            <ShoppingCart size={18} />
            Add to Cart
        </button>
    );
}
