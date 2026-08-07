import React, { useState } from 'react';
import type { Product } from '../types';
import { addToCart } from '../utils/cart';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(product, 1);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000); // Reset after 2 seconds
    };

    return (
        <div className="flex flex-col bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 hover:border-neutral-700 transition-colors">
            <div className="aspect-[4/5] overflow-hidden bg-neutral-800">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium text-white truncate pr-2">{product.name}</h3>
                    <span className="text-lg font-semibold text-white">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-sm text-neutral-400 mb-4 line-clamp-2 flex-grow">{product.description}</p>

                <button
                    onClick={handleAddToCart}
                    disabled={added}
                    className={`w-full py-2.5 px-4 rounded-md font-medium text-sm transition-colors flex items-center justify-center gap-2 ${
                        added
                            ? 'bg-green-600 text-white cursor-default'
                            : 'bg-white text-black hover:bg-neutral-200'
                    }`}
                >
                    {added ? (
                        <>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Added to Cart
                        </>
                    ) : (
                        'Add to Cart'
                    )}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
