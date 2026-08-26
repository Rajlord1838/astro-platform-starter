import React from 'react';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';

interface AddToCartButtonProps {
    product: Product;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <button
            onClick={handleAddToCart}
            className="btn w-full"
            aria-label={`Add ${product.name} to cart`}
        >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
        </button>
    );
};
