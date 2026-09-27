import React from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col text-gray-800">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
                loading="lazy"
            />
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">{product.description}</p>
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                    <button
                        onClick={handleAddToCart}
                        className="bg-primary hover:bg-primary/85 text-white font-semibold py-2 px-4 rounded transition-colors"
                        aria-label={`Add ${product.name} to cart`}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
