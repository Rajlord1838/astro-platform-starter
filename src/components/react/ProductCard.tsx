import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { addToCart } from '../../utils/cart';
import type { Product } from '../../data/products';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(product.id);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="flex flex-col bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-colors border border-white/10 group">
            <div className="relative aspect-[4/5] overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>
            <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-lg font-bold">{product.name}</h3>
                        <p className="text-sm text-gray-400">{product.category}</p>
                    </div>
                    <span className="text-lg font-bold text-primary">${product.price}</span>
                </div>
                <p className="text-sm text-gray-300 mb-6 flex-1 line-clamp-2">
                    {product.description}
                </p>
                <button
                    onClick={handleAddToCart}
                    className="w-full btn flex items-center justify-center gap-2"
                >
                    <ShoppingCart size={18} />
                    {isAdded ? 'Added!' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
}
