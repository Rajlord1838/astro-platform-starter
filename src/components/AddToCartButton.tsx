import React from 'react';
import { addToCart, type Product } from '../utils/cart';

interface Props {
    product: Product;
}

export default function AddToCartButton({ product }: Props) {
    const handleAddToCart = () => {
        addToCart(product);
        alert(`Added ${product.name} to cart!`);
    };

    return (
        <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
            Add to Cart
        </button>
    );
}
