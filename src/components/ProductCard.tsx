import React from 'react';
import type { Product } from '../utils/products';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const handleAddToCart = () => {
        // Get existing cart
        const existingCartRaw = localStorage.getItem('cart');
        let cart: Product[] = [];
        if (existingCartRaw) {
            try {
                cart = JSON.parse(existingCartRaw);
            } catch (e) {
                console.error('Failed to parse cart', e);
            }
        }

        // Add new item
        cart.push(product);

        // Save back to local storage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Dispatch event so other components (like Cart) can update
        window.dispatchEvent(new Event('cart-updated'));

        alert(`Added ${product.name} to cart!`);
    };

    return (
        <div className="flex flex-col bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white">{product.name}</h3>
                    <span className="text-lg font-semibold text-primary">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-gray-300 mb-6 flex-grow">{product.description}</p>
                <button
                    onClick={handleAddToCart}
                    className="w-full btn"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
