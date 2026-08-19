import React from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden text-gray-900 flex flex-col h-full">
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
            <div className="p-4 flex flex-col grow">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 grow">{product.description}</p>
                <div className="flex justify-between items-center mt-auto">
                    <span className="text-xl font-semibold">${product.price.toFixed(2)}</span>
                    <button
                        onClick={handleAddToCart}
                        className="bg-primary hover:bg-primary/85 text-white font-bold py-2 px-4 rounded transition-colors cursor-pointer"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
