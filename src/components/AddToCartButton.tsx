import React, { useState } from 'react';
import { addToCart } from '../utils/cart';

interface AddToCartButtonProps {
    productId: string;
}

export default function AddToCartButton({ productId }: AddToCartButtonProps) {
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(productId);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000); // Reset after 2 seconds
    };

    return (
        <button
            onClick={handleAddToCart}
            className={`px-6 py-3 font-semibold text-white transition-colors rounded-md w-full sm:w-auto ${
                isAdded ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-900 hover:bg-gray-800'
            }`}
        >
            {isAdded ? 'Added to Cart ✓' : 'Add to Cart'}
        </button>
    );
}
