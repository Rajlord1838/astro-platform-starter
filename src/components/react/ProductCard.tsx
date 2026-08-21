import React from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden text-black transition-transform hover:scale-105">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
            />
            <div className="p-4 flex flex-col grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4 grow">{product.description}</p>
                <div className="flex justify-between items-center mt-auto">
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded text-gray-700 uppercase font-semibold tracking-wide">
                        {product.category}
                    </span>
                    <button
                        onClick={() => addToCart(product)}
                        className="bg-black text-white px-4 py-2 rounded font-medium hover:bg-gray-800 transition-colors"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};
