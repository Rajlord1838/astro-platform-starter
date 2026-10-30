import React from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="flex flex-col overflow-hidden bg-gray-800 rounded-lg shadow-lg">
            <img src={product.imageUrl} alt={product.name} className="object-cover w-full h-64" />
            <div className="flex flex-col flex-grow p-4">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                        <p className="text-sm text-gray-400">{product.category}</p>
                    </div>
                    <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                </div>
                <p className="mt-2 text-sm text-gray-300 flex-grow">{product.description}</p>
                <button
                    onClick={() => addToCart(product)}
                    className="flex items-center justify-center w-full gap-2 px-4 py-2 mt-4 text-sm font-semibold transition-colors rounded-md bg-primary text-primary-content hover:bg-primary/90"
                >
                    <ShoppingCart size={16} />
                    Add to Cart
                </button>
            </div>
        </div>
    );
};
