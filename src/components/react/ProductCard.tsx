import React, { useState } from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = () => {
        setIsAdding(true);
        addToCart(product, 1);
        setTimeout(() => setIsAdding(false), 500);
    };

    return (
        <div className="flex flex-col bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:-translate-y-1">
            <div className="relative aspect-square w-full">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="object-cover w-full h-full"
                    loading="lazy"
                />
                <div className="absolute top-2 right-2 bg-primary/90 text-primary-content text-xs font-bold px-2 py-1 rounded">
                    {product.category}
                </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-1 text-white">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
                    <button
                        onClick={handleAddToCart}
                        className={`flex items-center gap-2 px-4 py-2 rounded font-semibold transition-colors ${
                            isAdding
                                ? 'bg-green-500 text-white'
                                : 'bg-primary text-primary-content hover:bg-primary/80'
                        }`}
                        aria-label={`Add ${product.name} to cart`}
                    >
                        <ShoppingBag size={18} />
                        {isAdding ? 'Added!' : 'Add'}
                    </button>
                </div>
            </div>
        </div>
    );
};
