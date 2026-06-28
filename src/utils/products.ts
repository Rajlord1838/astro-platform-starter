import type { Product } from '../types';

export const products: Product[] = [
    {
        id: 'p1',
        name: 'Classic White T-Shirt',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop',
        description: 'A classic, comfortable white t-shirt made from 100% organic cotton.',
        category: 'Men',
    },
    {
        id: 'p2',
        name: 'Denim Jacket',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?q=80&w=800&auto=format&fit=crop',
        description: 'A timeless denim jacket that goes with any outfit.',
        category: 'Women',
    },
    {
        id: 'p3',
        name: 'Leather Crossbody Bag',
        price: 120.00,
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop',
        description: 'Premium quality leather crossbody bag with multiple compartments.',
        category: 'Accessories',
    },
    {
        id: 'p4',
        name: 'Slim Fit Chinos',
        price: 59.99,
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop',
        description: 'Comfortable and stylish slim fit chinos in navy blue.',
        category: 'Men',
    },
    {
        id: 'p5',
        name: 'Floral Summer Dress',
        price: 65.50,
        image: 'https://images.unsplash.com/photo-1572804013309-82a89b43af28?q=80&w=800&auto=format&fit=crop',
        description: 'Lightweight floral dress perfect for summer days.',
        category: 'Women',
    },
    {
        id: 'p6',
        name: 'Polarized Sunglasses',
        price: 145.00,
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop',
        description: 'High-quality polarized sunglasses with UV protection.',
        category: 'Accessories',
    }
];
