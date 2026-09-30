import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { addToCart, toggleCart } from '../../utils/cart';
import type { Product } from '../../types';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const handleAddToCart = () => {
        addToCart(product);
        toggleCart();
    };

    return (
        <div className="group flex flex-col bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-white px-2 py-1 text-xs font-semibold text-gray-800 rounded uppercase tracking-wider">
                    {product.category}
                </div>
            </div>
            <div className="flex flex-col flex-1 p-4">
                <div className="flex justify-between items-start mb-2 gap-2 text-gray-800">
                    <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
                    <span className="font-bold whitespace-nowrap">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">{product.description}</p>
                <button
                    onClick={handleAddToCart}
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-black text-white font-medium rounded hover:bg-gray-800 transition-colors"
                >
                    <ShoppingBag size={18} />
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
