import type { Product } from '../types';

export const products: Product[] = [
    {
        id: '1',
        name: 'Classic White T-Shirt',
        price: 29.99,
        description: 'A timeless classic white tee made from 100% organic cotton.',
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Tops'
    },
    {
        id: '2',
        name: 'Vintage Denim Jacket',
        price: 89.99,
        description: 'Perfectly faded vintage wash denim jacket with a relaxed fit.',
        imageUrl: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Outerwear'
    },
    {
        id: '3',
        name: 'High-Waisted Jeans',
        price: 79.99,
        description: 'Flattering high-waisted skinny jeans with a bit of stretch.',
        imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Bottoms'
    },
    {
        id: '4',
        name: 'Floral Summer Dress',
        price: 59.99,
        description: 'Lightweight and breezy floral midi dress, perfect for summer days.',
        imageUrl: 'https://images.unsplash.com/photo-1572804013309-8c98e268fdfb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Dresses'
    },
    {
        id: '5',
        name: 'Leather Crossbody Bag',
        price: 120.00,
        description: 'Genuine leather crossbody bag with adjustable strap and brass hardware.',
        imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Accessories'
    },
    {
        id: '6',
        name: 'Minimalist Sneakers',
        price: 95.00,
        description: 'Clean, versatile white sneakers that go with almost everything.',
        imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Shoes'
    }
];
