import type { Product } from '../types';

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Classic White T-Shirt',
    description: 'A comfortable, classic fit white t-shirt.',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'T-Shirts'
  },
  {
    id: 'p2',
    name: 'Denim Jeans',
    description: 'High-quality blue denim jeans.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Pants'
  },
  {
    id: 'p3',
    name: 'Leather Jacket',
    description: 'A stylish and durable black leather jacket.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Outerwear'
  },
  {
    id: 'p4',
    name: 'Running Sneakers',
    description: 'Lightweight and comfortable running sneakers.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Shoes'
  },
  {
    id: 'p5',
    name: 'Floral Summer Dress',
    description: 'A breezy floral dress perfect for summer.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Dresses'
  },
  {
    id: 'p6',
    name: 'Classic Sunglasses',
    description: 'UV protection with a timeless design.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Accessories'
  }
];
