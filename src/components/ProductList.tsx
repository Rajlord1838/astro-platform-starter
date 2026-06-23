import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';

export default function ProductList() {
    return (
        <section className="py-12">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-bold mb-2">New Arrivals</h2>
                    <p className="text-gray-400">Discover our latest collection of premium fashion items.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}
