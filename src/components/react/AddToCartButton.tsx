import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { addToCart } from '../../utils/cart';
import type { Product } from '../../types';

interface AddToCartButtonProps {
    product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const handleAdd = () => {
        addToCart(product);
    };

    return (
        <button
            onClick={handleAdd}
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-content font-semibold py-2 px-4 rounded transition-colors hover:bg-primary/85"
            aria-label={`Add ${product.name} to cart`}
        >
            <ShoppingCart size={20} />
            <span>Add to Cart</span>
        </button>
    );
}
