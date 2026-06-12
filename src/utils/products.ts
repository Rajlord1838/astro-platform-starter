import type { Product } from '../types';

export const products: Product[] = [
    {
        id: '1',
        name: 'Classic White T-Shirt',
        description: 'A comfortable and versatile classic white t-shirt made from 100% organic cotton.',
        price: 25.00,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
        category: 'Tops',
    },
    {
        id: '2',
        name: 'Slim Fit Blue Jeans',
        description: 'Premium quality slim fit jeans with a slight stretch for comfort.',
        price: 65.00,
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800',
        category: 'Bottoms',
    },
    {
        id: '3',
        name: 'Vintage Leather Jacket',
        description: 'A timeless vintage-style leather jacket for a bold look.',
        price: 150.00,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800',
        category: 'Outerwear',
    },
    {
        id: '4',
        name: 'Minimalist Sneakers',
        description: 'Clean and simple minimalist sneakers suitable for any outfit.',
        price: 80.00,
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
        category: 'Shoes',
    },
    {
        id: '5',
        name: 'Summer Floral Dress',
        description: 'A light and airy floral dress perfect for warm days.',
        price: 45.00,
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800',
        category: 'Dresses',
    },
    {
        id: '6',
        name: 'Classic Aviator Sunglasses',
        description: 'Protect your eyes in style with these classic aviator sunglasses.',
        price: 120.00,
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800',
        category: 'Accessories',
    }
];
