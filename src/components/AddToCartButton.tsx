import React, { useState } from 'react';
import type { Product } from '../types';
import { addToCart } from '../utils/cart';

interface AddToCartButtonProps {
    product: Product;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = () => {
        setIsAdding(true);
        addToCart(product);

        // Show feedback for a short time
        setTimeout(() => {
            setIsAdding(false);
        }, 500);
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="w-full mt-4 bg-primary text-primary-content font-semibold py-2 px-4 rounded hover:bg-opacity-90 transition-all disabled:opacity-50"
        >
            {isAdding ? 'Added!' : 'Add to Cart'}
        </button>
    );
};
