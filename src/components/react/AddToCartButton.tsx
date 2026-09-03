import React, { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { addToCart } from '../../utils/cart';
import type { Product } from '../../types';

interface Props {
    product: Product;
}

export function AddToCartButton({ product }: Props) {
    const [isAdded, setIsAdded] = useState(false);

    const handleAdd = () => {
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <button
            onClick={handleAdd}
            className={`flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white transition-colors ${
                isAdded ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
        >
            {isAdded ? (
                <>
                    <Check size={18} />
                    Added to Cart
                </>
            ) : (
                <>
                    <ShoppingCart size={18} />
                    Add to Cart
                </>
            )}
        </button>
    );
}
