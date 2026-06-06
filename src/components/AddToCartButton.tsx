import React, { useState } from 'react';
import type { Product } from '../types';
import { addToCart } from '../utils/cart';

interface AddToCartButtonProps {
    product: Product;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <button
            onClick={handleAddToCart}
            className={`w-full py-2 px-4 rounded font-semibold transition-colors ${
                isAdded ? 'bg-green-600 text-white' : 'bg-primary text-primary-content hover:bg-primary/80 cursor-pointer'
            }`}
        >
            {isAdded ? 'Added to Cart!' : 'Add to Cart'}
        </button>
    );
};
