import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { products as allProducts } from '../data/products';
import type { Product } from '../types';

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>(allProducts);
    const [category, setCategory] = useState<string | null>(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');
        setCategory(categoryParam);

        if (categoryParam) {
            setProducts(allProducts.filter(p => p.category === categoryParam));
        } else {
            setProducts(allProducts);
        }
    }, []);

    return (
        <div>
            {category && (
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold capitalize text-gray-800">{category} Collection</h2>
                    <a href="/" className="inline-block mt-2 text-blue-600 hover:underline">Clear Filter</a>
                </div>
            )}

            {!category && (
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Discover Your Style
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Explore our curated collection of premium clothing and accessories designed for the modern lifestyle.
                    </p>
                </div>
            )}

            {products.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No products found for this category.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
