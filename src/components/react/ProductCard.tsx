import React from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="flex flex-col bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
            <img
                src={product.image}
                alt={product.name}
                className="h-64 w-full object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-4 flex-grow">{product.description}</p>
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                    <button
                        onClick={() => addToCart(product)}
                        className="btn"
                        aria-label={`Add ${product.name} to cart`}
                    >
                        <ShoppingCart size={18} />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};
