import type { Product } from '../types';

export const products: Product[] = [
    {
        id: '1',
        title: 'Classic White T-Shirt',
        price: 29.99,
        description: 'A timeless classic white t-shirt made from 100% organic cotton.',
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=500',
        category: 'Tops',
    },
    {
        id: '2',
        title: 'Denim Jacket',
        price: 89.99,
        description: 'Vintage wash denim jacket with a relaxed fit.',
        imageUrl: 'https://images.unsplash.com/photo-1551537482-f209bfc73f6d?auto=format&fit=crop&q=80&w=500',
        category: 'Outerwear',
    },
    {
        id: '3',
        title: 'Slim Fit Jeans',
        price: 59.99,
        description: 'Comfortable stretch slim fit jeans in dark indigo.',
        imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=500',
        category: 'Bottoms',
    },
    {
        id: '4',
        title: 'Canvas Sneakers',
        price: 45.00,
        description: 'Everyday canvas sneakers in off-white.',
        imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=500',
        category: 'Shoes',
    },
    {
        id: '5',
        title: 'Leather Belt',
        price: 34.50,
        description: 'Genuine leather belt with a classic brass buckle.',
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=500',
        category: 'Accessories',
    },
    {
        id: '6',
        title: 'Summer Floral Dress',
        price: 65.00,
        description: 'Lightweight floral dress perfect for warm summer days.',
        imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=500',
        category: 'Dresses',
    }
];
