import React from 'react';
import { ShoppingCart } from 'lucide-react';
import type { Product, CartItem } from '../types';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const addToCart = () => {
        const cartStr = window.localStorage.getItem('fashion_store_cart');
        let cart: CartItem[] = [];
        if (cartStr) {
            try {
                cart = JSON.parse(cartStr);
            } catch (e) {
                console.error(e);
            }
        }

        const existingItemIndex = cart.findIndex(item => item.id === product.id);
        if (existingItemIndex >= 0) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        window.localStorage.setItem('fashion_store_cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('cart-updated'));
    };

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
            <div className="relative overflow-hidden aspect-[3/4]">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 text-xs font-semibold rounded shadow-sm backdrop-blur-sm">
                    {product.category}
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-1">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center mt-auto">
                    <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    <button
                        onClick={addToCart}
                        className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                        aria-label={`Add ${product.name} to cart`}
                    >
                        <ShoppingCart size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};
