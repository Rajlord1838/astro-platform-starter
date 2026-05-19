import React from 'react';
import { addToCart } from '../utils/cartUtils';

interface AddToCartButtonProps {
    productId: string;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ productId }) => {
    const handleAddToCart = () => {
        addToCart(productId);
    };

    return (
        <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
            Add to Cart
        </button>
    );
};
