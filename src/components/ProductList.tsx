import React from 'react';
import ProductCard from './ProductCard';
import type { Product } from '../types';

const PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Classic White Tee',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
        description: 'A timeless classic. 100% organic cotton white t-shirt.',
    },
    {
        id: '2',
        name: 'Denim Jacket',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800',
        description: 'Vintage wash denim jacket with a relaxed fit.',
    },
    {
        id: '3',
        name: 'Leather Sneakers',
        price: 119.99,
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
        description: 'Minimalist white leather sneakers for everyday wear.',
    },
    {
        id: '4',
        name: 'Wool Blend Coat',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=800',
        description: 'Elegant wool blend overcoat, perfect for colder days.',
    },
    {
        id: '5',
        name: 'Chino Pants',
        price: 59.99,
        image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=800',
        description: 'Comfortable stretch cotton chino pants in navy.',
    },
    {
        id: '6',
        name: 'Silk Scarf',
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=800',
        description: '100% silk scarf with abstract print.',
    }
];

const ProductList: React.FC = () => {
    return (
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;
