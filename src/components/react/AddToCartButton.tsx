import React, { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';

interface AddToCartButtonProps {
    product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <button
            onClick={handleAddToCart}
            className={`btn w-full mt-4 flex justify-center items-center gap-2 ${
                isAdded ? 'bg-green-600 hover:bg-green-700' : ''
            }`}
            disabled={isAdded}
        >
            {isAdded ? (
                <>
                    <Check size={20} />
                    Added to Cart
                </>
            ) : (
                <>
                    <ShoppingCart size={20} />
                    Add to Cart
                </>
            )}
        </button>
    );
}
