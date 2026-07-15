import React, { useState } from 'react';
import type { Product } from '../types';
import { addToCart } from '../utils/cartStore';
import { ShoppingCart } from 'lucide-react';

interface AddToCartButtonProps {
    product: Product;
    className?: string;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product, className = '' }) => {
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <button
            onClick={handleAddToCart}
            className={`flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors ${className}`}
        >
            <ShoppingCart size={18} />
            {isAdded ? 'Added!' : 'Add to Cart'}
        </button>
    );
};
