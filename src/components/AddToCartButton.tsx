import React from 'react';
import type { Product } from '../types';
import { addToCart } from '../utils/cart';
import { ShoppingCart } from 'lucide-react';

export const AddToCartButton: React.FC<{ product: Product }> = ({ product }) => {
    return (
        <button
            onClick={() => addToCart(product)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center transition-colors"
        >
            <ShoppingCart className="w-4 h-4 mr-2" />
            <span>Add to Cart</span>
        </button>
    );
};
