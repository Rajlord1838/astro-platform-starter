import React, { useState } from 'react';
import type { Product } from '../types';
import { addToCart } from '../utils/cart';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="flex flex-col overflow-hidden bg-white rounded-lg shadow-md">
            <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-64"
                loading="lazy"
            />
            <div className="flex flex-col p-4 grow">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                    <span className="text-lg font-semibold text-primary">
                        ${product.price.toFixed(2)}
                    </span>
                </div>
                <p className="mb-4 text-sm text-gray-600 grow">{product.description}</p>
                <button
                    onClick={handleAddToCart}
                    className="w-full btn"
                >
                    {added ? 'Added!' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
};
