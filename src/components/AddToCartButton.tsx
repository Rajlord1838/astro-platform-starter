import React from 'react';
import type { Product } from '../types';
import { addToCart } from '../utils/cart';

interface Props {
    product: Product;
}

export const AddToCartButton: React.FC<Props> = ({ product }) => {
    return (
        <button
            onClick={() => addToCart(product)}
            className="w-full mt-4 bg-primary text-primary-content font-semibold py-2 px-4 rounded hover:bg-opacity-90 transition-colors"
        >
            Add to Cart
        </button>
    );
};
