import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { addToCart } from '../../utils/cart';
import type { Product } from '../../types';

interface Props {
    product: Product;
}

export default function AddToCartButton({ product }: Props) {
    const handleAdd = () => {
        addToCart(product);
    };

    return (
        <button
            onClick={handleAdd}
            className="flex items-center justify-center gap-2 w-full mt-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition-colors"
        >
            <ShoppingCart size={18} />
            <span>Add to Cart</span>
        </button>
    );
}
