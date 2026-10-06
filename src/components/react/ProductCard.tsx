import React, { useState } from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = () => {
        setIsAdding(true);
        addToCart(product);
        setTimeout(() => setIsAdding(false), 500); // Visual feedback
    };

    return (
        <div className="flex flex-col bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-800 transition-transform hover:scale-[1.02]">
            <div className="relative pt-[125%] overflow-hidden bg-gray-800">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                />
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <div className="text-xs text-primary mb-1 uppercase tracking-wider">{product.category}</div>
                <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
                <p className="text-sm text-gray-400 mb-4 flex-grow">{product.description}</p>

                <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-bold text-white">${product.price.toFixed(2)}</span>
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className={`btn ${isAdding ? 'bg-green-600' : 'bg-primary'} transition-colors`}
                    >
                        {isAdding ? 'Added!' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
};
