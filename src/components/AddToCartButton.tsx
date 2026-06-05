import React from 'react';
import type { Product } from '../data/products';

interface AddToCartButtonProps {
    product: Product;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
    const handleAddToCart = () => {
        const currentCartStr = localStorage.getItem('fashion_store_cart');
        const currentCart: Product[] = currentCartStr ? JSON.parse(currentCartStr) : [];

        currentCart.push(product);
        localStorage.setItem('fashion_store_cart', JSON.stringify(currentCart));

        // Dispatch custom event to notify other components (like Cart)
        window.dispatchEvent(new Event('cart-updated'));

        alert(`Added ${product.name} to cart!`);
    };

    return (
        <button
            onClick={handleAddToCart}
            className="w-full bg-primary text-primary-content font-semibold py-2 px-4 rounded hover:bg-primary/85 transition-colors cursor-pointer"
        >
            Add to Cart
        </button>
    );
};
