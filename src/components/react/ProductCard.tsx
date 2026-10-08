import React from 'react';
import type { Product } from '../../types';
import { addToCart, toggleCartModal } from '../../utils/cart';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const handleAddToCart = () => {
        addToCart(product);
        toggleCartModal(); // Optional: open cart when item is added
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
            <div className="relative pt-[125%] w-full bg-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    loading="lazy"
                />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 leading-tight">{product.name}</h3>
                    <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4 flex-grow">{product.description}</p>
                <div className="mt-auto flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100 px-2 py-1 rounded">
                        {product.category}
                    </span>
                    <button
                        onClick={handleAddToCart}
                        className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                        <ShoppingCart size={16} />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};
