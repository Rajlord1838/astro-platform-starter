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
        toggleCart(); // Open cart when adding item
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden group">
            <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                        <h3 className="text-lg font-semibold text-gray-900 leading-tight">{product.name}</h3>
                    </div>
                    <p className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</p>
                </div>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                <button
                    onClick={handleAddToCart}
                    className="w-full flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-md transition-colors font-medium"
                >
                    <ShoppingCart size={18} />
                    Add to Cart
                </button>
            </div>
        </div>
    );
};
