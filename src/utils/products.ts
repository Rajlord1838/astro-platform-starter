import type { Product } from '../types';

export const products: Product[] = [
    {
        id: '1',
        name: 'Classic White T-Shirt',
        price: 25.00,
        description: 'A timeless, comfortable white t-shirt made from 100% organic cotton.',
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
        category: 'Tops',
    },
    {
        id: '2',
        name: 'Denim Jacket',
        price: 89.99,
        description: 'A rugged, versatile denim jacket for everyday wear.',
        imageUrl: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=800&q=80',
        category: 'Outerwear',
    },
    {
        id: '3',
        name: 'Slim Fit Jeans',
        price: 55.50,
        description: 'Modern slim fit jeans in dark wash.',
        imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80',
        category: 'Bottoms',
    },
    {
        id: '4',
        name: 'Floral Summer Dress',
        price: 45.00,
        description: 'Lightweight floral dress perfect for sunny days.',
        imageUrl: 'https://images.unsplash.com/photo-1572804013309-82a89b43644b?auto=format&fit=crop&w=800&q=80',
        category: 'Dresses',
    },
    {
        id: '5',
        name: 'Leather Sneakers',
        price: 110.00,
        description: 'Premium white leather sneakers.',
        imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
        category: 'Shoes',
    },
    {
        id: '6',
        name: 'Wool Blend Coat',
        price: 150.00,
        description: 'Elegant wool blend coat for winter.',
        imageUrl: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80',
        category: 'Outerwear',
    }
];
