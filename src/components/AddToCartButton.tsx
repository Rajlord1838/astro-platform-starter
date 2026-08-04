import React from 'react';
import type { Product } from '../types';
import { addToCart } from '../utils/cart';
import { ShoppingCart } from 'lucide-react';

interface Props {
    product: Product;
}

export const AddToCartButton: React.FC<Props> = ({ product }) => {
    return (
        <button
            onClick={() => addToCart(product)}
            className="w-full btn mt-4 flex items-center justify-center gap-2"
            aria-label={`Add ${product.name} to cart`}
        >
            <ShoppingCart size={18} />
            <span>Add to Cart</span>
        </button>
    );
};
