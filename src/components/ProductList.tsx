import React from 'react';
import { products } from '../data/products';
import { ProductCard } from './ProductCard';

export const ProductList: React.FC = () => {
  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold mb-8 text-white">Latest Arrivals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
