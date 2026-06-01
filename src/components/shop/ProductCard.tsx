import React, { useState } from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(product, 1);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col text-gray-800">
            <div className="h-48 overflow-hidden">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <div className="text-sm text-gray-500 mb-1">{product.category}</div>
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">{product.description}</p>
                <div className="flex justify-between items-center mt-auto">
                    <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                    <button
                        onClick={handleAddToCart}
                        className={`px-4 py-2 rounded font-semibold transition-colors ${
                            added
                                ? 'bg-green-500 text-white'
                                : 'bg-primary text-white hover:bg-primary/90'
                        }`}
                    >
                        {added ? 'Added!' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
};
