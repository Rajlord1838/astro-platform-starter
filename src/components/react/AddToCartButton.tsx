import React from 'react';
import { ShoppingBag } from 'lucide-react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';

interface AddToCartButtonProps {
    product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    return (
        <button
            onClick={() => addToCart(product)}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-content hover:bg-primary/90 transition-colors"
        >
            <ShoppingBag size={18} />
            Add to Cart
        </button>
    );
}
