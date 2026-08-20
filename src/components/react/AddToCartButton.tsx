import React, { useState } from 'react';
import type { Product } from '../../data/products';
import { addToCart } from '../../utils/cart';
import { ShoppingCart } from 'lucide-react';

export default function AddToCartButton({ product }: { product: Product }) {
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = () => {
        setIsAdding(true);
        addToCart(product);

        // Show a brief success state
        setTimeout(() => {
            setIsAdding(false);
        }, 500);
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="w-full btn flex items-center justify-center gap-2"
        >
            <ShoppingCart size={18} />
            {isAdding ? 'Added!' : 'Add to Cart'}
        </button>
    );
}
