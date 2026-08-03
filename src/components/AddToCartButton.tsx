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
            className="flex items-center justify-center w-full gap-2 py-2 mt-4 text-sm font-medium transition-colors bg-primary text-primary-content hover:bg-primary/80 rounded-md"
        >
            <ShoppingCart size={18} />
            Add to Cart
        </button>
    );
}
