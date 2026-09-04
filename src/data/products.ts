import type { Product } from '../types';

export const products: Product[] = [
    {
        id: '1',
        name: 'Classic White T-Shirt',
        description: 'A comfortable, 100% cotton white t-shirt.',
        price: 25.00,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: '2',
        name: 'Denim Jeans',
        description: 'Classic straight leg blue denim jeans.',
        price: 59.99,
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: '3',
        name: 'Leather Jacket',
        description: 'Sleek black leather jacket for a modern look.',
        price: 120.00,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: '4',
        name: 'Sneakers',
        description: 'Comfortable everyday walking sneakers.',
        price: 85.00,
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80',
    }
];
