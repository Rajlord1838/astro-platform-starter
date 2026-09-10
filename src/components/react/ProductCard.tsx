import React from 'react';
import type { Product } from '../../types';
import { addToCart, toggleCart } from '../../utils/cart';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const handleAddToCart = () => {
        addToCart(product);
        toggleCart(); // Optional: open cart when item is added
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden group">
            <div className="relative aspect-square overflow-hidden bg-gray-200">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:opacity-75 transition-opacity"
                />
            </div>
            <div className="p-4 flex flex-col justify-between h-40">
                <div>
                    <h3 className="text-lg font-medium text-gray-900 line-clamp-1">{product.name}</h3>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    <button
                        onClick={handleAddToCart}
                        className="flex items-center justify-center p-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                        aria-label={`Add ${product.name} to cart`}
                    >
                        <ShoppingCart size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};
