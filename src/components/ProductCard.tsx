import React, { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
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
        <div className="flex flex-col bg-gray-900 rounded-lg overflow-hidden border border-gray-800 transition-transform hover:scale-[1.02] hover:shadow-xl group">
            <div className="relative aspect-square overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                />
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold">
                    {product.category}
                </div>
            </div>

            <div className="flex flex-col grow p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold line-clamp-1">{product.name}</h3>
                    <span className="text-primary font-bold whitespace-nowrap ml-2">
                        ${product.price.toFixed(2)}
                    </span>
                </div>

                <p className="text-sm text-gray-400 mb-6 line-clamp-2 grow">
                    {product.description}
                </p>

                <button
                    onClick={handleAddToCart}
                    className="w-full flex items-center justify-center gap-2 bg-primary text-primary-content hover:bg-primary/85 font-semibold py-2.5 px-4 rounded transition-colors"
                    aria-label={`Add ${product.name} to cart`}
                >
                    {added ? (
                        <>
                            <Check size={18} />
                            <span>Added!</span>
                        </>
                    ) : (
                        <>
                            <ShoppingCart size={18} />
                            <span>Add to Cart</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};
