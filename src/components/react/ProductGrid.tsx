import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { products } from '../../data/products';

export default function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="w-full">
      {/* Category Filter */}
      <div className="flex overflow-x-auto pb-4 mb-8 gap-3 no-scrollbar">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors cursor-pointer font-medium ${
              selectedCategory === category
                ? 'bg-primary text-primary-content'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            category={product.category}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No products found in this category.
        </div>
      )}
    </div>
  );
}
