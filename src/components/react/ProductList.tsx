import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../../data/products';

export default function ProductList() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
